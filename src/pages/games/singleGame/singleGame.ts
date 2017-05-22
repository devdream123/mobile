import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DataService } from '../../../services';
import { SingleGameModel } from '../../../models';

@Component({
    selector: 'single-game',
    templateUrl: 'singleGame.html'
})

export class SingleGame implements OnInit {

    private id: number;
    game: SingleGameModel;

    constructor(
        private dataService: DataService,
        private navParams: NavParams,
        private navCtrl: NavController
    ) {
        this.id = this.navParams.get('id');
    }

    ngOnInit() {
        this.dataService.getSpecificGame(this.id)
            .then(game => {
                console.log(game);
                this.game = game;
            });
    }
}
