import { Component, ViewChild, OnInit } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService, ShareService } from '../../services';

import { TabsPage } from '../tabs/tabs';

@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})
export class LoginPage implements OnInit {
    @ViewChild('username') username: string;
    @ViewChild('password') password: string;

    loginForm: FormGroup;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private dataService: DataService,
        private formBuilder: FormBuilder,
        private shareService: ShareService,
        private events: Events
    ) {

        this.loginForm = formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    ngOnInit() {
        this.shareService.getAuthTokenFromStorage()
            .then(token => {
                    token
                        ? this.shareService.setAuthToken(token)
                        : console.log;

                    return token;
                }
            )
            .catch(err => console.log(err))
            .then(token => token ? this.events.publish('set_root', TabsPage) : console.log('user not logged'));
    }

    login() {
        if (!this.loginForm.valid) {
            alert('Fill login fields first');
            return;
        }

        let username = this.loginForm.value.username;
        let password = this.loginForm.value.password;

        this.dataService.login(username, password)
            .then(res => {
                this.shareService.setAuthToken(res.token);
                this.events.publish('set_root', TabsPage);

            })
            .catch(err => console.log('Login error: ', err));
    }

}
