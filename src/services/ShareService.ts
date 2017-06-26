import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { User } from '../models/user';

@Injectable()
export class ShareService {

    private authToken: string;
    user: User;

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

    setUser(user: User) {
        console.log('ShareService setUser user', user);
        this.user = user;
    }

    getUser(): User {
        console.log('ShareService getUser user', this.user);
        return this.user;
    }
}
