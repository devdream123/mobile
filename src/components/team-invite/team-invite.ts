import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ITeamsInvites } from '../../models/teams';
import { NavController } from 'ionic-angular';
import { TeamDetailsPage } from '../../pages/teams/team-details/team-details';
import { DataService } from '../../services/DataService';
import { Player, User } from '../../models/user';
import { ShareService } from '../../services/ShareService';
import { TeamRolePipe } from '../../pipes/team-role';

@Component({
    selector: 'team-invite',
    templateUrl: 'team-invite.html'
})
export class TeamInviteComponent implements OnInit {

    @Input() teamInvite: ITeamsInvites;
    @Output() statusChanged: EventEmitter<ITeamsInvites> = new EventEmitter();
    user: User;

    constructor(
        private navCtrl: NavController,
        private dataService: DataService,
        private share: ShareService
    ) {
        console.log('Hello TeamInviteComponent Component');
    }

    ngOnInit() {
        this.user = this.share.getUser();

        console.log('TeamInviteComponent ngOnInit', this.teamInvite);
    }

    private goToTeam(ev, id: number): void {
        ev.stopPropagation();
        this.navCtrl.push(TeamDetailsPage, {id})
    }

    private inviteDeclined(): void {
        this.dataService.teams.rejectTeamInvite(this.teamInvite.id, this.teamInvite.role_id)
            .then(() => {
                this.statusChanged.emit(this.teamInvite);
            })
            .catch(err => console.error(err));
    }


    // TODO findout what params are needed
    private inviteAccepted(): void {

        let role = 2;
        this.dataService.teams.acceptTeamInvite(this.teamInvite.id, this.teamInvite.role_id, role)
            .then((res: Player) => {
                console.log('TeamInviteComponent inviteAccepted()', res);
                this.teamInvite.role = res.role;
                this.statusChanged.emit(this.teamInvite);
            });
    }

}
