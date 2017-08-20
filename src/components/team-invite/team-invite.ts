import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ITeamsInvites } from '../../models/teams';
import { NavController } from 'ionic-angular';
import { TeamDetailsPage } from '../../pages/teams/team-details/team-details';
import { DataService } from '../../services/DataService';
import { Player } from '../../models/user';

@Component({
    selector: 'team-invite',
    templateUrl: 'team-invite.html'
})
export class TeamInviteComponent {

    @Input() teamInvite: ITeamsInvites;
    @Output() statusChanged: EventEmitter<ITeamsInvites> = new EventEmitter();

    constructor(
        private navCtrl: NavController,
        private dataService: DataService
    ) {
        console.log('Hello TeamInviteComponent Component');
    }

    private goToTeam(ev, id: number): void {
        ev.stopPropagation();
        this.navCtrl.push(TeamDetailsPage, {id})
    }

    private inviteDeclined(): void {

    }


    // TODO findout what params are needed
    private inviteAccepted(): void {
        this.dataService.teams.acceptTeamInvite(this.teamInvite.id)
            .then((res: Player) => {
                console.log('TeamInviteComponent inviteAccepted()');
                this.teamInvite.role = res.role;
                this.statusChanged.emit(this.teamInvite);
            });
    }

}
