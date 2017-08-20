import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

import { DataService } from '../../services/DataService';
import { SingleGamePage } from '../games/singleGame/singleGame';

@Component({
    selector: 'page-home',
    templateUrl: 'about.html'
})
export class AboutPage implements OnInit {

    games: any[] = [];
    isLoading: boolean = true;

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
            .then(() => this.isLoading = false)
            .catch(err => {
                    this.isLoading = false;
                    console.log('err getGames', err);
                }
            )
    }

    goToGame(id: number) {
        this.navCtrl.push(SingleGamePage, {
            id
        });
    }

}
