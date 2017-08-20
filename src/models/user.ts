interface BaseUserInfo {
    id: number;
    first_name: string;
    img: string | null;
    last_name: string;
}

export interface User extends BaseUserInfo {
    bio: string | null;
    birthday: string;
    cover: string | null;
    email: string;
    gender: string;
    invites: MyInvites;
    managed_teams: any[];
    phone: string | null;
}

export interface Player extends BaseUserInfo {
    role: number;
    role_id: number;
}

export interface SignedPlayer extends Player {
    rsvp: number;
}

export interface Manager extends BaseUserInfo {
    bio: string;
}

export interface MyInvites {
    games: number;
    total: number;
}

export interface StoredUser {
    token: string;
}
