import type { Book } from '../types';

interface BookInfoProps {
  book: Book;
}

export default function BookInfo({ book }: BookInfoProps) {
  return (
    <section className="book-hero" aria-labelledby="book-title">
      <div className="cover-panel">
        <span className="cover-label">Моя книжкова полиця / 01</span>
        <img
          className="book-cover"
          src={book.cover}
          alt={`Обкладинка книги ${book.title}, автор ${book.author}`}
          width="300"
          height="460"
        />
        <span className="cover-caption">Інженерія. Перегони. Життя.</span>
      </div>

      <div className="book-details">
        <p className="eyebrow">Моя улюблена книга</p>
        <h1 id="book-title">{book.title}</h1>
        <p className="subtitle">{book.subtitle}</p>
        <p className="author">{book.author}<span> / {book.authorUkr}</span></p>
        <p className="description">{book.description}</p>

        <dl className="book-facts">
          <div>
            <dt>Жанр</dt>
            <dd>{book.genre}</dd>
          </div>
          <div>
            <dt>Сторінок</dt>
            <dd>{book.pages}</dd>
          </div>
          <div>
            <dt>Перша публікація</dt>
            <dd>{book.firstPublished}</dd>
          </div>
        </dl>
        <p className="edition-note">
          Кількість сторінок наведено для видання {book.edition}. ISBN: {book.isbn}.
        </p>
      </div>
    </section>
  );
}
