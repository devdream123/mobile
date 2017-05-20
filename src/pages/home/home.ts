import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { DataService, ShareService } from '../../services';
import { Game } from '../../models';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    @ViewChild('username') username: string;
    @ViewChild('password') password: string;

    loginForm: FormGroup;
    logged: boolean = false;
    games: Game[] = [];

    constructor(
        private navCtrl: NavController,
        private dataService: DataService,
        private shareService: ShareService,
        private formBuilder: FormBuilder
    ) {

        this.loginForm = formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    ionViewDidLoad() {

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
                this.afterLogin();
            })
            .catch(err => console.log('Login error: ', err));
    }

    afterLogin() {
        this.logged = true;
        this.getGames();
    }

    getGames() {
        this.dataService.getGames()
            .then(res => this.games = res.results)
            .catch(err => console.log('err', err));
    }
}
