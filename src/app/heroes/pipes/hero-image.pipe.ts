import { Pipe, PipeTransform } from '@angular/core';
import { Hero } from '../interfaces/hero.interface';

@Pipe({
  name: 'heroImage'
})

export class HeroImagePipe implements PipeTransform {
  transform(hero: Hero): string {
    if(hero.alt_img) return hero.alt_img;

    if((!hero.id && !hero.alt_img) || hero.alt_img?.length === 0){
      return 'assets/no-image.png'
    }

    return `assets/heroes/${hero.id}.jpg`;
  }
}
