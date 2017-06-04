import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DataService } from '../../../services';
import { RSVPGame } from '../../../models';
import { LocalNotifications } from '@ionic-native/local-notifications';

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
        private navCtrl: NavController,
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

        this.canSetNotification = false;

        let alertDate = new Date(notificationTime);
        alert(alertDate.toString());
    }

    statusChanged(e) {
        if (!this.game) {
            return;
        }
        // todo optimize initial value sending
        this.dataService.games.updateRSVP(this.id, this.game.players[0].rsvp_id, Number(e));
    }
}
