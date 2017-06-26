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

import { SingleGame, MyGamesList, MyGamesInvitations } from '../pages/games';
import { LoginPage } from '../pages/login';
import { InvitesList } from '../pages/invites';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { PushService, DataService, Enviroment, ShareService } from '../services';

import { LocalNotifications } from '@ionic-native/local-notifications';

import { RSVPStatusPipe } from '../pipes/rsvp_status';


@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    SingleGame,
    MyGamesList,
    LoginPage,
    InvitesList,
    RSVPStatusPipe,
    MyGamesInvitations
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    SingleGame,
    MyGamesList,
    LoginPage,
    InvitesList,
    MyGamesInvitations
  ],
  providers: [
    StatusBar,
    SplashScreen,
    PushService,
    DataService,
    ShareService,
    Enviroment,
    LocalNotifications,
    RSVPStatusPipe
  ]
})
export class AppModule { }
