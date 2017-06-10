import { Component, OnInit } from '@angular/core';

import { DataService } from '../../../services';
import { GamesInvitations, RSVPGame } from '../../../models';

@Component({
    selector: 'my-games-invitations',
    templateUrl: 'myGamesInvitations.html'
})

export class MyGamesInvitations implements OnInit {

    gamesInvitations: GamesInvitations[];
    statusSet: boolean = false;

    constructor(
        private dataServcie: DataService
    ) {
    }

    ngOnInit() {
        this.getInvitations()
    }

    updateRsvp(status: number, game: RSVPGame) {
        console.log(status, game);

        this.statusSet = true;

        this.dataServcie.games.updateRSVP(game.id, game.rsvp_id, status)
            .catch(() => this.statusSet = false)
            .then(() => game.rsvp = status)
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
}
