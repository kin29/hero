import { Injectable } from '@angular/core';
import { Hero } from "../model/hero";
import { HEROES } from "../mock-heroes";
import { Observable, of } from "rxjs";
import { MessageService } from "./message.service";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private heroesUrl = 'api/heroes'
  constructor(
    private http: HttpClient,
    private messageService: MessageService,
  ) { }

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl);
  }

  getHero(id: number): Observable<Hero> {
    const hero = HEROES.find(h => h.id === id)!;
    this.log(`fetched hero id=${id}`);
    return of(hero);
  }

  private log(message: string): void {
    this.messageService.add(`HeroService: ${message}`);
  }
}
