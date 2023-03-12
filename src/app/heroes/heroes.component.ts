import { Component, OnInit } from '@angular/core'

import { HeroModel } from './hero.model'

import { HeroService } from '../hero.service'

// import { MessageService } from 'src/app/message.service'

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss'],
})
export class HeroesComponent implements OnInit {
  constructor(
    private heroService: HeroService // private messageService: MessageService
  ) {}

  heroes: HeroModel[] = []
  // selectedHero?: HeroModel

  // onSelect(hero: HeroModel): void {
  //   this.selectedHero = hero
  //   this.messageService.add(`HeroesComponent: Selected hero id=${hero.id}`)
  // }

  getHeroes(): void {
    this.heroService.getHeroes().subscribe(heroes => (this.heroes = heroes))
  }

  add(name: string): void {
    name = name.trim()
    if (!name) return

    this.heroService.addHero({ name } as HeroModel).subscribe(hero => {
      this.heroes.push(hero)
    })
  }

  delete(hero: HeroModel): void {
    this.heroes = this.heroes.filter(h => h !== hero)
    this.heroService.deleteHero(hero.id).subscribe()
  }

  ngOnInit(): void {
    this.getHeroes()
  }
}
