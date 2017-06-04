import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DataService } from '../../../services';

import { Game } from '../../../models';
import { SingleGame } from '../';

@Component({
    selector: 'my-games-list',
    templateUrl: 'myGamesList.html'
})

export class MyGamesList implements OnInit {

    myGames: Game[] = [];

    constructor(
        private dataService: DataService,
        private navCtrl: NavController
    ) { }

    ngOnInit() {
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
}
