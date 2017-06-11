import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

import { DataService } from '../../services';
import { Game, User } from '../../models';
import { SingleGame, MyGamesList, MyGamesInvitations } from '../games';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage implements OnInit {


    games: Game[] = [];
    user: User;
    rsvp: boolean = true;
    myGames: Game[] = [];
    RSVPamount: number;

    constructor(
        private navCtrl: NavController,
        private dataService: DataService
    ) {

    }

    ngOnInit() {
        this.getMe()
            .then(() => this.getMyGames());
    }

    getMyGames() {
        return this.dataService.games.getMy()
            .then((res) => {
                this.myGames = res.results;
                this.RSVPamount = res.count;
            })
            .catch(err => console.log('err getMyGames', err));
    }

    goToGame(id: number) {
        this.navCtrl.push(SingleGame, {
            id
        });
    }

    goToMyGamesList() {

        this.navCtrl.push(MyGamesList);
    }

    goToInvitations() {

        this.navCtrl.push(MyGamesInvitations);
    }

    getMe() {
        return this.dataService.getUsersMe()
            .then(res => {
                console.log('user', res);
                this.user = res;
            })
            .catch(err => console.log('err getMe', err));
    }
}
