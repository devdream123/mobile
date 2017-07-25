import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
    selector: 'games-list',
    templateUrl: 'gamesList.html'
})

export class GamesList implements OnInit {
    constructor(
        private navCtrl: NavController
    ) { }

    ngOnInit() { }
}
