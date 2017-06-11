export interface GamesList {
    count: number;
    next: number | null;
    previous: number | null;
    results: Game[];
}

export interface Game {
    id: number;
    teams: Array<any>;
    datetime: any; // todo think abt solution Date | string
    location: GameLocation;
}

export interface MyGames {
    count: number | null;
    next: number | null;
    previous: number | null;
    results: RSVPGame[];
}

// todo verify models and unify them more

export interface RSVPGame extends SingleGameModel {
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

export interface SingleGameModel extends Game {
    description: string;
    duration: number | null;
    organizer: any;
    players: Array<any>;
}

export interface GamesInvitations extends Game {
    rsvp: number;
    rsvp_id: number;
    team: number;
    teams: TeamInvitations[];
}

export interface TeamInvitations {
    id: number;
    info: string;
    name: string;
    type: number;
}
