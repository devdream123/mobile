import { Component, OnInit } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { DataService } from '../../../services';
import { RSVPGame } from '../../../models';
import { LocalNotifications } from '@ionic-native/local-notifications';

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
        private navParams: NavParams,
        private localNotifications: LocalNotifications
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

    notifyMeHourBefore() {
        let gameTime = new Date(this.game.datetime);
        let gameTimestamp = gameTime.getTime();
        let notificationTime = new Date(gameTimestamp - 3600000);

        this.localNotifications.schedule({
            id: this.game.id,
            title: this.game.location.name,
            at: notificationTime // show notification 1 hour before the game starts
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
