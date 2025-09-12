export interface Review {
  id: number;
  rating: number;
  content: string;
  createdAt: string;
  user: {
    id: number;
    name: string | null;
    email: string;
  };
  likes: number;
  comments: number;
  userLiked: boolean;
}

export interface Conference {
  id: number;
  name: string;
  location: string;
  startDate: string;
  endDate: string;
  description?: string;
  website?: string;
  tags?: string[];
  lat?: number;
  lon?: number;
}