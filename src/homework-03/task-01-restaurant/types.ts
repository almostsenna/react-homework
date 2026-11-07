export interface PhotoCredit {
  author: string;
  source: string;
  license: string;
  licenseUrl: string;
}

export interface Restaurant {
  name: string;
  address: string;
  cuisine: string;
  rating: number;
  image: string;
  imageAlt: string;
  location?: string;
  description?: string;
  source?: string;
  photoCredit?: PhotoCredit;
}
