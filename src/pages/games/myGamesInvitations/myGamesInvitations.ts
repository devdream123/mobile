import { Component, OnInit } from '@angular/core';

import { DataService } from '../../../services';
import { GamesInvitations, RSVPGame } from '../../../models';
import { LocalNotifications } from '@ionic-native/local-notifications';

@Component({
    selector: 'my-games-invitations',
    templateUrl: 'myGamesInvitations.html'
})

export class MyGamesInvitations implements OnInit {

    gamesInvitations: GamesInvitations[];
    statusSet: boolean = false;

    constructor(
        private dataServcie: DataService,
        private localNotifications: LocalNotifications
    ) {
    }

    ngOnInit() {
        this.getInvitations();
    }

    updateRsvp(status: number, game: RSVPGame) {
        console.log(status, game);

        this.statusSet = true;

        this.dataServcie.games.updateRSVP(game.id, game.rsvp_id, status)
            .catch(() => this.statusSet = false)
            .then(() => game.rsvp = status)
            .then(() => {
                this.createNotifications(game);
            })
            .then(() => {
                this.gamesInvitations.forEach(g => {
                    if (g.id === game.id) this.gamesInvitations.splice(this.gamesInvitations.indexOf(g), 1);
                });
            });
    }

    private getInvitations() {

        this.dataServcie.games.myGamesInvitations()
            .then(res => {
                console.log('MyGamesInvitations onInit: ', res);
                this.gamesInvitations = res.results;
            });
    }

    private createNotifications(game: RSVPGame) {
        this.notifyMeTwoHoursBefore(game);
        this.notifyMe24HoursBefore(game);
    }

    private notifyMeTwoHoursBefore(game: RSVPGame) {
        let gameTime = new Date(game.datetime);
        let gameTimestamp = gameTime.getTime();
        let notificationTime = new Date(gameTimestamp - 7200000);

        this.localNotifications.schedule({
            id: game.id,
            text: 'You have an upcoming game with ' + game.teams[0].name + ' at ' + game.location.name + ' today at ' + gameTime.getHours(),
            at: notificationTime, // show notification 2 hours before the game starts,
            data: {game_id: game.id}
        });
    }

    private notifyMe24HoursBefore(game: RSVPGame) {
        // let gameTime = new Date(game.datetime);
        // let gameTimestamp = gameTime.getTime();
        // let notificationTime = new Date(gameTimestamp - 86400000);

        let notificationTime = new Date(Date.now() + 1000);

        console.log('game RSVP ? ', game);

        this.localNotifications.schedule({
            id: game.rsvp_id,
            ongoing: true,
            text: 'You have an upcoming game with ' + game.teams[0].name + ' at ' + game.location.name + ' tomorrow at ' + 'gameTime.getHours()',
            at: notificationTime, // show notification 24 hours before the game starts
            data: {game_id: game.id}
        });
    }
}
