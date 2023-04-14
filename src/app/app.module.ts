import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { SafePipe } from 'src/pipe.pipe';
import { NgxLinkPreviewModule } from 'ngx-link-preview';
import { GoogleComponentComponent } from './google-component/google-component.component';
@NgModule({
  declarations: [
    AppComponent,
    SafePipe,
    GoogleComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxLinkPreviewModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
