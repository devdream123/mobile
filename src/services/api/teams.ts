import { DataService } from '../DataService';
import { RequestMethod } from '@angular/http';
import { ITeamsAPI, ITeamsInvitesAPI } from '../../models/response/api_teams';
import { Player } from '../../models/user';

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

    public getTeamInvites(): Promise<ITeamsInvitesAPI> {
        return this.api.requestData(RequestMethod.Get, 'teams/invites', {});
    }

    public acceptTeamInvite(id: number): Promise<Player> {
        return this.api.requestData(RequestMethod.Put, 'teams/' + id + '/players', {});
    }

}
