import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import mapboxgl from 'mapbox-gl';
import { Game } from '../../models/games';
import { DataService } from '../../services/DataService';

@Component({
    selector: 'page-map',
    templateUrl: 'map.html',
})
export class MapPage {

    map: mapboxgl.Map;
    cachedGames;
    visibleGames: Game[];
    markersIds: number[] = [];

    private CracowMainSquare = {
        lat: 50.061724,
        lng: 19.937305
    };

    constructor(
        public navCtrl: NavController,
        private dataService: DataService
    ) {
    }

    ionViewDidEnter() {
        mapboxgl.accessToken = 'pk.eyJ1Ijoic3N6eW1vbm4iLCJhIjoiY2o3NmRxMW0xMHV3MTJ4bnoyZm02eWtvZiJ9.mpaI1MIDie8tDl5CtjB6LA';
        let promise = Promise.resolve();
        promise.then(() => {
            this.map = new mapboxgl.Map({
                container: 'map',
                style: 'mapbox://styles/mapbox/streets-v9',
                center: [this.CracowMainSquare.lng, this.CracowMainSquare.lat],
                zoom: 12
            });
        }).then(() => {
            this.getGamesBoudaries()
                .then((games) => {

                })
        }).then(() => {
            this.map.on('dragend', () => this.handleMap());
        })
    }

    private createLngLat(lat: number, lng: number): mapboxgl.LngLat {
        return new mapboxgl.LngLat(lng, lat);
    }

    private getGamesBoudaries() {
        let b = this.map.getBounds();
        let ne = b.getNorthEast();
        let sw = b.getSouthWest();

        let bounds = [Number(ne.lat), Number(ne.lng), Number(sw.lat), Number(sw.lng)];

        console.log('MapPage getGamesBoudaries', b, ne, sw, sw.lat.toString());
        return this.dataService.games.getGamesInBoundaries(bounds)
            .then((res: any) => {
                console.log('MapPage getGamesBoudaries', res);
                this.visibleGames = res.results;

                this.visibleGames.forEach((game) => {
                    this.createPin(game);
                })
            });
    }

    private handleMap() {
        this.getGamesBoudaries();
    }

    private handlePins(game: Game) {

        this.markersIds.forEach(id => {
            if (id === game.id) {
                console.log('there is such');
                return;
            } else {
                console.log('this one is new');
                this.markersIds.push(game.id);
                this.createPin(game)
            }
        });
    }

    private createPin(game: Game) {
        console.log('find', this.markersIds.find(id => id === game.id));
        let check = this.markersIds.find(id => id === game.id);
        if (check) return;

        this.markersIds.push(game.id);

        // create a DOM element for the marker
        let el = document.createElement('div');
        el.className = 'marker';
        el.style.backgroundImage = 'url(https://placekitten.com/g/40/40';
        el.style.width = '40px';
        el.style.height = '40px';

        el.addEventListener('click', () => {
            alert(game.name);
        });


        let pin = new mapboxgl.Marker(el)
            .setLngLat(this.createLngLat(game.location.gis.coordinates[0], game.location.gis.coordinates[1]))
            .addTo(this.map);
        console.log(123, pin);
    }

}
