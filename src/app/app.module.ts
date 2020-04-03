import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ConfigComponent } from './config/config.component';
import { AppRoutingModule } from './app-routing.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { CustomTranslateLoader } from './shared/custom-translate-loader';

@NgModule({
  declarations: [
    AppComponent,
    ConfigComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {provide: TranslateLoader, useClass: CustomTranslateLoader}
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
