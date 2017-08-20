import { ITeamsInvites, Team } from '../teams';

export interface ITeamsAPI {
    count: number;
    next: number | null;
    previous: number | null;
    results: Team[];
}

export interface ITeamsInvitesAPI {
    count: number;
    next: number | null;
    previous: number | null;
    results: ITeamsInvites[];
}
