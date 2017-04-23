import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';

@Injectable()
export class DataService {

    private fcmtoken: string;

    constructor(
        private platform: Platform
    ) {

        this.initFirebase().then((token: string) => {
            this.fcmtoken = token;
        });

    }

    /**
     * Initialize firebase for push notifications and push messages
     */
    initFirebase() {
        return new Promise((resolve, reject) => {
            this.platform.ready().then(() => {
                FCMPlugin.getToken(
                    token => resolve(token),
                    err => reject(err)
                );
            });
        });
    }
}
