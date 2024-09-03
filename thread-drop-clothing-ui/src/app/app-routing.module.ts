import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { EssentialsLayoutComponent } from './layouts/essentials-layout/essentials-layout.component';
import { SignatureLayoutComponent } from './layouts/signature-layout/signature-layout.component';
import { EliteLayoutComponent } from './layouts/elite-layout/elite-layout.component';
import { LuxuryLayoutComponent } from './layouts/luxury-layout/luxury-layout.component';

const routes: Routes = [
  { path: '', component:MainLayoutComponent},
  { path: 'essentials', component:EssentialsLayoutComponent},
  { path: 'signature', component:SignatureLayoutComponent},
  { path: 'luxury', component:LuxuryLayoutComponent},
  { path: 'products', loadChildren: () => import('./features/product/product.module').then(m => m.ProductModule) }, 
  { path: 'cart', loadChildren: () => import('./features/cart/cart.module').then(m => m.CartModule) }, 
  { path: 'user', loadChildren: () => import('./features/user/user.module').then(m => m.UserModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
