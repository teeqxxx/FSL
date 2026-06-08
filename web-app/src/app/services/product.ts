import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PokemonDetailResponse } from '../app';

@Injectable({
  providedIn: 'root',
})

export class ProductService 
{
  //dove sono i dati
  private apiURL = 'https://pokeapi.co/api/v2/pokemon';

  //per raccogliere i dati dal sito
  constructor(private http: HttpClient) {}

  //per i tempi di attesa del server
  getProduct(): Observable<any[]>
  {
    return this.http.get<any>(this.apiURL);
  }

  getProductDetails(urlProduct: string): Observable<PokemonDetailResponse> 
  {
    return this.http.get<PokemonDetailResponse>(urlProduct);
  }
}
