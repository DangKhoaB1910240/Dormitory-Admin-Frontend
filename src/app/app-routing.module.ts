import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationRoomComponent } from './registration-room/registration-room.component';
import { LoginComponent } from './login/login.component';
import { LoginLayoutComponent } from './layouts/login-layout/login-layout.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { RoomType } from './Models/roomtype/room-type';
import { RoomTypeComponent } from './room-type/room-type.component';
import { RoomsComponent } from './rooms/rooms.component';
import { MaterialComponent } from './material/material.component';
import { Contract } from './Models/contract/contract';
import { ContractComponent } from './contract/contract.component';
import { BillComponent } from './bill/bill.component';
import { RegisterServiceComponent } from './register-service/register-service.component';
import { StatisticalComponent } from './statistical/statistical.component';
import { ServiceComponent } from './service/service.component';
import { InformationComponent } from './information/information.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { AddRoomTypeComponent } from './add-room-type/add-room-type.component';
const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'room-type', component: RoomTypeComponent },
      { path: 'rooms/:id', component: RoomsComponent },
      { path: 'material', component: MaterialComponent },
      { path: 'contract', component: ContractComponent },
      { path: 'bill', component: BillComponent },
      { path: 'register-service', component: RegisterServiceComponent },
      { path: 'statistical', component: StatisticalComponent },
      { path: 'service', component: ServiceComponent },
      { path: 'information', component: InformationComponent },
      { path: 'password', component: ChangePasswordComponent },
      { path: 'add-room-type', component: AddRoomTypeComponent },
      { path: '', redirectTo: 'contract', pathMatch: 'full' },
      // Thêm các đường dẫn cho các trang khác ở đây
    ],
  },
  {
    path: 'login',
    component: LoginLayoutComponent,
    children: [{ path: '', component: LoginComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
