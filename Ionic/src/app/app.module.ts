import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { HttpModule } from '@angular/http';

import { StateService, ConnectService } from './../services/index';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { PrescriptionPageModule } from './../pages/prescription/prescription.module';
import { PrescriptionCardComponent } from '../components/prescription-card/prescription-card';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    PrescriptionCardComponent
  ],
  imports: [
    BrowserModule,
    PrescriptionPageModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    LocalNotifications,
    StateService,
    ConnectService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
