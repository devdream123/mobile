import { Component } from '@angular/core';
import { Events } from 'ionic-angular';
import { DataService } from '../../services/DataService';
import { ShareService } from '../../services/ShareService';
import { LoginPage } from '../login/login';

@Component({
    selector: 'page-contact',
    templateUrl: 'contact.html'
})
export class ContactPage {

    constructor(
        private dataService: DataService,
        private shareService: ShareService,
        private event: Events
    ) {

    }


    logout() {
        // this.dataService.logout()
        // .then(() => {
        this.shareService.setAuthToken(null);
        this.event.publish('set_root', LoginPage);
        //});
    }

}
