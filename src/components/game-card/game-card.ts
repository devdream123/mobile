import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SingleGamePage } from '../../pages/games/singleGame/singleGame';

/**
 * Generated class for the GameCardComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
    selector: 'game-card',
    templateUrl: 'game-card.html'
})
export class GameCardComponent {

    @Input() game: any;

    constructor(
        private navCtrl: NavController
    ) {
        console.log('Hello GameCardComponent Component');
    }

    goToGame(id: number) {
        this.navCtrl.push(SingleGamePage, {
            id
        });
    }

}
