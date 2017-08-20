import { Component, OnInit } from '@angular/core';
import { Events, App } from 'ionic-angular';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';

import { LocalNotifications } from '@ionic-native/local-notifications';
import { SingleGamePage } from '../games/singleGame/singleGame';
import { InvitesList } from '../invites/invitesList/invitesList';


@Component({
    templateUrl: 'tabs.html'
})
export class TabsPage implements OnInit {

    tab1Root = HomePage;
    tab2Root = InvitesList;
    tab3Root = ContactPage;

    constructor(
        private events: Events,
        private app: App,
        private localNotifications: LocalNotifications
    ) {
    }

    ngOnInit() {
        this.checkLocalNotifications();
        this.events.subscribe('app_resume', () => {
            this.resumed();
        });

        // this.pushes();
    }

    private resumed() {
        console.log('APP RESUMED');

        this.checkLocalNotifications();
    }

    private checkLocalNotifications() {

        this.localNotifications.on('click', (notification) => {

            let data = JSON.parse(notification.data);

            console.log('LocalNotification parsed data', data);

            let nav = this.app.getActiveNav();

            if (data.game_id) {
                nav.push(SingleGamePage, {
                    id: data.game_id
                });
            }
        });
    }

    // pushes() {
    //     this.push.hasPermission()
    //         .then((res: any) => {
    //
    //             if (res.isEnabled) {
    //                 console.log('We have permission to send push notifications');
    //             } else {
    //                 console.log('We do not have permission to send push notifications');
    //             }
    //
    //         });
    //
    //     const options: PushOptions = {
    //         android: {
    //             senderID: '549974841280'
    //         },
    //         ios: {
    //             alert: 'true',
    //             badge: true,
    //             sound: 'false'
    //         },
    //         windows: {}
    //     };
    //
    //     const pushObject: PushObject = this.push.init(options);
    //
    //
    //     pushObject.on('notification').subscribe((notification: any) => console.log('Received a notification', notification));
    //
    //     pushObject.on('registration').subscribe((registration: any) => console.log('Device registered', registration));
    //
    //     pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));
    // }
}
