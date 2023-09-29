import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import Swal from 'sweetalert2';
import { RoomReservation } from '../Models/roomreservation/room-reservation';
import { Sesmester } from '../Models/sesmester/sesmester';
import { SesmesterService } from '../Services/sesmester/sesmester.service';
import { RoomReservationService } from '../Services/roomreservation/roomreservation.service';
import { EmailService } from '../Services/email/email.service';
import { Email } from '../Models/email/email';

@Component({
  selector: 'app-registration-room',
  templateUrl: './registration-room.component.html',
  styleUrls: ['./registration-room.component.css'],
})
export class RegistrationRoomComponent {
  sesmester!: Sesmester;
  roomReservation: RoomReservation[] = [];
  cancelReservationId: number | undefined;
  studentName: string = '';
  email: string = '';
  reasonCancle: string = '';
  /**
   sử dụng @ViewChild('closeButton') closeButton: ElementRef;
   để tham chiếu đến thẻ "a" bằng cách sử dụng template reference #closeButton.
   Sau đó, trong hàm onSelectCountry, chúng ta gọi phương thức click() trên this.closeButton.nativeElement để kích hoạt sự kiện click.
   */
  @ViewChild('closeButton') closeButton!: ElementRef;
  constructor(
    private sesmesterService: SesmesterService,
    private registrationService: RoomReservationService,
    private emailService: EmailService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}
  ngOnInit(): void {
    this.sesmesterService.getSesmesterByStatus().subscribe({
      next: (response: Sesmester) => {
        this.sesmester = response;
      },
      error: (error) => {},
    });
    this.getAllRoomReservation();
  }
  openCancelModal(id: number, studentName: string, email: string) {
    this.cancelReservationId = id;
    this.studentName = studentName;
    this.email = email;
  }
  getAllRoomReservation() {
    this.registrationService
      .findRoomReservationsBySesmesterStatusIsTrue()
      .subscribe((response: RoomReservation[]) => {
        this.roomReservation = response;
        // Sử dụng ChangeDetectorRef để cập nhật giao diện
        this.changeDetectorRef.detectChanges();
      });
  }
  handleCancel() {
    // Swal.fire({
    //   position: 'top-end',
    //   icon: 'success',
    //   title: 'Your work has been saved',
    //   showConfirmButton: false,
    //   timer: 1500,
    // });
    console.log(
      this.cancelReservationId +
        ' ' +
        this.reasonCancle +
        ' ' +
        this.studentName
    );
    if (this.reasonCancle == '') {
      Swal.fire('Có lỗi xảy ra', 'Vui lòng chọn lý do hủy bỏ!', 'error');
    } else {
      //Thành công
      //Cập nhật lại status registration
      if (this.cancelReservationId) {
        this.registrationService
          .updateStatusById(this.cancelReservationId, 2, this.reasonCancle)
          .subscribe(() => {
            // Cập nhật lại roomReservation sau khi dữ liệu đã được cập nhật
            this.getAllRoomReservation();
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Bạn đã hủy bỏ thành công',
              showConfirmButton: false,
              timer: 1500,
            });
            //Tắt button
            if (this.closeButton) {
              this.closeButton.nativeElement.click();
            }
          });
      }
      let email = new Email(
        this.email,
        'HỦY BỎ ĐƠN ĐĂNG KÝ Ở',
        'Phòng của em đã bị hủy vì lý do: ' +
          this.reasonCancle +
          '. Em vui lòng chọn phòng khác!'
      );
      this.emailService.sendMail(email, this.studentName, this.email);
      //Gửi mail thông báo
    }
  }
  handleAccept(id: number, studentName: string) {}
  onSelectReason(reason: string) {
    this.reasonCancle = reason;
  }
}
