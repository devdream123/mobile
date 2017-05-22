import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DataService } from '../../services';
import { RSVPGame } from '../../models';

import { SingleGame } from '../games';

@Component({
    selector: 'page-about',
    templateUrl: 'about.html'
})
export class AboutPage {

    myGames: RSVPGame[] = [];
    RSVPamount: number;

    constructor(
        public navCtrl: NavController,
        private dataService: DataService
        ) {

    }

    ionViewWillEnter() {
        this.dataService.getMyGames()
            .then((res) => {
                console.log('MyGames: ', res);
                this.myGames = res.results;
                this.RSVPamount = res.count;
            });
    }

    goToGame(id: number) {
        console.log(id);
        this.navCtrl.push(SingleGame, {
            id: id
        });
    }

}
