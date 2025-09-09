import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';

interface Conference {
  id: number;
  name: string;
  location: string;
  startDate: string;
  endDate: string;
  description?: string;
  website?: string;
  tags?: string[];
}

interface ConferencesData {
  conferences: Conference[];
}

async function loadConferences(): Promise<ConferencesData> {
  try {
    const filePath = path.join(process.cwd(), 'public', 'data', 'conferences.json');
    const jsonData = await fs.readFile(filePath, 'utf8');
    return JSON.parse(jsonData) as ConferencesData;
  } catch (error) {
    console.error('Error loading conferences data:', error);
    return { conferences: [] };
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';
    const limit = parseInt(searchParams.get('limit') || '10');

    const conferencesData = await loadConferences();

    const filteredConferences = conferencesData.conferences
      .filter((conference: Conference) => {
        if (!search) return true;

        const searchTerm = search.toLowerCase();
        return (
          conference.name.toLowerCase().includes(searchTerm) ||
          conference.location.toLowerCase().includes(searchTerm) ||
          (conference.description && conference.description.toLowerCase().includes(searchTerm)) ||
          (conference.tags && conference.tags.some(tag => tag.toLowerCase().includes(searchTerm)))
        );
      })
      .slice(0, limit);

    return NextResponse.json(filteredConferences);
  } catch (error) {
    console.error('Error searching conferences:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}