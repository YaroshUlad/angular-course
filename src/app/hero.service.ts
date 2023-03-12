import { Injectable } from '@angular/core'
import { HeroModel } from './heroes/hero.model'
// import { HEROES } from './mock-heroes'

import { Observable, of } from 'rxjs'
import { MessageService } from './message.service'

import { HttpClient, HttpHeaders } from '@angular/common/http'
import { catchError, /*map,*/ tap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  constructor(
    private messageService: MessageService,
    private http: HttpClient
  ) {}

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`)
  }

  private heroesUrl = 'api/heroes'

  getHeroes(): Observable<HeroModel[]> {
    // const heroes = of(HEROES)
    // this.messageService.add('HeroService: fetched heroes')
    // return heroes

    return this.http.get<HeroModel[]>(this.heroesUrl).pipe(
      tap(() => this.log('fetched heroes')),
      catchError(this.handleError<HeroModel[]>('getHeroes', []))
    )
  }

  getHero(id: number): Observable<HeroModel> {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    // const hero = HEROES.find(h => h.id === id)!
    // this.messageService.add(`HeroService: fetched hero id=${id}`)
    // return of(hero)

    const url = `${this.heroesUrl}/${id}`
    return this.http.get<HeroModel>(url).pipe(
      tap(() => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<HeroModel>(`getHero id=${id}`))
    )
  }

  updateHero(hero: HeroModel): Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
      tap(() => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    )
  }

  addHero(hero: HeroModel): Observable<HeroModel> {
    return this.http
      .post<HeroModel>(this.heroesUrl, hero, this.httpOptions)
      .pipe(
        tap((newHero: HeroModel) =>
          this.log(`added hero with id=${newHero.id}`)
        ),
        catchError(this.handleError<HeroModel>('addHero'))
      )
  }

  deleteHero(id: number): Observable<HeroModel> {
    const url = `${this.heroesUrl}/${id}`
    return this.http.delete<HeroModel>(url, this.httpOptions).pipe(
      tap(() => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<HeroModel>(`delete Hero with id ${id}`))
    )
  }
  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error) // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`)

      // Let the app keep running by returning an empty result.
      return of(result as T)
    }
  }
}
