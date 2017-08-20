import { Component, OnInit } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { DataService } from '../../services/DataService';
import { Player } from '../../models/user';

/**
 * Generated class for the ProfilePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
    selector: 'page-profile',
    templateUrl: 'profile.html',
})
export class ProfilePage implements OnInit {

    id: number;
    user: Player;

    constructor(
        private params: NavParams,
        private dataService: DataService
    ) {
        this.id = this.params.get('id');
    }

    ngOnInit() {
        this.dataService.users.getUserById(this.id)
            .then(user => {
                this.user = user;
            });
    }

    private editProfile(): void {
        console.log('ProfilePage editProfile()');
    }

}
