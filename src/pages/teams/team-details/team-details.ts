import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DataService } from '../../../services/DataService';
import { TeamDetails } from '../../../models/teams';

@Component({
    selector: 'page-team-details',
    templateUrl: 'team-details.html',
})
export class TeamDetailsPage implements OnInit {

    team_id: number;
    team: TeamDetails;
    teamActivity: string = 'info';

    constructor(
        public navCtrl: NavController,
        public params: NavParams,
        private dataService: DataService
    ) {
        this.team_id = this.params.get('id');
    }

    ngOnInit() {
        this.dataService.teams.getTeamDetails(this.team_id)
            .then((team: TeamDetails) => {
                this.team = team;
                console.log('TeamDetailsPage team', team);
            });
    }

    private segmentChanged(ev) {
        console.log('TeamDetailsPage segmentChanged()', ev);
    }

}
