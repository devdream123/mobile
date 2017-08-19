import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

import { DataService } from '../../services';
import { Game, User } from '../../models';
import { SingleGame, MyGamesList, MyGamesInvitations } from '../games';

import moment from 'moment';
import { ShareService } from '../../services/ShareService';
import { ProfilePage } from '../profile/profile';

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
        private dataService: DataService,
        private share: ShareService
    ) {

    }

    ngOnInit() {
        this.getMe()
            .then(() => this.getMyGames());
    }

    private getMyGames(): Promise<void> {
        return this.dataService.games.getMy()
            .then((res) => {
                this.myGames = res.results;
                this.RSVPamount = res.count;

                if (this.myGames.length > 0) {
                    let gameTime = new Date(this.myGames[0].datetime);
                    this.myGames[0].datetime = moment(gameTime).format('LLLL');
                }
            })
            .catch(err => console.log('err getMyGames', err));
    }

    private getMe(): Promise<void> {
        return this.dataService.users.getMyProfile()
            .then(res => {
                console.log('user', res);
                this.user = res;
                this.share.setUser(res);
            })
            .catch(err => console.log('err getMe', err));
    }

    private goToGame(id: number): void {
        this.navCtrl.push(SingleGame, {
            id
        });
    }

    private goToMyGamesList(): void {

        this.navCtrl.push(MyGamesList);
    }

    private goToMyInvitations(): void {

        this.navCtrl.push(MyGamesInvitations);
    }

    private goToProfile(): void {
        this.navCtrl.push(ProfilePage, {id: this.user.id});
    }

    private goToMyTeams(): void {

    }
}
