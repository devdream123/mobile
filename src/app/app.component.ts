import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { PushService } from '../services/PushService';
import { DataService } from '../services/DataService';

import { TabsPage } from '../pages/tabs/tabs';

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    rootPage: any = TabsPage;

    constructor(
        private platform: Platform,
        private statusBar: StatusBar,
        private splashScreen: SplashScreen,
        private pushService: PushService,
        private dataService: DataService
    ) {
        this.platformReady();
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
        FCMPlugin.getToken = (success, failure) => success('browser-token-' + Math.floor(Math.random() * (1 << 30) + (1 << 30))).then((res) => console.log('res token ', res))
        FCMPlugin.onNotification = (push, success, failure) => success('Mocked FCMPlugin OK');
    }
}
