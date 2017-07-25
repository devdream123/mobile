import { Component, OnInit } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { DataService } from '../../../services';
import { RSVPGame } from '../../../models';

import moment from 'moment';
import { ShareService } from '../../../services/ShareService';
import { User } from '../../../models/user';

@Component({
    selector: 'single-game',
    templateUrl: 'singleGame.html'
})

export class SingleGame implements OnInit {

    private id: number;
    game: RSVPGame;
    user: User;

    rsvpStatus: string | number;

    constructor(
        private dataService: DataService,
        private navParams: NavParams,
        private share: ShareService
    ) {
        this.id = this.navParams.get('id');
    }

    ngOnInit() {
        this.user = this.share.getUser();

        console.log('SingleGame ngOnInit user', this.user);

        this.dataService.games.getSingle(this.id)
            .then(game => {
                console.log('SingleGame ngOnInit game', game);
                this.game = game;
                game.players.find(player => {
                    console.log('SingleGame ngOnInit player, user', player, this.user);
                    if (player.id === this.user.id) {
                        console.log('SingleGame ngOnInit player rsvp', player.rsvp);
                        this.rsvpStatus = player.rsvp;
                    }
                });
                console.log('SingleGame ngOnInit rsvpStatus', this.rsvpStatus);
                let gameTime = new Date(this.game.datetime);
                this.game.datetime = moment(gameTime).format('LLLL');
            });
    }


    statusChanged(e) {
        if (!this.game) {
            return;
        }
        // todo optimize initial value sending

        console.log('SingleGame statusChanged', e);

        let index;
        let player = this.game.players.find((player, i) => {
            if (player.id === this.user.id) {
                console.log('SingleGame statusChanged found', player, i);
                index = i;
                return player;
            }
        });


        if (player) {
            this.dataService.games.updateRSVP(this.id, player.rsvp_id, Number(e))
                .catch(err => console.log('SingleGame statusChanged err', err))
                .then(() => this.game.players[index].rsvp = Number(e));
        }

    }
}
