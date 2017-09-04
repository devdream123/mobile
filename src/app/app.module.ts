import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { MyGamesList } from '../pages/games';
import { LoginPage } from '../pages/login';
import { InvitesList } from '../pages/invites';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { DataService, Enviroment, ShareService } from '../services';

import { LocalNotifications } from '@ionic-native/local-notifications';

import { RSVPStatusPipe } from '../pipes/rsvp_status';
import { GamesList } from '../pages/games/gamesList/gamesList';

import { CloudSettings, CloudModule } from '@ionic/cloud-angular';
import { ComponentsModule } from '../components/components.module';
import { GameCardComponent } from '../components/game-card/game-card';
import { GenderPipe } from '../pipes/gender';
import { ProfilePage } from '../pages/profile/profile';
import { MyTeamsPage } from '../pages/teams/my-teams/my-teams';
import { TeamCardComponent } from '../components/team-card/team-card';
import { TeamDetailsPage } from '../pages/teams/team-details/team-details';
import { TeamRoleCardComponent } from '../components/team-role-card/team-role-card';
import { PlayerRowComponent } from '../components/player-row/player-row';
import { SingleGamePage } from '../pages/games/singleGame/singleGame';
import { TeamRolePipe } from '../pipes/team-role';
import { TeamInviteComponent } from "../components/team-invite/team-invite";
import { GameInviteComponent } from '../components/game-invite/game-invite';
import { MapPage } from '../pages/map/map';

const cloudSettings: CloudSettings = {
    'core': {
        'app_id': 'ac2957a1'
    }
};

@NgModule({
    declarations: [
        MyApp,
        AboutPage,
        ContactPage,
        HomePage,
        TabsPage,
        SingleGamePage,
        MyGamesList,
        LoginPage,
        InvitesList,
        RSVPStatusPipe,
        GamesList,
        GameCardComponent,
        ProfilePage,
        GenderPipe,
        MyTeamsPage,
        TeamCardComponent,
        TeamDetailsPage,
        TeamRoleCardComponent,
        PlayerRowComponent,
        TeamRolePipe,
        TeamInviteComponent,
        GameInviteComponent,
        MapPage
    ],
    imports: [
        BrowserModule,
        HttpModule,
        IonicModule.forRoot(MyApp),
        IonicStorageModule.forRoot(),
        CloudModule.forRoot(cloudSettings)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        AboutPage,
        ContactPage,
        HomePage,
        TabsPage,
        SingleGamePage,
        MyGamesList,
        LoginPage,
        InvitesList,
        GamesList,
        GameCardComponent,
        ProfilePage,
        MyTeamsPage,
        TeamDetailsPage,
        MapPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        DataService,
        ShareService,
        Enviroment,
        LocalNotifications,
        RSVPStatusPipe
    ]
})
export class AppModule {
}
