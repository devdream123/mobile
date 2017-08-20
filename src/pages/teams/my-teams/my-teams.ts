import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Team } from '../../../models/teams';
import { DataService } from '../../../services/DataService';
import { ITeamsAPI } from '../../../models/response/api_teams';

@Component({
    selector: 'page-my-teams',
    templateUrl: 'my-teams.html',
})
export class MyTeamsPage implements OnInit {

    myTeams: Team[];
    managedTeams: Team[];
    teamMembership: string = 'asPlayer';

    constructor(
        private navCtrl: NavController,
        private params: NavParams,
        private dataService: DataService
    ) {
        this.myTeams = this.params.get('teams');
        console.log('MyTeamsPage constructor myteams', this.myTeams);
    }

    ngOnInit() {
        this.getManagedTeams()
            .then(teams => this.managedTeams = teams.results);
    }

    private segmentChanged(ev) {
        console.log('MyTeamsPage segmentChanged ev', ev);
    }

    private getManagedTeams(): Promise<ITeamsAPI> {
        return this.dataService.teams.getManagedTeams();
    }

}
