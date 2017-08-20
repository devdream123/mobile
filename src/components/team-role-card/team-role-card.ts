import { Component, Input } from '@angular/core';
import { Manager, Player } from '../../models/user';

/**
 * Generated class for the TeamRoleCardComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'team-role-card',
  templateUrl: 'team-role-card.html'
})
export class TeamRoleCardComponent {

  @Input() players: Player[];
  @Input() managers: Manager[];

  constructor() {
    console.log('Hello TeamRoleCardComponent Component');
  }

}
