export enum Gender {
    Male,
    Female,
}

export interface Team {
    id: number;
    info?: string;
    managers?: User[];
    name: string;
    players?: any[];
    playersInGame?: any[];  // When team in a game
    role?: any;
    slotsFemale?: string;
    slotsMale?: string;
    type?: any;
}

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
    teams?: Team[];
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
    bio?: string;
    birthday?: Date;
    cover?: string;
    email?: string;
    firstName: string;
    gender?: Gender;
    id?: number;
    img?: string;
    lastName: string;
    managedTeams: Team[];
    games?: GameEvent[];
    phone?: string;


}

export interface StoredUser {
    token: string;
}
