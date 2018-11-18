import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { ClienteProvider } from '../providers/cliente/cliente';
import { CarroProvider } from '../providers/carro/carro';

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyDvpsrCBkNsSSg1RyQQo8NqWo5vKPkGWYc",
      authDomain: "ionic-dados.firebaseapp.com",
      databaseURL: "https://ionic-dados.firebaseio.com",
      projectId: "ionic-dados",
      storageBucket: "ionic-dados.appspot.com",
      messagingSenderId: "44185946261"
    }),
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ClienteProvider,
    CarroProvider
  ]
})
export class AppModule {}
