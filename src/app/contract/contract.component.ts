import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ContractService } from '../Services/contract/contract.service';
import { ContractResponseDto } from '../Models/contract/contract-response-dto';
import { Sesmester } from '../Models/sesmester/sesmester';
import { SesmesterService } from '../Services/sesmester/sesmester.service';
import { Page } from '../Models/page/page';
import { Contract } from '../Models/contract/contract';
import { BlacklistService } from '../Services/blacklist/blacklist.service';
import Swal from 'sweetalert2';
import { AdminService } from '../Services/admin/admin.service';
import { AuthService } from '../Services/auth/auth.service';
import { Admin } from '../Models/admin/admin';
import { StudentService } from '../Services/student/student.service';

@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.css'],
})
export class ContractComponent implements OnInit {
  sesmesters: Sesmester[] = [];
  majors: string[] = [];
  numberStudents: string[] = [];
  contracts: ContractResponseDto[] = [];
  // Binding 2 chiều
  sesmester: number | null = null;
  schoolYear: string | null = null;
  major: string | null = null;
  numberStudent: string | null = null;
  gender: number | null = null;
  currentPage = 1;
  totalElements!: number;
  limit!: number;
  totalPrice: number = 0;
  currentPrice: number = 0;
  unpayPrice: number = 0;
  search: string = '';
  studentStatus: number = 0;
  reason: string = '';
  contract!: ContractResponseDto;
  admin!: Admin;
  s: Sesmester = {
    id: null,
    sesmester: 0,
    schoolYear: '',
    startDate: null,
    endDate: null,
    registrationEndDate: null,
    registrationStartDate: null,
    status: false,
    holidayWeek: 0,
  };
  // kết thúc Binding 2 chiều
  constructor(
    private contractService: ContractService,
    private sesmesterService: SesmesterService,
    private detect: ChangeDetectorRef,
    private blacklistService: BlacklistService,
    private adminService: AdminService,
    private authService: AuthService,
    private studentService: StudentService
  ) {}
  createSesmester() {
    if (this.s.sesmester == 0) {
      Swal.fire('Thất bại', 'Vui lòng chọn học kỳ', 'error');
      return;
    }
    if (
      this.s.schoolYear == '' ||
      this.s.startDate == null ||
      this.s.endDate == null ||
      this.s.registrationEndDate == null ||
      this.s.registrationStartDate == null
    ) {
      Swal.fire('Thất bại', 'Vui lòng nhập đầy đủ thông tin', 'error');
      return;
    }
    this.sesmesterService.createSesmester(this.s).subscribe({
      next: (response: void) => {
        Swal.fire('Thành công', 'Bạn đã tạo học kỳ mới thành công', 'success');
        this.s = {
          id: null,
          sesmester: 0,
          schoolYear: '',
          startDate: null,
          endDate: null,
          registrationEndDate: null,
          registrationStartDate: null,
          status: false,
          holidayWeek: 0,
        };
      },
      error: (error) => {
        Swal.fire('Thất bại', error.error.message, 'error');
      },
    });
  }
  ngOnInit(): void {
    // Gọi học kỳ
    this.sesmesterService.getAllSesmester().subscribe({
      next: (response: Sesmester[]) => {
        this.sesmesters = response;
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
    this.filterContracts();
    // Gọi API và lấy dữ liệu
  }
  updateStudentStatus(c: ContractResponseDto) {
    console.log(c.numberStudent);
    Swal.fire({
      title: 'Bạn có muốn chắc chắn xác nhận?',

      showCancelButton: true,
      confirmButtonText: 'Lưu',
      cancelButtonText: 'Đóng',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.studentService.updateStatus(c.numberStudent, 1).subscribe({
          next: (response: void) => {
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Xét duyệt tốt nghiệp thành công',
              showConfirmButton: false,
              timer: 1500,
            });
            this.filterContracts();
            this.studentService.updateStudent();
          },
          error: (error) => {
            Swal.fire('Thất bại', error.error.message, 'error');
          },
        });
      }
    });
  }
  addToBlackList(c: ContractResponseDto) {
    this.contract = c;
  }
  addToBlackList2() {
    if (this.reason == '') {
      Swal.fire('Có lỗi', 'Vui lòng chọn lý do', 'error');
      return;
    }
    let blacklist = {
      admin: {
        id: this.admin.id,
      },
      student: {
        id: this.contract.studentId,
      },
      reason: this.reason,
    };
    this.blacklistService.addToBlackList(blacklist).subscribe({
      next: (response: void) => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Thêm sinh viên vi phạm thành công',
          showConfirmButton: false,
          timer: 1500,
        });
        this.reason = '';
        this.filterContracts();
        this.blacklistService.updateBlacklist();
      },
      error: (error) => {
        Swal.fire('Thất bại', error.error.message, 'error');
      },
    });
  }
  changePage(page: number): void {
    this.currentPage = page;
    this.contractService
      .getContractsFromFilter(
        this.sesmester,
        this.schoolYear,
        this.major,
        this.numberStudent,
        this.gender,
        this.currentPage - 1,
        6
      )
      .subscribe({
        next: (response: Page<ContractResponseDto>) => {
          this.contracts = response.content;
        },
      });
  }
  filterContracts() {
    this.totalPrice = 0;
    this.currentPrice = 0;
    this.unpayPrice = 0;
    this.contractService
      .getContractsFromFilter(
        this.sesmester,
        this.schoolYear,
        this.major,
        this.numberStudent,
        this.gender
      )
      .subscribe({
        next: (response: Page<ContractResponseDto>) => {
          this.contracts = response.content;
          this.totalElements = response.totalElements;
          this.limit = response.size;
          this.contracts.forEach((c) => {
            if (c.status != 2) {
              this.totalPrice += c.totalPrice;
            }
            if (c.status == 1 || c.status == 3) {
              this.currentPrice += c.totalPrice;
            }
            if (c.status == 0) {
              this.unpayPrice += c.totalPrice;
            }
          });
          this.detect.detectChanges();
          this.search = '';
          if (
            this.schoolYear == null &&
            this.sesmester == null &&
            this.major == null &&
            this.numberStudent == null &&
            this.gender == null
          ) {
            // Lấy danh sách majors từ contracts và loại bỏ các giá trị trùng lặp
            this.majors = Array.from(
              new Set(this.contracts.map((contract) => contract.major))
            );
            // Lấy 3 phần tử đầu từ mảng contracts.numberStudent và loại bỏ các giá trị trùng lặp
            this.numberStudents = Array.from(
              new Set(
                this.contracts.map((contract) =>
                  contract.numberStudent.slice(0, 3)
                )
              )
            );
          }
          this.detect.detectChanges();
          this.changePage(this.currentPage);
        },
        error: (error) => {},
      });
  }
  filterContract() {
    if (this.sesmester == 0) {
      this.sesmester = null;
    }
    if (this.gender == 2) {
      this.gender = null;
    }
    if (this.schoolYear == 'all') {
      this.schoolYear = null;
    }
    if (this.major == 'all') {
      this.major = null;
    }
    if (this.numberStudent == 'all') {
      this.numberStudent = null;
    }
    this.filterContracts();
  }
  searchFilter() {
    this.totalPrice = 0;
    this.currentPrice = 0;
    this.unpayPrice = 0;
    console.log(this.search == '');
    this.contractService.searchFilter(this.search).subscribe({
      next: (response: Page<ContractResponseDto>) => {
        this.contracts = response.content;

        this.totalElements = response.totalElements;
        this.limit = response.size;
        this.contracts.forEach((c) => {
          if (c.status != 2) {
            this.totalPrice += c.totalPrice;
          }
          if (c.status == 1) {
            this.currentPrice += c.totalPrice;
          }
          if (c.status == 0) {
            this.unpayPrice += c.totalPrice;
          }
        });
        this.sesmester = null;
        this.gender = null;
        this.schoolYear = null;
        this.major = null;
        this.numberStudent = null;
      },
      error: (error) => {},
    });
  }
  updateContract() {
    console.log(this.studentStatus);
  }
}
