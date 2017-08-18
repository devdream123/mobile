import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { User } from '../../models/user';

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
export class ProfilePage {

    user: User;

    constructor(
        private params: NavParams
    ) {
        this.user = this.params.get('user');
    }

    private editProfile(): void {
        console.log('ProfilePage editProfile()');
    }

}
