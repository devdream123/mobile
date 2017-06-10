import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DataService } from '../../../services';

import { Game } from '../../../models';
import { SingleGame } from '../';

@Component({
    selector: 'my-games-list',
    templateUrl: 'myGamesList.html'
})

export class MyGamesList {

    myGames: Game[] = [];

    constructor(
        private dataService: DataService,
        private navCtrl: NavController
    ) {
    }

    ionViewWillEnter() {
        this.getMyGames();
    }

    getMyGames() {
        return this.dataService.games.getMy()
            .then((res) => {
                this.myGames = res.results;
                console.log('my games list', this.myGames);
            })
            .catch(err => console.log('err getMyGames', err));
    }

    goToGame(id: number) {
        this.navCtrl.push(SingleGame, {
            id
        });
    }

    doRefresh(refresher) {
        setTimeout(() => {
            this.getMyGames();
            refresher.complete();
        }, 1500);
    }
}
