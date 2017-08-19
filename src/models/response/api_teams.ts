import { Team } from '../teams';

export interface TeamAPI {
    count: number;
    next: number | null;
    previous: number | null;
    results: Team[];
}