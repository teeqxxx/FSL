// questo è il component

import { CommonModule } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs'; // RxJS è la libreria che gestisce gli Observable


//le interfacce vanno sopra i component
interface Product {
  id: number,
  nome: string,
  categoria: string,
  prezzo: number,
  disponibilita: boolean
}


@Component({
  selector: 'app-root',
  //commonModule per gestire i dati con angular (*ngIf, *ngFor)
  imports: [RouterOutlet, CommonModule], 
  templateUrl: './app.html',
  styleUrl: './app.css'
  }
)

//questo viene trattato come componente, e angular vuole i componenti tutti vicini
export class App {
  protected readonly title = signal('web-app');

  //mock array = dati finti, usati per prove
  prodotti: Product[] = [
    { id: 1, nome: 'Laptop Enterprise', categoria: 'Informatica', prezzo: 1200, disponibilita: true },
    { id: 2, nome: 'Monitor 4K', categoria: 'Elettronica', prezzo: 350, disponibilita: true },
    { id: 3, nome: 'Tastiera Meccanica', categoria: 'Accessori', prezzo: 90, disponibilita: false },
    { id: 4, nome: 'Scrivania Regolabile', categoria: 'Ufficio', prezzo: 450, disponibilita: true }
  ];

  prodottiFinti:  Product[] = []; //prova per vedere se funziona @empty
}
