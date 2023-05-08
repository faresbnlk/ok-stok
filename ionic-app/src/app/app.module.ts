import { PingBackendResolver } from './components/maintenace/ping-backend.resolver';
import { ProductKwSearchResolver } from './pages/product/product-kw-search/product-kw-search.resolver';
import { ProductListingPage } from './pages/product/product-list/product-list.page';
import { LanguagePopoverPageModule } from './pages/language-popover/language-popover.module';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedComponentsModule } from './components/shared-components.module';
import { AuthService } from './services/htpp/authentication/auth.service';
import { HttpInterceptorService } from './services/htpp/http-intercepter.service';
import { SpinnerComponent } from "./services/htpp/spinner/spinner.component";
import { Storage } from '@ionic/storage';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgOtpInputModule } from 'ng-otp-input';
import { IonIntlTelInputModule } from 'ion-intl-tel-input';
import { ProductResolver } from './pages/product/product-list/product.resolver';
import { ProductViewResolver } from './pages/product-view/product-view.resolver';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}
@NgModule({
    declarations: [AppComponent, SpinnerComponent],
    providers: [
        AuthService,
        {
            provide: RouteReuseStrategy,
            useClass: IonicRouteStrategy,
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpInterceptorService,
            multi: true
        },
        Storage,
        ProductResolver,
        ProductKwSearchResolver,
        ProductViewResolver,
        PingBackendResolver
    ],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule, IonicModule.forRoot(),
        AppRoutingModule, SharedComponentsModule,
        HttpClientModule, TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (createTranslateLoader),
                deps: [HttpClient]
            }
        }),
        LanguagePopoverPageModule,
        ReactiveFormsModule,
        FormsModule,
        NgOtpInputModule,
        IonIntlTelInputModule
    ]
})
export class AppModule {}
