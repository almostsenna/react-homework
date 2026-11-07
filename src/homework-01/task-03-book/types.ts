export interface Book {
  title: string;
  subtitle: string;
  author: string;
  authorUkr: string;
  genre: string;
  pages: number;
  firstPublished: number;
  edition: string;
  isbn: string;
  cover: string;
  description: string;
}

export interface BookReview {
  id: string;
  title: string;
  publication: string;
  text: string;
}
