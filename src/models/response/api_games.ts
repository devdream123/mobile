export interface GamesList {
    count: number,
    next: number|null,
    previous: number|null,
    results: Game[]
}

export interface Game {
    id: number;
    teams: Array<any>
    datetime: Date,
    location: {
        id: number,
        address: string;
        gis: number | null,
        name: string;
    }
}
