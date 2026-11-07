import type { Restaurant } from '../types';

export const restaurant: Restaurant = {
  name: 'Le Procope',
  location: 'Париж, Франція',
  address: '13 rue de l’Ancienne Comédie, 75006 Париж, Франція',
  cuisine: 'Французька, традиційна',
  rating: 4.7, // Навчальна оцінка, а не поточний рейтинг сервісу відгуків.
  image: 'images/restaurant-building.jpg',
  imageAlt: 'Фасад будівлі ресторану Le Procope в Парижі',
  description:
    'Французький ресторан на вулиці rue de l’Ancienne Comédie. Традиційна кухня, історичний фасад і паризька атмосфера.',
  source: 'https://www.procope.com/en/address-contact/',
  photoCredit: {
    author: 'Beyond My Ken',
    source: "https://commons.wikimedia.org/wiki/File:2018_Le_Procope_facade_on_Rue_de_l'Ancienne_Comédie.jpg",
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
  },
};
