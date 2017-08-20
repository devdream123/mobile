import { Game } from '../games';

export interface IGamesAPI {
    count: number;
    next: number | null;
    previous: number | null;
    results: Game[];
}