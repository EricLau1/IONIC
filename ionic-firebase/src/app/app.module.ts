import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ContatoProvider } from '../providers/contato/contato';

// adicionados manualmente
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    // adicionado manualmente
    AngularFireModule.initializeApp({
      //parametros gerados do projeto no firebase
      apiKey: "AIzaSyA8gkanaIl54HK3wJ4jpNK8fGoIb39Wm-Q",
      authDomain: "ionic-crud-e10bf.firebaseapp.com",
      databaseURL: "https://ionic-crud-e10bf.firebaseio.com",
      projectId: "ionic-crud-e10bf",
      storageBucket: "ionic-crud-e10bf.appspot.com",
      messagingSenderId: "416412136563"
    }),
    AngularFireDatabaseModule // adicionado manualmente
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
    ContatoProvider
  ]
})
export class AppModule {}
