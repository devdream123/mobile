import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

import { DataService, ShareService } from '../../services';
import { Game, User } from '../../models';
import { SingleGame } from '../games';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage implements OnInit {


    logged: boolean = false;
    games: Game[] = [];
    user: User;
    rsvp: boolean = true;
    myGames: Game[] = [];
    RSVPamount: number;

    constructor(
        private navCtrl: NavController,
        private dataService: DataService,
        private shareService: ShareService
    ) {

    }

    ngOnInit() {
        this.getMe()
            .then(() => this.getMyGames())
            .then(() => this.getGames());
    }

    getGames() {
        return this.dataService.getGames()
            .then(res => this.games = res.results)
            .catch(err => console.log('err', err));
    }

    getMyGames() {
        return this.dataService.getMyGames()
            .then((res) => {
                console.log('MyGames: ', res);
                this.myGames = res.results;
                this.RSVPamount = res.count;
            });
    }

    goToGame(id: number) {
        this.navCtrl.push(SingleGame, {
            id: id
        });
    }

    getMe() {
        return this.dataService.getUsersMe()
            .then(res => {
                this.user = res;
            });
    }
}
