import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { DataService, ShareService } from '../../services';
import { Game, User } from '../../models';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage implements OnInit {


    logged: boolean = false;
    games: Game[] = [];
    user: User;
    rsvp: boolean = true;

    constructor(
        private navCtrl: NavController,
        private dataService: DataService,
        private shareService: ShareService
    ) {


    }

    ngOnInit() {
        this.getMe();
        this.getGames();
    }

    ionViewDidLoad() {

    }

    getGames() {
        this.dataService.getGames()
            .then(res => this.games = res.results)
            .catch(err => console.log('err', err));
    }

    getMe() {
        this.dataService.getUsersMe()
            .then(res => {
                console.log(res);
                this.user = res;
            });
    }
}
