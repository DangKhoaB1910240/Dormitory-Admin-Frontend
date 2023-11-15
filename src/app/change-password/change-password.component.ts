import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Services/auth/auth.service';
import { AdminService } from '../Services/admin/admin.service';
import { Admin } from '../Models/admin/admin';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private adminService: AdminService
  ) {}
  admin!: Admin;
  oldPassword: string = '';
  newPassword: string = '';
  newPassword2: string = '';
  ngOnInit(): void {
    this.adminService
      .getAdminByNoAdmin(this.authService.getUsername())
      .subscribe({
        next: (response: Admin) => {
          this.admin = response;
        },
        error: (error) => {},
      });
  }
  changePassword() {
    if (
      this.oldPassword == '' ||
      this.newPassword == '' ||
      this.newPassword2 == ''
    ) {
      Swal.fire('Thất bại', 'Nhập đầy đủ thông tin', 'error');
      return;
    }
    if (this.newPassword != this.newPassword2) {
      Swal.fire('Thất bại', 'Mật khẩu mới nhập lại phải giống nhau', 'error');
      return;
    }
    let password = {
      oldPassword: this.oldPassword,
      newPassword: this.newPassword,
    };
    this.authService
      .changePassword(this.authService.getUsername(), password)
      .subscribe({
        next: (response: void) => {
          Swal.fire('Thành công', 'Đổi mật khẩu thành công', 'success');
          this.oldPassword = '';
          this.newPassword = '';
          this.newPassword2 = '';
        },
        error: (error) => {
          Swal.fire('Thất bại', error.error.message, 'error');
        },
      });
  }
}
