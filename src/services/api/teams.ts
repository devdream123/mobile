import { DataService } from '../DataService';
import { RequestMethod } from '@angular/http';
import { ITeamsAPI } from '../../models/response/api_teams';

export class TeamsAPI {

    constructor(
        private api: DataService
    ) {
    }

    public getMyTeams(): Promise<ITeamsAPI> {
        return this.api.requestData(RequestMethod.Get, 'teams/my', {});
    }

    public getManagedTeams(): Promise<ITeamsAPI> {
        return this.api.requestData(RequestMethod.Get, 'teams/managed', {});
    }

    // todo model for team details
    public getTeamDetails(id: number): Promise<any> {
        return this.api.requestData(RequestMethod.Get, 'teams/' + id, {});
    }

}
