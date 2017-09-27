import { Injectable } from '@angular/core';

@Injectable()

export class Enviroment {
    api = {
        dev: 'https://dev.goodfoot.club/api/'
    };

    // for device add https://dev.goodfoot.club/api/
    // for browser development /api/
    // "proxies": [{
    //     "path": "/api",
    //     "proxyUrl": "https://dev.goodfoot.club/api"
    // }]

    private env = 'dev';

    constructor() {
        console.log(`Environment: ${this.env} with`, this.getEnv());
    }

    getEnv() {
        let api = this.api[this.env];

        return {
            basic: {
                username: 'SzymonBury',
                password: '1234'
            },
            api
        };
    }

    getEnvName() {
        return this.env;
    }
}
