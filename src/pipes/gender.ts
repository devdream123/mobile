import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the GenderPipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
    name: 'gender',
})
export class GenderPipe implements PipeTransform {

    transform(value: string, ...args) {

        switch (value) {
            case 'M' :
                value = 'Male';
                break;
            case 'F' :
                value = 'Female';
                break;
            default:
                value = 'Uncertain';
        }

        return value.toUpperCase();
    }
}
