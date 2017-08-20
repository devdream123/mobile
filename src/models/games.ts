import { Team } from './teams';
import { Player } from './user';

interface BaseGameInfo {
    id: number;
}

export interface Game extends BaseGameInfo {
    datetime: any; // todo think abt solution Date | string
    location: GameLocation;
    description: string;
    duration: any | null;
    name: string | null;
    organizer: Player;
    players: any;
    teams: Team[];
}

// todo verify models and unify them more

export interface RSVPGame extends Game {
    rsvp: number;
    rsvp_id: number;
    team: number;
}

export interface GameLocation {
    id: number;
    address: string;
    gis: number | null;
    name: string;
}