import type { Profile, WorkExperience, SkillGroup } from '../types';

// Заповни ПІБ, телефон, email і заміни зображення своїм фото.
export const profile: Profile = {
  fullName: 'Ім’я Прізвище Побатькові',
  nickname: 'almostsenna',
  role: 'Студент IT STEP Academy',
  city: 'Вінниця, Україна',
  phone: '',
  email: '',
  github: 'https://github.com/almostsenna',
  photo: 'images/profile-placeholder.svg',
  photoAlt: 'Місце для особистої фотографії',
  about:
    'Навчаюся програмуванню та розвиваю навички у C#, JavaScript і React. Люблю автомобілі, мотоцикли та автоспорт. Мета: перейти до роботи розробником і створювати власні проєкти.',
};

export const experience: WorkExperience[] = [
  {
    id: 'content-writer',
    title: 'Контент-райтер',
    area: 'Написання та редагування',
    description: 'Працюю з інформаційними та SEO-текстами, досліджую теми й редагую матеріали.',
  },
  {
    id: 'english-teacher',
    title: 'Викладач англійської мови',
    area: 'Філологія та навчання',
    description: 'Маю філологічну підготовку та досвід викладання англійської мови.',
  },
];

export const skills: SkillGroup[] = [
  { id: 'programming', title: 'Програмування та навчальні проєкти', items: ['C++', 'C#', 'JavaScript', 'React', 'HTML', 'CSS', 'SQL', 'Git'] },
  { id: 'other', title: 'Інші навички', items: ['Англійська мова', 'Написання текстів', 'Редагування', 'Пошук інформації'] },
];
