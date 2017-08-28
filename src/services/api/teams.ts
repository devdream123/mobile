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

    public acceptTeamInvite(teamId: number, roleId: number, role: number): Promise<any> {
        return this.api.requestData(RequestMethod.Put, 'teams/' + teamId + '/players/' + roleId, {}, {role});
    }

    public rejectTeamInvite(teamId: number, roleId: number) {
        return this.api.requestData(RequestMethod.Delete, 'teams/' + teamId + '/players/' + roleId, {});
    }
}
