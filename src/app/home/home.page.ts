import { Component, OnInit, ViewChild } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  offset = 0;
  limit = 0;
  pokemones: any[] = [];
  @ViewChild(IonInfiniteScroll, {static: true}) infinite: IonInfiniteScroll;
  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.loadPokemons();
  }

  loadPokemons(loadMore = false, event?) {
    if (loadMore) {
      this.offset += 25;
    }

    if (this.offset === 800) {
      this.limit = 7;
    }

    this.pokemonService.getPokemon(this.offset, this.limit).subscribe( (pokemons: any) => {
      this.pokemones = [...this.pokemones, ...pokemons];
      console.log('pokemones', this.pokemones);
      if (event) {
        event.target.complete();
      }
      if (this.offset === 1000) {
        this.infinite.disabled = true;
      }
    });
  }

  onSearchChange(e) {
    const pokemon = e.detail.value;
    console.log('buscando: ', pokemon);
    if (pokemon === '') {

      this.offset = 0;
      this.pokemones = [];
      this.loadPokemons();
      return;
    }

    this.pokemonService.findPokemon(pokemon).subscribe( res => {
      this.pokemones = [res];
    }, err => {
      this.pokemones = [];
    });
  }

}
