import type { Homework } from '../types/assignments';

export const homeworks: Homework[] = [
  {
    id: 'homework-01',
    title: 'Домашня робота 1',
    topic: 'Функціональні компоненти та TSX',
    tasks: [
      { id: 'city', number: '1', title: 'Моє місто' },
      { id: 'book', number: '3', title: 'Улюблена книга' },
    ],
  },
  {
    id: 'homework-02',
    title: 'Домашня робота 2',
    topic: 'Компоненти та props',
    tasks: [
      { id: 'movie', number: '1', title: 'Улюблений фільм' },
      { id: 'profile', number: '2', title: 'Персональна сторінка' },
      { id: 'clock', number: '3', title: 'Поточний час' },
      { id: 'pet', number: '4', title: 'Домашній улюбленець' },
    ],
  },
  {
    id: 'homework-03',
    title: 'Домашня робота 3',
    topic: 'Props, propTypes та стан',
    tasks: [
      { id: 'restaurant', number: '1', title: 'Ресторан' },
      { id: 'credentials', number: '3', title: 'Логін і пароль' },
    ],
  },
  {
    id: 'homework-04',
    title: 'Домашня робота 4',
    topic: 'Хуки, стан та збереження змін',
    tasks: [
      { id: 'restaurant-editor', number: '2', title: 'Редагування ресторану' },
    ],
  },
];
