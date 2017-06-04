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

    /**
     * Updating rsvp status
     * @param game_id game id
     * @param rsvp_id
     * @param rsvp rsvp status 0 - out, 1 - in, 2 - maybe
     */
    // todo model for api response
    public updateRSVP(game_id: number, rsvp_id: number, rsvp: number): Promise<any> {

        return this.api.requestData(RequestMethod.Put, 'games/' + game_id + '/players/' + rsvp_id, {}, { rsvp });
    }

    // todo model for api response
    public myGamesInvitations(): Promise<any> {

        return this.api.requestData(RequestMethod.Get, 'games/invites', {});
    }
}
