import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Services/auth/auth.service';
import { AdminService } from '../Services/admin/admin.service';
import { Admin } from '../Models/admin/admin';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css'],
})
export class InformationComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private adminService: AdminService
  ) {}
  admin!: Admin;
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
}
