import { Component } from '@angular/core';
import { Platform, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { PushService } from '../services/PushService';
import { DataService } from '../services/DataService';

import { LoginPage } from '../pages/login/login';

declare var FCMPlugin: any;
@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    rootPage: any = LoginPage;

    constructor(
        private platform: Platform,
        private statusBar: StatusBar,
        private splashScreen: SplashScreen,
        private pushService: PushService,
        private dataService: DataService,
        private events: Events
    ) {
        this.platformReady();

        this.events.subscribe('set_root', (r) => {
            this.rootPage = r;
        });
    }


    platformReady() {
        this.platform.ready().then(() => {
            this.statusBar.hide();
            if (this.platform.is('android')) {
                console.log('MyApp platformReady() start push listening - android platform');
                this.dataService.initFirebase().then((token) => {
                    console.log('success init firebase ', token);
                    this.pushService.listen();
                })
                    .catch(err => console.log('Error init firebase ', err))
            }

            if (this.platform.is('core')) {
                console.log('MyApp platformReady() mock browser push - core platform');
                this.mockForBrowser();
            }
            // this.platform.resume.subscribe((e) => {
            //     console.log('MyApp platformReady(): event resume app', e);
            //     this.event.publish('app_resume', e);
            // });
        });
    }

    private mockForBrowser() {
        console.log('Mock firebase initializing...');
        // FCMPlugin.getToken = (success, failure) => success('browser-token-' + Math.floor(Math.random() * (1 << 30) + (1 << 30)));
        // FCMPlugin.onNotification = (push, success, failure) => success('Mocked FCMPlugin OK');
    }
}
