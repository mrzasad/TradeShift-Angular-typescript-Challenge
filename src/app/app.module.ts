import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MessageComponent } from './message/message.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Utf8EmojisToImagesModule } from 'ng-utf8-emojis-to-images';

@NgModule({
  declarations: [AppComponent, MessageComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    Utf8EmojisToImagesModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
