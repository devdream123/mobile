import { Component, Input } from '@angular/core';
import { Team } from '../../models/teams';
import { TeamDetailsPage } from '../../pages/teams/team-details/team-details';
import { NavController } from 'ionic-angular';

@Component({
    selector: 'team-card',
    templateUrl: 'team-card.html'
})
export class TeamCardComponent {

    @Input() team: Team;

    constructor(
        private navCtrl: NavController
    ) {
        console.log('Hello TeamCardComponent Component');
    }

    private goToTeamDetails(id: number): void {
        this.navCtrl.push(TeamDetailsPage, {id});
    }

}
