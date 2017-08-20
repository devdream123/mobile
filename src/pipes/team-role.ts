import { Pipe, PipeTransform } from '@angular/core';
import { TeamRoles } from '../models/teams';


@Pipe({
  name: 'teamRole',
})
export class TeamRolePipe implements PipeTransform {

  transform(value: string, ...args) {
    return TeamRoles[value];
  }
}
