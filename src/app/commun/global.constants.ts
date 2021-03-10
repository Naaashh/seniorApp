import {Application} from '../application/application.model';

export const applications: Array<Application> = [
  {
    name: 'calculator',
    image: 'calculator.svg',
    execute: 'calc',
    isProgram: true
  },
  {
    name: 'bloc note',
    image: 'notepad.svg',
    execute: '"C:\\Program Files\\Windows NT\\Accessories\\wordpad.exe"',
    isProgram: true
  },
  {
    name: 'internet',
    image: 'wifi.svg',
    execute: 'https://www.google.fr',
    isProgram: false
  },
  {
    name: 'carte',
    image: 'map.svg',
    execute: 'https://www.viamichelin.com/web/Routes?departure=Current%20Location&departureGps=true',
    isProgram: false
  },
  {
    name: 'dictionnaire',
    image: 'encyclopedia.svg',
    execute: 'https://fr.wikipedia.org/wiki/Wikip%C3%A9dia:Accueil_principal',
    isProgram: false
  },
  {
    name: 'traducteur',
    image: 'translate.svg',
    execute: 'https://www.linguee.com/english-french',
    isProgram: false
  },
  {
    name: 'vidéo',
    image: 'video.svg',
    execute: 'https://www.youtube.com',
    isProgram: false
  }
];
