import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

import { DataService } from '../../services/DataService';
import { Game } from '../../models/response/api_games';
import { SingleGame } from '../games/singleGame/singleGame';

@Component({
    selector: 'page-home',
    templateUrl: 'about.html'
})
export class AboutPage implements OnInit {

    games: Game[] = [];

    constructor(
        public navCtrl: NavController,
        private dataService: DataService
    ) {

    }

    ngOnInit() {
        this.getGames();
    }

    getGames() {
        return this.dataService.games.getAll()
            .then(res => this.games = res.results)
            .catch(err => console.log('err getGames', err));
    }

    goToGame(id: number) {
        this.navCtrl.push(SingleGame, {
            id
        });
    }

}
