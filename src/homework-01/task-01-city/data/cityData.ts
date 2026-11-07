import type { City, Landmark } from '../types';

// Інформацію про місто та фотографії можна змінити тут.
export const city: City = {
  name: 'Вінниця',
  country: 'Україна',
  founded: 1363,
  river: 'Південний Буг',
  description:
    'Місто на берегах Південного Бугу, де старовинна архітектура поєднується з набережними, зеленими парками та неквапливими прогулянками центром.',
};

export const landmarks: Landmark[] = [
  {
    id: 'water-tower',
    name: 'Водонапірна вежа',
    image: 'images/water-tower.jpg',
    alt: 'Водонапірна вежа в центрі Вінниці',
    description: 'Одна з найвпізнаваніших споруд міста на Європейській площі.',
    author: 'George Chernilevsky',
    source: 'https://commons.wikimedia.org/wiki/File:Old_tower_2010_G2.jpg',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
  },
  {
    id: 'roshen-fountain',
    name: 'Фонтан Roshen',
    image: 'images/roshen-fountain.jpg',
    alt: 'Вечірнє підсвічування фонтану Roshen на Південному Бузі',
    description: 'Мультимедійний фонтан на Південному Бузі біля набережної Roshen.',
    author: 'Юрій Басюк / Фонтан Рошен',
    source: 'https://commons.wikimedia.org/wiki/File:Фонтан_Рошен_2.jpg',
    license: 'CC BY-SA 3.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
  },
  {
    id: 'transfiguration-cathedral',
    name: 'Спасо-Преображенський собор',
    image: 'images/cathedral.jpg',
    alt: 'Панорама Спасо-Преображенського собору та центральної частини Вінниці',
    description: 'Історичний собор на вулиці Соборній, видимий із протилежного берега річки.',
    author: 'George Chernilevsky',
    source: 'https://commons.wikimedia.org/wiki/File:Cathedral_Vinnytsia_panorama_2013_G1.jpg',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
  },
];
