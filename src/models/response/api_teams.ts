import { Team } from '../teams';

export interface ITeamsAPI {
    count: number;
    next: number | null;
    previous: number | null;
    results: Team[];
}
