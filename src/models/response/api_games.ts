export interface GamesList {
    count: number;
    next: number | null;
    previous: number | null;
    results: Game[];
}

export interface Game {
    id: number;
    teams: Array<any>;
    datetime: Date;
    location: GameLocation;
}

export interface MyGames {
    count: number | null;
    next: number | null;
    previous: number | null;
    results: RSVPGame[];
}

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
