import { Component, OnInit } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { DataService } from '../../../services';
import { RSVPGame } from '../../../models';

import moment from 'moment';

@Component({
    selector: 'single-game',
    templateUrl: 'singleGame.html'
})

export class SingleGame implements OnInit {

    private id: number;
    game: RSVPGame;
    canSetNotification: boolean = true;

    rsvpStatus: string | number = null;

    constructor(
        private dataService: DataService,
        private navParams: NavParams
    ) {
        this.id = this.navParams.get('id');
    }

    ngOnInit() {
        this.dataService.games.getSingle(this.id)
            .then(game => {
                console.log(game);
                this.game = game;
                this.rsvpStatus = game.players[0].rsvp;
                let gameTime = new Date(this.game.datetime);
                this.game.datetime = moment(gameTime).format('LLLL');
            });
    }


    statusChanged(e) {
        if (!this.game) {
            return;
        }
        // todo optimize initial value sending
        this.dataService.games.updateRSVP(this.id, this.game.players[0].rsvp_id, Number(e))
            .catch(err => console.log('SingleGame statusChanged err', err))
            .then(() => this.game.players[0].rsvp = Number(e));
    }
}
