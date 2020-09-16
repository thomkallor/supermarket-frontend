import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatToolbarModule} from '@angular/material/toolbar';




import { AppRoutingModule } from './/app-routing.module';
import { TruemarketService } from './truemarket.service';
import { AppConfig, AppGlobals } from './app.config';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { LoginComponent } from './login/login.component';
import { RegisterationComponent } from './registeration/registeration.component';
import { BillingComponent } from './billing/billing.component';
import { ProductComponent } from './product/product.component';
import { AddProductDialogComponent, EditProductDialogComponent } from './product/product.component';
import { HeaderComponent } from './header/header.component';
import { AddUserComponent } from './add-user/add-user.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterationComponent,
    BillingComponent,
    ProductComponent,
    AddProductDialogComponent,
    EditProductDialogComponent,
    HeaderComponent,
    AddUserComponent,
    DashboardComponent,
    UsersComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatInputModule,
    AppRoutingModule,
    MatCardModule,
    MatButtonModule,
    HttpClientModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatAutocompleteModule,
    MatDialogModule,
    MatRadioModule,
    MatSelectModule,
    MatToolbarModule,
  ],
  entryComponents: [
    AddProductDialogComponent,
    EditProductDialogComponent,
    AddUserComponent
  ],
  providers: [
    AppConfig,
    TruemarketService,
    AppGlobals,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
