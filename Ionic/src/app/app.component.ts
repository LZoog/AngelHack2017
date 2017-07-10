import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LocalNotifications } from '@ionic-native/local-notifications';

import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private localNotifications: LocalNotifications
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

      platform.pause.subscribe(() => {
        this.localNotifications.schedule({
          title: 'Dose Trace Reminder',
          text: `Don't forget to take your medication.`,
          at: new Date(new Date().getTime() + 1000)
        });
      });

      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

