import { Team, TeamBaseInfo } from './teams';
import { Player } from './user';

interface BaseGameInfo {
    datetime: any; // todo think abt solution Date | string
    id: number;
    location: GameLocation;
}

export interface Game extends BaseGameInfo {
    description: string;
    duration: any | null;
    name: string | null;
    organizer: Player;
    players: any;
    teams: Team[];
}

export interface RSVPGame extends Game {
    rsvp: number;
    rsvp_id: number;
    team: number;
}

export interface GameLocation {
    id: number;
    address: string;
    gis: {
        coordinates: number[];
    };
    name: string;
}

export interface GameInvite extends BaseGameInfo {
    name: string | null;
    rsvp: number;
    rsvp_id: number;
    team: number;
    teams: TeamBaseInfo[];
}