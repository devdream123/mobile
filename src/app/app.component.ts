import { Component } from '@angular/core';
import { Platform, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';

import { LoginPage } from '../pages/login/login';
import { LocalNotifications } from '@ionic-native/local-notifications';

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    rootPage: any = LoginPage;

    constructor(
        private platform: Platform,
        private statusBar: StatusBar,
        private events: Events,
        private localNotifications: LocalNotifications
    ) {
        this.platformReady();

        this.checkLocalNotifications();

        this.events.subscribe('set_root', (r) => {
            this.rootPage = r;
        });
    }


    platformReady() {
        this.platform.ready().then(() => {
            this.statusBar.hide();

            this.platform.resume.subscribe((e) => {
                console.log('MyApp platformReady(): event resume app', e);
                this.events.publish('app_resume', e);
            });
        });
    }

    private checkLocalNotifications() {

        this.localNotifications.on('click', (notification) => {

            let data = JSON.parse(notification.data);

            console.log('LocalNotification parsed data', data);

            // let nav = this.app.getActiveNav();
            //
            // if (data.game_id) {
            //     nav.push(SingleGame, {
            //         id: data.game_id
            //     });
            // }
        });
    }
}
