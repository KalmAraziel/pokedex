import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  baseUrl = 'https://pokeapi.co/api/v2';
  imgageUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon';

  constructor(private http: HttpClient) {
  }

  getPokemon(offset= 0, limit = 25) {
    return this.http.get(`${ this.baseUrl }/pokemon?offset=${ offset }&limit=${ limit }`).pipe(
      map( (result: any) => {
        return result.results;
      }),
      map( pokemons => {
        return pokemons.map( (poke, index) => {
          poke.image = this.getPokemonImage(index + offset + 1);
          poke.pokeIndex = index + offset + 1;
          return poke;
        });
      })
    );
  }

  getPokemonImage(index) {
    // console.log('getPokemonImage: ', index);
    return `${ this.imgageUrl }/${ index }.png`;
  }

  findPokemon(search: string) {
    return this.http.get(`${ this.baseUrl }/pokemon/${ search }`).pipe(
      map( (pokemon: any) => {
        pokemon.image = this.getPokemonImage(pokemon.id);
        pokemon.pokeIndex = pokemon.id;
        return pokemon;
      })
    );
  }

  getDetails(index) {
    return this.http.get(`${ this.baseUrl }/pokemon/${ index }`).pipe(
      map( (poke: any) => {
        poke.images = Object.keys(poke.sprites).map( imgs => poke.sprites[imgs])
        .filter( img => img);
        return poke;
      })
    );
  }
}
