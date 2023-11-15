import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../Services/service/service.service';
import { Service } from '../Models/service/service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css'],
})
export class ServiceComponent implements OnInit {
  services: Service[] = [];
  service!: Service;
  addService: Service = new Service(null, '', 0, '', true);
  constructor(private serviceService: ServiceService) {}
  ngOnInit(): void {
    this.getAllService();
  }
  getAllService() {
    this.serviceService.getAllServices().subscribe({
      next: (response: Service[]) => {
        this.services = response;
      },
      error: (error) => {},
    });
  }
  handleEdit(s: Service) {
    if (s.id != null) {
      this.serviceService.getServiceById(s.id).subscribe({
        next: (response: Service) => {
          this.service = response;
        },
        error: (error) => {},
      });
    }
  }
  updateService() {
    if (this.service.name == '' || this.service.description == '') {
      Swal.fire('Thất bại', 'Vui lòng nhập đầy đủ thông tin', 'error');
      return;
    }
    if (this.service.price <= 0 || this.service.price % 1000 != 0) {
      Swal.fire(
        'Thất bại',
        'Vui lòng nhập giá lớn hơn 0 và chia hết cho 1000',
        'error'
      );
      return;
    }
    this.serviceService.updateAllServices(this.service).subscribe({
      next: (response: void) => {
        Swal.fire('Thành công', 'Bạn đã cập nhật thành công', 'success');
        this.getAllService();
      },
      error: (error) => {
        Swal.fire('Thất bại', error.error.message, 'error');
      },
    });
  }
  addNewService() {
    if (this.addService.name == '' || this.addService.description == '') {
      Swal.fire('Thất bại', 'Vui lòng nhập đầy đủ thông tin', 'error');
      return;
    }
    if (this.addService.price <= 0 || this.addService.price % 1000 != 0) {
      Swal.fire(
        'Thất bại',
        'Vui lòng nhập giá lớn hơn 0 và chia hết cho 1000',
        'error'
      );
      return;
    }
    this.serviceService.createService(this.addService).subscribe({
      next: (response: void) => {
        Swal.fire('Thành công', 'Thêm dịch vụ thành công', 'success');
        this.getAllService();
        this.addService = new Service(null, '', 0, '', true);
      },
      error: (error) => {
        Swal.fire('Thất bại', error.error.message, 'error');
      },
    });
  }
}
