import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ContractService } from '../Services/contract/contract.service';
import { ContractResponseDto } from '../Models/contract/contract-response-dto';
import { Sesmester } from '../Models/sesmester/sesmester';
import { SesmesterService } from '../Services/sesmester/sesmester.service';

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
  // kết thúc Binding 2 chiều
  constructor(
    private contractService: ContractService,
    private sesmesterService: SesmesterService,
    private detect: ChangeDetectorRef
  ) {}
  ngOnInit(): void {
    // Gọi học kỳ
    this.sesmesterService.getAllSesmester().subscribe({
      next: (response: Sesmester[]) => {
        this.sesmesters = response;
      },
      error: (error) => {},
    });
    this.filterContracts();
    // Gọi API và lấy dữ liệu
  }
  filterContracts() {
    console.log(this.sesmester + ' ' + this.schoolYear);
    this.contractService
      .getContractsFromFilter(
        this.sesmester,
        this.schoolYear,
        this.major,
        this.numberStudent,
        this.gender
      )
      .subscribe({
        next: (response: ContractResponseDto[]) => {
          this.contracts = response;
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
}
