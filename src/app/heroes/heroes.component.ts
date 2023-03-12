import { Component } from '@angular/core'

import { HeroModel } from './hero.model'
import { HEROES } from '../mock-heroes'

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss'],
})
export class HeroesComponent {
  heroes = HEROES
  selectedHero?: HeroModel

  onSelect (hero: HeroModel): void {
    this.selectedHero = hero
  }
}
