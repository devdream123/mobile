import { Manager, Player } from './user';

export interface TeamBaseInfo {
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
    'Asked to join' = -2
}

export enum TeamGenderType {
    Male = 2,
    Female = 1,
    Coed = 0
}

export interface Team extends TeamBaseInfo {
    role: number;
    role_id: number;
}

export interface TeamDetails extends TeamBaseInfo {
    managers: Manager[];
    players: Player[];
}

export interface ITeamsInvites {
    id: number;
    info: string;
    name: string;
    role: number;
    role_id: number;
    type: number;
}
