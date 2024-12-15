import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core.module';
import { SharedModule } from './shared.module';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
// import { EssentialsLayoutComponent } from './layouts/essentials-layout/essentials-layout.component';
import { SignatureLayoutComponent } from './layouts/signature-layout/signature-layout.component';
// import { EliteLayoutComponent } from './layouts/elite-layout/elite-layout.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
// import { PremiumLayoutComponent } from './layouts/premium-layout/premium-layout.component';
import { LuxuryLayoutComponent } from './layouts/luxury-layout/luxury-layout.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { FiltersectionComponent } from './shared/components/filtersection/filtersection.component';
import { ProductComponent } from './features/product/product.component';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { HttpLink } from 'apollo-angular/http';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { InMemoryCache } from '@apollo/client/core';
import { UserComponent } from './features/user/user.component';
import { LoginComponentComponent } from './shared/components/login-component/login-component.component';
import { SignupComponent } from './shared/components/signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductListItemComponent } from './shared/components/product-list-item/product-list-item.component';
import { SizeSelectorComponent } from './shared/components/size-selector/size-selector.component';
import { ProductPageComponent } from './shared/components/product-page/product-page.component';
import { ProductIndividualMobileComponent } from './shared/components/product-individual-mobile/product-individual-mobile.component';
import { ProductIndividualDesktopComponent } from './shared/components/product-individual-desktop/product-individual-desktop.component';
import { FilterChipsComponent } from './shared/components/filtersection/filter-chips/filter-chips.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { AppStateModule } from './state/app-state.module'
@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    SignatureLayoutComponent,
    NavbarComponent,
    FooterComponent,
    LuxuryLayoutComponent,
    FiltersectionComponent,
    ProductComponent,
    UserComponent,
    LoginComponentComponent,
    SignupComponent,
    ProductListItemComponent,
    SizeSelectorComponent,
    ProductPageComponent,
    ProductIndividualMobileComponent,
    ProductIndividualDesktopComponent,
    FilterChipsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    HttpClientModule,
    ApolloModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
   
    StoreRouterConnectingModule.forRoot(),
    AppStateModule,
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
  ],
  providers: [ {
    provide: APOLLO_OPTIONS,
    useFactory: (httpLink: HttpLink) => {
      const uri = 'https://2bef72-db.myshopify.com/api/2024-10/graphql.json';
      const headers = new HttpHeaders().set('X-Shopify-Storefront-Access-Token', '10e37673bbc15bcdc69d8c8e1686f214');

      return {
        cache: new InMemoryCache(),
        link: httpLink.create({
          uri,
          headers
        })
      }
    },
    deps: [HttpLink]
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
