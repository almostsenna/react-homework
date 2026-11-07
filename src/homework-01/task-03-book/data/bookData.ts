import type { Book, BookReview } from '../types';

// Усі дані книги зібрані в одному об'єкті.
export const book: Book = {
  title: 'How to Build a Car',
  subtitle: 'The Autobiography of the World’s Greatest Formula 1 Designer',
  author: 'Adrian Newey',
  authorUkr: 'Едріан Ньюї',
  genre: 'Автобіографія, автоспорт',
  pages: 400,
  firstPublished: 2017,
  edition: 'HarperCollins, 2019',
  isbn: '9780008352479',
  cover: 'images/book-cover.jpg',
  description:
    'Історія Едріана Ньюї, розказана через гоночні автомобілі, які він створював. Автор згадує роботу у Williams, McLaren та Red Bull, пояснює інженерні рішення й показує, що стоїть за боротьбою за кожну десяту секунди на трасі.',
};

// Короткі українські перекази відгуків із видавничої сторінки в Apple Books.
// Це перекази, а не дослівні цитати.
export const reviews: BookReview[] = [
  {
    id: 'engineering',
    title: 'Погляд інженера',
    publication: 'Motorsport Online',
    text:
      'Видання відзначає поєднання особистої історії з поясненням розвитку болідів Формули-1. Інженерні подробиці допомагають зрозуміти рішення, які команди раніше приховували від конкурентів.',
  },
  {
    id: 'formula-one',
    title: 'Для шанувальників Формули-1',
    publication: 'Octane Magazine',
    text:
      'Журнал рекомендує книгу тим, хто цікавиться будовою автомобілів і внутрішнім життям автоспорту. За оцінкою видання, вона може захопити навіть читача, який лише побіжно стежить за Формулою-1.',
  },
  {
    id: 'personal-story',
    title: 'Зрозуміло про складне',
    publication: 'Autosport',
    text:
      'Рецензент звертає увагу на енергійну, чітку манеру викладу. Технічні знання органічно вплетені в історію, тому читач засвоює їх у процесі знайомства з кар’єрою конструктора.',
  },
];
