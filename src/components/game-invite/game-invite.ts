import { Component, Input, EventEmitter, Output } from '@angular/core';
import { GameInvite, RSVPGame } from '../../models/games';
import { DataService } from '../../services/DataService';

@Component({
    selector: 'game-invite',
    templateUrl: 'game-invite.html'
})
export class GameInviteComponent {

    @Input() gameInvite: GameInvite;
    @Output() rsvpChanged: EventEmitter<GameInvite> = new EventEmitter();

    constructor(
        private dataService: DataService
    ) {
        console.log('Hello GameInviteComponent Component');
    }

    private updateRsvp(status: number, game: RSVPGame) {
        console.log(status, game);

        this.dataService.games.updateRSVP(game.id, game.rsvp_id, status)
            .then(() => {
                this.gameInvite.rsvp = status;
                this.rsvpChanged.emit(this.gameInvite);
            });
    }
}
