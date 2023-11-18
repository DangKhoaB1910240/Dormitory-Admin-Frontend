import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Services/auth/auth.service';
import { AdminService } from '../Services/admin/admin.service';
import { Admin } from '../Models/admin/admin';
import { RoomtypeService } from '../Services/roomtype/roomtype.service';
import { RoomType } from '../Models/roomtype/room-type';
import { Image } from '../Models/image/image';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-room-type',
  templateUrl: './add-room-type.component.html',
  styleUrls: ['./add-room-type.component.css'],
})
export class AddRoomTypeComponent implements OnInit {
  roomType: RoomType = {
    id: null,
    name: '',
    maxQuantity: 0,
    price: 0,
    isAirConditioned: null,
    isCooked: null,
    enable: true,
    createdDate: '',
    updatedDate: null,
    images: [],
  }; // Model for room type
  selectedImage: File | null = null;
  constructor(private roomTypeService: RoomtypeService) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  handleFileInput(e: Event) {
    const inputElement: HTMLInputElement = e.target as HTMLInputElement;
    const files: FileList | null = inputElement.files;

    if (files && files.length > 0) {
      this.selectedImage = files[0];
      console.log(this.selectedImage);
    }
  }

  submitForm() {
    if (
      !this.selectedImage ||
      this.roomType.name == '' ||
      this.roomType.maxQuantity == 0 ||
      this.roomType.isAirConditioned == null ||
      this.roomType.isCooked == null ||
      this.roomType.price == 0
    ) {
      Swal.fire('Có lỗi !', 'Vui lòng nhập đầy đủ thông tin', 'error');
      return;
    }
    this.roomTypeService
      .addRoomTypeWithImages(this.selectedImage, this.roomType)
      .subscribe({
        next: (response) => {
          Swal.fire('Thành công', 'Bạn đã thêm phòng thành công', 'success');
          this.roomType.name = '';
          this.roomType.maxQuantity = 0;
          this.roomType.isAirConditioned = null;
          this.roomType.isCooked = null;
          this.roomType.price = 0;
          this.selectedImage = null;
        },
        error: (error) => {
          Swal.fire('Thất bại', error.error.message, 'error');
        },
      });
  }
}
