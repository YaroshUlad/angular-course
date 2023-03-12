import { Component, Input } from '@angular/core'

import { HeroModel } from '../heroes/hero.model'

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss'],
})
export class HeroDetailComponent {
  @Input() hero?: HeroModel
}
