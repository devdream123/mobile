interface GamePush {
    game_id: number;
}

export interface NewGamePush extends GamePush {
    type: 'new_game';
    price: string;
    title: string;
    players_amount: number;
}

export interface GameRevokedPush extends GamePush {
    type: 'revoked_game';
    revoked_by: string;
    title: string;
    date: number;
}

export type Push = NewGamePush
    | GameRevokedPush