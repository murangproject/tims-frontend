import { Injectable } from '@angular/core';

export enum Theme {
  Light = 'light',
  Dark = 'dark',
  Corporate = 'corporate',
  Cupcake = 'cupcake',
  Retro = 'retro',
  Bumblebee = 'bumblebee',
  Emerald = 'emerald',
  Synthwave = 'synthwave',
  Valentine = 'valentine',
  Halloween = 'halloween',
  Lofi = 'lofi',
  Fantasy = 'fantasy',
  Dracula = 'dracula',
  Lemonade = 'lemonade',
  Night = 'night',
  Coffee = 'coffee',
  Winter = 'winter',
  Luxury = 'luxury',
  Acid = 'acid',
  Wireframe = 'wireframe',
  Pastel = 'pastel',
  Cyberpunk = 'cyberpunk',
  Business = 'business',
}

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  constructor() {}

  setTheme(theme: Theme) {
    localStorage.setItem('theme', theme);
  }

  getTheme() {
    return localStorage.getItem('theme');
  }
}
