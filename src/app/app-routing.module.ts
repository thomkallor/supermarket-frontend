import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterationComponent } from './registeration/registeration.component';
import { BillingComponent } from './billing/billing.component';
import { ProductComponent } from './product/product.component';
import { UsersComponent } from './users/users.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterationComponent },
  { path: 'billing', component: BillingComponent },
  { path: 'billing/:id', component: BillingComponent },
  { path: 'product', component: ProductComponent },
  { path: 'user', component: UsersComponent },
  { path: 'dashboard', component: DashboardComponent },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)],
})
export class AppRoutingModule { }
