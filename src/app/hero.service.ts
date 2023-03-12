import { Injectable } from '@angular/core'
import { HeroModel } from './heroes/hero.model'
import { HEROES } from './mock-heroes'

import { Observable, of } from 'rxjs'
import { MessageService } from './message.service'

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  constructor(private messageService: MessageService) {}

  getHeroes(): Observable<HeroModel[]> {
    const heroes = of(HEROES)
    this.messageService.add('HeroService: fetched heroes')
    return heroes
  }

  getHero(id: number): Observable<HeroModel> {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const hero = HEROES.find(h => h.id === id)!
    this.messageService.add(`HeroService: fetched hero id=${id}`)
    return of(hero)
  }
}
