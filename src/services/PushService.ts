import { Injectable } from '@angular/core';
import { FCMPush } from '../models/fcmpush';
import { Push, NewGamePush } from '../models/push';

@Injectable()
export class PushService {
    listening: boolean;

    constructor() {

    }

    public listen(): Promise<any> {
        if (this.listening) {
            console.log('PushService: listen: listener already started');
            return Promise.resolve('Already listening');
        }

        console.log('PushService: listen: enabling listener for push notifications');

        this.listening = true;

        return this
            .setFCMHandler(push => this.handler(push))
            .catch(e => {
                this.listening = false;
                throw e;
            });
    }

    private setFCMHandler(handler: (push: FCMPush) => void): Promise<any> {
        return new Promise<void>((resolve, reject) => {
            FCMPlugin.onNotification(
                handler,
                (msg) => {
                    console.log('PushService: setFCMHandler: onNotification callback successfully registered: ', msg);
                    resolve(msg);
                },
                (err) => {
                    console.log('PushService: setFCMHandler: Error registering onNotification callback: ', err);
                    reject(err);
                }
            );
        });
    }

    private handler(push: FCMPush) {
        console.log('PushService: handler: Procesing PUSH:', push);
        if (!push.data) {
            console.log('Push received - no data attached');
            return;
        }
        let data: Push = JSON.parse(push.data);

        console.log('PushService: handler: Decoded PUSH:', data);

        let type = data.type;

        console.log('PushService: handler: push type:', type);

        let handlers = {
            'new_game': () => this.newGamePush(<NewGamePush>data, push)
        };

        if (typeof handlers[type] === undefined) {
            console.log('PushService: handler: no handler for type - no push defined', type);
            return;
        }

        handlers[type]();
    }

    private newGamePush(data: NewGamePush, push: FCMPush) {
        console.log('PushService: newGamePush: data', data);
    }
}
