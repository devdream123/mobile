import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { DataService } from '../../services';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    constructor(
        private navCtrl: NavController,
        private dataService: DataService
    ) {

    }

    ionViewDidLoad() {

    }

    login() {
        this.dataService.login('das', 'das')
            .then(res => console.log('res', res))
            .catch(err => console.log('err', err));
    }

    games() {
        this.dataService.getGames()
            .then(res => console.log('res', res))
            .catch(err => console.log('err', err));
    }

}
