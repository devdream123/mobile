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
        this.setAuthTokenInStorage(token);
    }

    getAuthToken(): string {
        return this.authToken;
    }

    private setAuthTokenInStorage(token) {
        this.storage.set('authToken', token);
    }

    getAuthTokenFromStorage(): Promise<string> {
        return this.storage.get('authToken');
    }
}
