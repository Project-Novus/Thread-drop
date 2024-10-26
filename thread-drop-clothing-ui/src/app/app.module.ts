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
    SignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    HttpClientModule,
    ApolloModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ {
    provide: APOLLO_OPTIONS,
    useFactory: (httpLink: HttpLink) => {
      const uri = 'https://2bef72-db.myshopify.com/api/2023-07/graphql.json';
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
