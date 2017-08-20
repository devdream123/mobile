import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DataService } from '../../../services';

import { Game } from '../../../models';
import { SingleGamePage } from '../';

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
                console.log('MyGamesList getMyGames() games', this.myGames);
            })
            .catch(err => console.log('MyGamesList getMyGames err', err));
    }

    goToGame(id: number) {
        this.navCtrl.push(SingleGamePage, {
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
