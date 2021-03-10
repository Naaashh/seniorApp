import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {ApplicationListComponent} from './application-list/application-list.component';
import {ApplicationComponent} from './application/application.component';
import {ParametersComponent} from './commun/parameters/parameters.component';
import {NgxElectronModule} from 'ngx-electron';
import {FooterComponent} from './commun/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    ApplicationListComponent,
    ApplicationComponent,
    ParametersComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    NgxElectronModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
