import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { RegistrationRoomComponent } from './registration-room/registration-room.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { LoginLayoutComponent } from './layouts/login-layout/login-layout.component';
import { RoomTypeComponent } from './room-type/room-type.component';
import { RoomsComponent } from './rooms/rooms.component';
import { MaterialComponent } from './material/material.component';
import { ContractComponent } from './contract/contract.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterServiceComponent } from './register-service/register-service.component';
import { BillComponent } from './bill/bill.component';
import { StatisticalComponent } from './statistical/statistical.component';
import { PaginationComponent } from './pagination/pagination.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { ServiceComponent } from './service/service.component';
import { InformationComponent } from './information/information.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { AddRoomTypeComponent } from './add-room-type/add-room-type.component';
import { ItemComponent } from './room-type/item/item.component';
import { BlacklistComponent } from './blacklist/blacklist.component';
import { GraduationComponent } from './graduation/graduation.component';
import { NgxPrintModule } from 'ngx-print';
@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NotFoundComponent,
    RegistrationRoomComponent,
    SideBarComponent,
    LoginComponent,
    MainLayoutComponent,
    LoginLayoutComponent,
    RoomTypeComponent,
    RoomsComponent,
    MaterialComponent,
    ContractComponent,
    RegisterServiceComponent,
    BillComponent,
    StatisticalComponent,
    PaginationComponent,
    ProgressBarComponent,
    ServiceComponent,
    InformationComponent,
    ChangePasswordComponent,
    AddRoomTypeComponent,
    ItemComponent,
    BlacklistComponent,
    GraduationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FormsModule,
    NgxSpinnerModule,
    NgxPrintModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
