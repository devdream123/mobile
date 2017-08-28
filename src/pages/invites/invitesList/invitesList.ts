import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../services/DataService';
import { ITeamsInvitesAPI } from '../../../models/response/api_teams';
import { ITeamsInvites } from '../../../models/teams';
import { GameInvite } from '../../../models/games';
import { IGamesInvitesAPI } from '../../../models/response/api_games';

@Component({
    selector: 'invites-list',
    templateUrl: 'invitesList.html'
})

export class InvitesList implements OnInit {

    teamInvites: ITeamsInvites[];
    gameInvites: GameInvite[];

    constructor(
        private dataService: DataService
    ) {
    }

    ngOnInit() {
        this.getTeamInvites();
        this.getGamesInvites();
    }

    private getTeamInvites(): Promise<void> {
        return this.dataService.teams.getTeamInvites()
            .then((res: ITeamsInvitesAPI) => {
                this.teamInvites = res.results;
                console.log('InvitesList getInvites() res', res);
            })
            .catch(err => console.error('err getInvites', err));
    }

    private getGamesInvites(): Promise<void> {
        return this.dataService.games.myGamesInvitations()
            .then((res: IGamesInvitesAPI) => {
                this.gameInvites = res.results;
                console.log('InvitesList getGamesInvites() res', res);
            });
    }

    private rsvpChanged(ev) {
        console.log('InvitesList rsvpChanged() ev', ev);
        this.gameInvites.filter((game, i) => {
            if (game.id === ev.id) {
                this.gameInvites.splice(i, 1);
            }
        });
    }

    private statusChanged(ev) {
        console.log('InvitesList statusChanged() ev', ev);
        this.teamInvites.filter((team, i) => {
            if (team.id === ev.id) {
                this.teamInvites.splice(i, 1);
            }
        });
    }
}
