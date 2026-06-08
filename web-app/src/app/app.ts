// questo è il component

import { CommonModule } from '@angular/common';
import { Component, signal, EventEmitter, Input, Output } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductService } from './services/product';
import { signalSetFn } from '@angular/core/primitives/signals';


//le interfacce vanno sopra i component


//-------------------------------------------- INTERFACCE --------------------------------------------------


//prova
interface Product 
{
  id: number,
  nome: string,
  categoria: string,
  prezzo: number,
  disponibilita: boolean
}


//--------------------------------------------dettagli pokemon--------------------------------------------------


// Interfaccia generica per le risorse che contengono solo un nome e un URL di riferimento
export interface NamedAPIResource {
  name: string;
  url: string;
}

// 1. Struttura delle Abilità (abilities)
export interface PokemonAbility {
  ability: NamedAPIResource;
  is_hidden: boolean;
  slot: number;
}

// 2. Struttura dei Versi (cries)
export interface PokemonCries {
  latest: string;
  legacy: string;
}

// 3. Struttura degli Indici di Gioco (game_indices)
export interface VersionGameIndex {
  game_index: number;
  version: NamedAPIResource;
}

// 4. Struttura dei Dettagli del Gruppo di Versioni per le Mosse
export interface PokemonMoveVersion {
  level_learned_at: number;
  move_learn_method: NamedAPIResource;
  order: number | null;
  version_group: NamedAPIResource;
}

// 5. Struttura delle Mosse (moves)
export interface PokemonMove {
  move: NamedAPIResource;
  version_group_details: PokemonMoveVersion[];
}

// ============================================================================
// INTERFACCIA PRINCIPALE: Rappresenta l'intera struttura del file download.json
// ============================================================================
export interface PokemonDetailResponse {
  id: number;
  name: string;
  is_default: boolean;
  base_experience: number;
  height: number;
  location_area_encounters: string;
  abilities: PokemonAbility[];
  cries: PokemonCries;
  forms: NamedAPIResource[];
  game_indices: VersionGameIndex[];
  held_items: any[]; // Nel file caricato l'array è vuoto []
  moves: PokemonMove[];
}


//---------------------------------------- COMPONENTI ------------------------------------------------------


@Component({
  selector: 'app-root',
  //commonModule per gestire i dati con angular (*ngIf, *ngFor)
  imports: [RouterOutlet, CommonModule], 
  templateUrl: './app.html',
  styleUrl: './app.css',
  }
)

//questo viene trattato come componente, e angular vuole i componenti tutti vicini
export class App 
{
  protected readonly title = signal('web-app');

  //mock array = dati finti, usati per prove
  prodotti: Product[] = [
    { id: 1, nome: 'Laptop Enterprise', categoria: 'Informatica', prezzo: 1200, disponibilita: true },
    { id: 2, nome: 'Monitor 4K', categoria: 'Elettronica', prezzo: 350, disponibilita: true },
    { id: 3, nome: 'Tastiera Meccanica', categoria: 'Accessori', prezzo: 90, disponibilita: false },
    { id: 4, nome: 'Scrivania Regolabile', categoria: 'Ufficio', prezzo: 450, disponibilita: true }
  ];

  prodottiFinti:  Product[] = []; //creato per vedere se funziona @empty

  //---------------------------------pokèmon------------------------------

  //inizializzo array per i dati
  listaPokemon = signal<any[]>([]); 

  //per raccogliere i dati dall'altro costruttore in product.ts
  constructor(private prodotto: ProductService) {}

  //tutto quello qui dentro viene eseguito in automatico
  //quando la pagina si accende nel browser (OnInitialization)
  ngOnInit() 
  {
    //subscribe serve per rimanere in attesa dei dati dall'observable
    this.prodotto.getProduct().subscribe(
      {
        //quando i dati arrivano, viene eseguito 'next' 
        // e 'data' conterrà il json dei prodotti
        next: (data: any) => { 
          this.listaPokemon.set(data.results); 

          //per controllare nel browser se i dati sono arrivati o meno
          console.log("Lista arrivata", this.listaPokemon()); 
        },
        error: (errore) => {
          console.error(errore);
        }
      }
    );
  }

  //---------------------------------dettagli del pokèmon------------------------------

  pokemonSelezionato = signal<PokemonDetailResponse | null>(null);

  caricaDettagli(urlDelPokemon: string)
  {
    console.log("link cliccato");
    
    this.prodotto.getProductDetails(urlDelPokemon).subscribe(
      {
        next: (data: any) => { 
          this.pokemonSelezionato.set(data); 

          //semplice debug
          console.log("Dati caricati con successo al click:", this.pokemonSelezionato());            
        },
        error: (errore: any) => { 
          console.error(errore);
        }
      }
    )
  }
}
