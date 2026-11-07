import BookInfo from './components/BookInfo';
import BookReviews from './components/BookReviews';
import { book, reviews } from './data/bookData';
import './styles.css';

export default function BookPage() {
  return (
    <div className="book-page">
      <BookInfo book={book} />
      <BookReviews reviews={reviews} />
    </div>
  );
}
