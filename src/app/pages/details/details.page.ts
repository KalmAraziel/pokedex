import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  pokemon: any;
  sliderOpts = {
    autoplay: {
      delay: 1500,
      disabledOnInteraction: false
    }
  };
  constructor(private route: ActivatedRoute, private pokeServ: PokemonService) { }

  ngOnInit() {
    const index = this.route.snapshot.paramMap.get('index');
    this.pokeServ.getDetails(index).subscribe(pokemon => {
      console.log(pokemon);
      this.pokemon = pokemon;
    });
  }

}
