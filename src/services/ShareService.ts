import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class ShareService {

    private authToken: string;

    constructor(
        private storage: Storage
    ) {

    }

    setAuthToken(token: any) {
        console.log(token);
        this.authToken = token;
    }

    getAuthToken(): string {
        return this.authToken;
    }
}
