// export enum Gender {
//     Male,
//     Female,
// }

// export interface Team {
//     id: number;
//     info?: string;
//     managers?: User[];
//     name: string;
//     players?: any[];
//     playersInGame?: any[];  // When team in a game
//     role?: any;
//     slotsFemale?: string;
//     slotsMale?: string;
//     type?: any;
// }

export interface GameEvent {
    id: number;
    datetime: string | string[];
    // datetime: Date;
    duration?: number; // Minutes
    description?: string;
    // eventType?: GameType;
    // league?: League;
    location: Location;
    players?: any[];
    playersById?: { [id: number]: any };
    rsvp?: any;
    // playersCount?: PlayersCount;
    // playersNeeded?: PlayersCount;
    teams?: any[];
    // result?: Result;
    organizer?: User;
    // get name(): string {
    //     if (this.teams && this.teams.length > 0) {
    //         return this.teams.map((team) => team.name).join(', ');
    //     }
    //     return 'Pickup game';
    // };
}

export interface User {
    bio: string | null;
    birthday: string;
    cover: string | null;
    email: string;
    first_name: string;
    gender: string;
    id: number;
    img: string | null;
    invites: MyInvites;
    last_name: string;
    managed_teams: any[];
    phone: string | null;
}

export interface UserPlayer {
    id: number;
    bio: string;
    cover: string | null;
    first_name: string;
    img: string | null;
    last_name: string;
}

export interface MyInvites {
    games: number;
    total: number;
}

export interface StoredUser {
    token: string;
}
