import { DataService } from '../DataService';
import { RequestMethod } from '@angular/http';
import { TeamAPI } from '../../models/response/api_teams';

export class TeamsAPI {

    constructor(
        private api: DataService
    ) {
    }

    public getMyTeams(): Promise<TeamAPI> {
        return this.api.requestData(RequestMethod.Get, 'teams/my', {});
    }

}
