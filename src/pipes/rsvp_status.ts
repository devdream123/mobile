import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'rsvpStatus'
})

export class RSVPStatusPipe implements PipeTransform {
    transform(value: any, ...args: any[]): any {

        console.log('transform status');
        switch (value) {
            case 0: {
                value = 'out';
                break;
            }
            case 1: {
                value = 'in'
                break;
            }
            case 2: {
                value = 'maybe'
                break;
            }
            default: {
                console.log('No rsvp status setting to -1 unset');
                value = '';
                break;
            }
        }

        return value;
    }
}
