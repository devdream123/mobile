import { DataService } from '../DataService';
import { RequestMethod } from '@angular/http';

import { GamesList } from '../../models';

export class GamesAPI {

    constructor(
        private api: DataService
    ) { }

    public getAll(): Promise<GamesList> {

        return this.api.requestData(RequestMethod.Get, '/games', {});
    }

    // todo model for my rsvp games
    public getMy(): Promise<any> {

        return this.api.requestData(RequestMethod.Get, 'games/my', {})
    }

    // todo model for specific game
    public getSingle(id: number): Promise<any> {

        return this.api.requestData(RequestMethod.Get, 'games/' + id, {});
    }
}
