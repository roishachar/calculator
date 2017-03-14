import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {AngularFireModule} from "angularfire2";
import { CalcComponent } from './calc/calc.component';

// Must export the config
export const firebaseConfig = {
  apiKey: 'AIzaSyAw1_A4ydVzGjpNGkJjsfLsmVGktmZTk2E',
  authDomain: 'robo-40587.firebaseapp.com',
  databaseURL: 'https://robo-40587.firebaseio.com',
  storageBucket: 'robo-40587.appspot.com',
  messagingSenderId: '422055400564'
};

@NgModule({
  declarations: [
    AppComponent,
    CalcComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
