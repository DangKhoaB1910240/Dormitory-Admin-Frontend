import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FeedbackService } from '../Services/feedback/feedback.service';
import { Feedback } from '../Models/feedback/feedback';
import { Admin } from '../Models/admin/admin';
import { AuthService } from '../Services/auth/auth.service';
import { AdminService } from '../Services/admin/admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.css'],
})
export class MaterialComponent implements OnInit {
  feedbacks: Feedback[] = [];
  f!: Feedback;
  selectedDate!: Date;
  admin!: Admin;
  constructor(
    private feedbackService: FeedbackService,
    private authService: AuthService,
    private adminService: AdminService,
    private detect: ChangeDetectorRef
  ) {}
  ngOnInit(): void {
    this.getAllFeedbacks();
    this.adminService
      .getAdminByNoAdmin(this.authService.getUsername())
      .subscribe({
        next: (response: Admin) => {
          this.admin = response;
        },
        error: (error) => {},
      });
  }
  getAllFeedbacks() {
    this.feedbackService.getAllFeedbacks().subscribe({
      next: (response: Feedback[]) => {
        this.feedbacks = response;
        this.detect.detectChanges();
      },
      error: (error) => {},
    });
  }
  emailMaterail() {
    if (this.selectedDate <= new Date()) {
      Swal.fire('Lỗi', 'Vui lòng chọn ngày lớn hơn ngày hiện tại', 'warning');
      return;
    }
    this.feedbackService
      .updateStatus(
        this.f.id,
        this.f.student,
        this.f.roomType,
        this.f.numberRoom,
        this.selectedDate,
        this.admin.id,
        1
      )
      .subscribe({
        next: (response: any) => {
          Swal.fire(
            'Thành công',
            'Đã xác nhận và gửi email phản hồi cho sinh viên thành công',
            'success'
          );
          this.getAllFeedbacks();
        },
        error: (error) => {
          Swal.fire('Lỗi', error.error.message, 'error');
        },
      });
  }
  accept(f: Feedback) {
    this.f = f;
  }
}
