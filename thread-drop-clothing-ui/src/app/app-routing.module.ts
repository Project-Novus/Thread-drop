import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
// import { EssentialsLayoutComponent } from './layouts/essentials-layout/essentials-layout.component';
import { SignatureLayoutComponent } from './layouts/signature-layout/signature-layout.component';
// import { EliteLayoutComponent } from './layouts/elite-layout/elite-layout.component';
import { LuxuryLayoutComponent } from './layouts/luxury-layout/luxury-layout.component';
import { ProductComponent } from './features/product/product.component';
import { UserComponent } from './features/user/user.component';

const routes: Routes = [
  { path: '', component:MainLayoutComponent},
  { path: 'signature', component:SignatureLayoutComponent},
  { path: 'luxury', component:LuxuryLayoutComponent},
  { path: 'signature/:id', component:ProductComponent }, 
  { path: 'luxury/:id', component:ProductComponent }, 
  { path: 'cart', loadChildren: () => import('./features/cart/cart.module').then(m => m.CartModule) }, 
  { path: 'account', component: UserComponent }, ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
