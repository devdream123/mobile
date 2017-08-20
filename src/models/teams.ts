import { Manager, Player } from './user';

interface TeamBaseInfo {
    id: number;
    info: string;
    name: string;
    type: number;
}

export enum TeamRoles {
    Capitan = 3,
    Player = 2,
    Substitute = 1,
    Inactive = 0,
    Invited = -1,
    Asked_to_join = -2
}

export interface Team extends TeamBaseInfo {
    role: number;
    role_id: number;
}

export interface TeamDetails extends TeamBaseInfo {
    managers: Manager[];
    players: Player[];
}
