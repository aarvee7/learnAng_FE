import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule, MatInput } from '@angular/material/input';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MsgsComponent } from './messages.component';
import { WebService } from './web.service';
import { HttpModule } from '@angular/http';
import { NewMsgComponent } from './new-message.component';
import { NavComponent } from './nav.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { RegisterComponent } from './register.component';
import { AuthService } from './auth.service';
import { LoginComponent } from './login.component';
import { UserComponent } from './user.component';
import { DataTablesModule } from 'angular-datatables';

import { TableComponent } from './table.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

var rouets = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'messages',
    component: MsgsComponent,
  },
  {
    path: 'messages/:name',
    component: MsgsComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'user',
    component: UserComponent,
  },
  {
    path: 'tableview',
    component: TableComponent,
  },
];

@NgModule({
  declarations: [
    AppComponent,
    MsgsComponent,
    NewMsgComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    UserComponent,
    TableComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    //MatInput,
    MatToolbarModule,
    MatFormFieldModule,
    MatCardModule,
    HttpModule,
    FormsModule,
    MatToolbarModule,
    RouterModule.forRoot(rouets),
    ReactiveFormsModule,
    DataTablesModule,
    NgbModule,
    BsDatepickerModule.forRoot(),
  ],
  providers: [WebService, AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
