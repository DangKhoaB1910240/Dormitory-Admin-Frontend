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
import { ContractService } from '../Services/contract/contract.service';
import { Contract } from '../Models/contract/contract';
import { Student } from '../Models/student/student';
import { Admin } from '../Models/admin/admin';
import { AdminService } from '../Services/admin/admin.service';
import { AuthService } from '../Services/auth/auth.service';
import { PeymentService } from '../Services/payment/peyment.service';
import { Payment } from '../Models/payment/payment';

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
  admin: Admin | null = null;
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
    private changeDetectorRef: ChangeDetectorRef,
    private contractService: ContractService,
    private adminService: AdminService,
    private authService: AuthService,
    private paymentService: PeymentService
  ) {}
  ngOnInit(): void {
    this.sesmesterService.getSesmesterByStatus().subscribe({
      next: (response: Sesmester) => {
        this.sesmester = response;
      },
      error: (error) => {},
    });
    this.adminService
      .getAdminByNoAdmin(this.authService.getUsername())
      .subscribe({
        next: (response: Admin) => {
          this.admin = response;
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
  handleAccept(
    id: number,
    student: Student,
    roomType: string,
    numberRoom: number
  ) {
    this.registrationService.updateStatusById(id, 1, '').subscribe({
      next: (response: any) => {
        this.getAllRoomReservation();
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Xác nhận thành công',
          showConfirmButton: false,
          timer: 600,
        });
        this.addContractForAccepted(id, student, roomType, numberRoom);
        let email = new Email(
          student.email,
          'ĐƠN ĐĂNG KÝ PHÒNG ĐÃ ĐƯỢC DUYỆT',
          'Phòng của em đã được duyệt, em có thể dọn vào ở và đăng ký dịch vụ cần thiết theo thời gian quy định (nếu cần) '
        );
        if (student.name != null && student.email != null) {
          console.log(email + ' ' + student.name + ' ' + student.email);
          this.emailService.sendMail(email, student.name, student.email);
        }
      },
      error: (error) => {
        Swal.fire('Có lỗi xảy ra', error.error.message, 'error');
      },
    });
    /**
     * Xử lý thêm vào hợp động
     */
  }
  addContractForAccepted(
    id: number,
    student: Student,
    roomType: string,
    numberRoom: number
  ) {
    // Tạo đối tượng Contract hoặc lấy thông tin Contract cần thêm từ API nếu cần

    const contractToAdd = new Contract(
      null,
      student,
      this.admin,
      this.sesmester,
      null, // totalPrice (có thể để null hoặc 0 nếu không có giá trị cụ thể)
      roomType, // roomType
      numberRoom, // numberRoom
      new Date(), // createdDate (có thể để null hoặc thời gian tạo mặc định)
      [], // services (khởi tạo một danh sách rỗng)
      null, // roomTypeUpdate (có thể để null hoặc giá trị mặc định)
      null, // numberRoomUpdate (có thể để null hoặc giá trị mặc định),
      null
    );

    this.contractService.addContract(contractToAdd).subscribe({
      next: (response: any) => {},
      error: (error) => {
        Swal.fire('Có lỗi xảy ra', error.error.message, 'error');
      },
    });
  }
  // addPayment(payment: Payment) {
  //   this.paymentService.addPayment(payment).subscribe({
  //     next: (response: any) => {},
  //     error: (error) => {
  //       Swal.fire('Có lỗi xảy ra', error.error.message, 'error');
  //     },
  //   });
  // }
  onSelectReason(reason: string) {
    this.reasonCancle = reason;
  }
}
