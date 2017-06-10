import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Http, Headers, Response, RequestOptions, RequestMethod } from '@angular/http';

import { Enviroment, ShareService } from './';
// import { LoginPage } from '../pages/login/login';
import { GamesAPI } from './api';

import { StoredUser, ApiResponse, UserLoginResponse, GamesList, User } from '../models';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

declare var FCMPlugin: any;
@Injectable()
export class DataService {

    private loggedUser: StoredUser;
    private env;
    private fcmtoken: string;

    private _games = new GamesAPI(this);

    get games() {
        return this._games;
    }

    constructor(
        private platform: Platform,
        private http: Http,
        private shareService: ShareService,
        env: Enviroment
    ) {

        this.env = env.getEnv();

        this.initFirebase().then((token: string) => {
            this.fcmtoken = token;
        });

    }

    public init(user: StoredUser) {
        this.loggedUser = user;
    }

    public deinit() {
        this.loggedUser = null;
    }

    /**
     * Create headers with token authorization
     */
    private createHeaders(withToken: boolean = true) {
        let headers = new Headers();

        headers.append('Content-Type', 'application/json;charset=UTF-8');
        headers.append('Accept', 'application/json');

        if (withToken) {
            let token = this.shareService.getAuthToken()
            headers.append('Authorization', 'JWT ' + token);
        }

        console.log('Prepared headers: ', headers);
        return headers;
    }

    /**
     * Create URL to call API
     * @param {string} url       URL of API endpoint
     * @param {Object} params    Optional parameters for url
     */
    private static createUrl(url: string, params: Object) {
        let newParams = [];
        for (let key in params) {
            let value = params[key];
            if (value === null) {
                value = '';
            }
            newParams.push(encodeURIComponent(key) + '=' + encodeURIComponent(value));
        }
        let qs = newParams.join('&');
        return url + (qs.length ? '?' + qs : '');
    }

    public requestData<T>(
        method: RequestMethod,
        url: string,
        params: Object = {},
        data: Object = null,
        withToken: boolean = true
    ): Promise<T> {
        let realUrl = DataService.createUrl(this.env.api + url, params);

        let options = new RequestOptions({
            method,
            headers: this.createHeaders(withToken),
            body: data ? JSON.stringify(data) : undefined
        });

        return this.http.request(realUrl, options)
            .toPromise()
            .catch(err => this.handleError(err))
            .then(res => res.json())
        // .then((res: ApiResponse<T>) => res.data);
    }

    /**
     * Universal GET data method
     */
    private getData<T>(
        url: string,
        params: Object = {},
        withToken: boolean = true
    ): Promise<T> {
        return this.requestData(RequestMethod.Get, url, params, null, withToken);
    }

    /**
     * POST with JWT
     * @param {string} url       URL of API endpoint
     * @param {Object} params    Optional parameters for url
     * @param {Object} postData  Optional payload to post
     * @param withToken
     */
    private postData<T>(
        url: string,
        params: Object = {},
        postData: Object = {},
        withToken: boolean = true
    ): Promise<T> {
        return this.requestData(RequestMethod.Post, url, params, postData, withToken);
    }

    /**
     * Initialize firebase for push notifications and push messages
     */
    initFirebase() {
        console.log('Firebase initializing...');
        return new Promise((resolve, reject) => {
            // this.platform.ready().then(() => {
            //     FCMPlugin.getToken(
            //         token => resolve(token),
            //         err => reject(err)
            //     );
            // });
        });
    }

    /**
     * User login
     * @param username
     * @param password
     */
    login(username: string, password: string): Promise<UserLoginResponse> {
        let postData = {
            username: username, // provide credencials hardcoded
            password: password
        }

        return this.postData('auth/jwt/', {}, postData, false);
    }

    /**
     * Logout
     * @returns {Promise<T>}
     */
    logout() {

        return this.getData('auth/logout/', {});
    }

    getInvites(): Promise<any> {

        return this.getData('invites/', {});
    }

    getUsersMe(): Promise<User> {

        return this.getData('users/me', {});
    }


    /**
     * Handle errors on API call
     * @param err from http request
     */
    handleError(err): Promise<never> {
        console.warn('DataService: handleError: with: ', err);

        if (err.status === 0) {
            console.log('DataService: handleError: no internet connection');
            return Promise.reject('No internet connection');
        }

        let body: ApiResponse<null> = err.json();

        if (err.status === 400) {
            console.log('DataService: handleError: bad request');
            return Promise.reject(body.msg);
        }

        if (err.status === 401) {
            console.info('DataService: handleError: 401 forbidden');
            this.shareService.setAuthToken(null);
            // this.events.publish('set_root', LoginPage);
            return Promise.reject(body.msg);
        }

        if (err.status === 404) {
            console.log('DataService: handleError: 404 not found');
            return Promise.reject(body.msg);
        }

        if (err.status === 422) {
            console.log('DataService: handleError: form error');

            let fields = body.errors.fields;
            let errors = [];

            // todo global error changed to {}

            if (body.errors.global.length > 0) {
                body.errors.global.forEach(err => {
                    errors.push('[global]: ' + err);
                });
            }

            Object.keys(fields).forEach(function (key) {
                errors.push(fields[key]);
            });

            let error = errors.join('\n');
            console.info('DataService: handleError: form errors:', errors);

            // alert(error);
            return Promise.reject(error);
        }

        if (err instanceof Response) {
            let error = body.msg || 'unknown error';
            error = `${err.status} ${err.statusText}: ${error}`;

            console.error('DataService: handleError: other error:', error);
            return Promise.reject(error);
        }

        let error = err.msg || err.toString();

        console.error('DataService: handleError: generic error:', error);
        return Promise.reject(error);
    }
}
