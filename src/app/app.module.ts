import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient, HttpClientModule} from '@angular/common/http';

import { QRCodeModule } from 'angularx-qrcode';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { SellerComponent } from './seller/seller.component';
import { SellerService } from './seller/seller.service';
import { CoreModule } from './core/core.module';
import { SignupComponent } from './seller/signup/signup.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './seller/dashboard/dashboard.component';
import { TicketDetailComponent } from './seller/ticket-detail/ticket-detail.component';
import { CreateTicketComponent } from './seller/create-ticket/create-ticket.component';
import { RedeemComponent } from './seller/redeem/redeem.component';

@NgModule({
  declarations: [
    AppComponent,
    SellerComponent,
    SignupComponent,
    DashboardComponent,
    TicketDetailComponent,
    CreateTicketComponent,
    RedeemComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule,
    SharedModule,
    HttpClientModule,
    TranslateModule.forRoot({
        loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
        }
    }),
    QRCodeModule
  ],
  providers: [
    SellerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}