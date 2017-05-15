import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { DataService, ShareService } from '../../services';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    constructor(
        private navCtrl: NavController,
        private dataService: DataService,
        private shareService: ShareService
    ) {

    }

    ionViewDidLoad() {

    }

    login() {
        this.dataService.login('username', 'password')
            .then(res => {
                console.log('Logged with token: ', res);
                this.shareService.setAuthToken(res.token);
            })
            .catch(err => console.log('Login error: ', err));
    }

    games() {
        this.dataService.getGames()
            .then(res => console.log('res', res))
            .catch(err => console.log('err', err));
    }

}
