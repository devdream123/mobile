import { Game, GameInvite } from '../games';

export interface IGamesAPI {
    count: number;
    next: number | null;
    previous: number | null;
    results: Game[];
}

export interface IGamesInvitesAPI {
    count: number;
    next: number | null;
    previous: number | null;
    results: GameInvite[];
}