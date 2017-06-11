import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../services/DataService';

@Component({
    selector: 'invites-list',
    templateUrl: 'invitesList.html'
})

export class InvitesList implements OnInit {
    constructor(
        private dataService: DataService
    ) { }

    ngOnInit() {
        this.getInvites()
    }

    getInvites() {
        return this.dataService.getInvites()
            .then(res => console.log(res))
            .catch(err => console.log('err getInvites', err));
    }
}
