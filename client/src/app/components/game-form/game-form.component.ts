import { Component, OnInit, HostBinding } from '@angular/core';
import { Game } from '../../models/Game';
import { Router, ActivatedRoute } from '@angular/router'

import {GamesService} from '../../services/games.service'

@Component({
  selector: 'app-game-form',
  templateUrl: './game-form.component.html',
  styleUrls: ['./game-form.component.css']
})
export class GameFormComponent implements OnInit {

  @HostBinding('class') classes ='row';

  edit: boolean = false;


  game: Game= {
    id:0,
    title: '',
    description: '',
    image: '',
    created_at: new Date()
  }

  constructor(private gameService: GamesService, private route: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    const params= this.activatedRoute.snapshot.params;
    console.log(params);
    if (params.id){
      this.gameService.getGame(params.id)
        .subscribe(
          res =>{
            console.log(res);
            this.game = res;
            this.edit = true;
          },
          err => console.log(err)
        )
    }
  }

  saveNewGame(){
    this.gameService.saveGame(this.game)
      .subscribe(
        res => {
          console.log(res);
          this.route.navigate(['/games'])
        },
        err => console.log(err)
      )
  }

  updateGame(){
    delete this.game.created_at;
    this.gameService.updateGame(this.game.id, this.game)
      .subscribe(
        res => {
          console.log(res);
          this.route.navigate(['/games'])
        },
        err => console.log(err)
      )
  }

}

