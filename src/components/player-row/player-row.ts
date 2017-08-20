import { Component, Input } from '@angular/core';
import { Player } from '../../models/user';
import { ProfilePage } from '../../pages/profile/profile';
import { NavController } from 'ionic-angular';

@Component({
    selector: 'player-row',
    templateUrl: 'player-row.html'
})
export class PlayerRowComponent {

    @Input() player: Player;

    constructor(
        private navCtrl: NavController
    ) {
        console.log('Hello PlayerRowComponent Component', this.player);
    }

    private goToProfile(id: number): void {
        this.navCtrl.push(ProfilePage, {id})
    }

}
