import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationRoomComponent } from './registration-room/registration-room.component';
const routes: Routes = [
  { path: 'registration-room', component: RegistrationRoomComponent },
  { path: '', redirectTo: '/registration-room', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
