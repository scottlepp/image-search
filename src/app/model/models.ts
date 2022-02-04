export interface Image {
  id: number;
  width: number;
  height: number;
  url: string;
  photographer: string;
  photographer_url: string;
  photographer_id: number;
  avg_color: string;
  src: Source;
  liked: boolean;
  alt: string;
}

export interface Source {
  original: string;
  large2x: string;
  large: string;
  medium: string;
  small: string;
  portrait: string;
  landscape: string;
  tiny: string;
}

export interface ImageResults {
    total_results: number;
    page: number;
    per_page: number;
    photos: Image[];
    next_page: string;
}