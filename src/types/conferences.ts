export interface Conference {
  id: number;
  name: string;
  location: string;
  startDate: string;
  endDate: string;
  description?: string;
  website?: string;
  tags?: string[];
}

export interface ConferencesData {
  conferences: Conference[];
}