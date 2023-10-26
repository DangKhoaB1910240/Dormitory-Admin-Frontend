import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RoomtypeService } from '../Services/roomtype/roomtype.service';
import { RoomType } from '../Models/roomtype/room-type';
import { ImageService } from '../Services/image/image.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-room-type',
  templateUrl: './room-type.component.html',
  styleUrls: ['./room-type.component.css'],
})
export class RoomTypeComponent implements OnInit {
  listRoomType: RoomType[] = [];
  imageUrls: string[] = [];
  imageUrl: string = '';
  selectedEnable!: number;
  showPrice: boolean = true;
  constructor(
    private roomListService: RoomtypeService,
    private imageService: ImageService,
    private detect: ChangeDetectorRef
  ) {}
  ngOnInit(): void {
    this.getAllRoomType();
  }

  getAllRoomType(): void {
    this.roomListService.getAllRoomType().subscribe({
      next: (response: any) => {
        this.listRoomType = response;
        this.detect.detectChanges();
        this.listRoomType.map((roomType) => {
          this.imageService
            .getImage(roomType.images[0].name)
            .subscribe((response) => {
              this.imageUrls.push(this.imageUrl);
              this.displayImage(response.body!);
            });
        });
      },
      error: (error) => {
        if (error.status === 401) {
        }
      },
    });
  }
  displayImage(imageData: Blob) {
    this.imageUrl = URL.createObjectURL(imageData);
    // Sử dụng imageUrl để hiển thị ảnh trong template của bạn
  }
  updateEnable(r: RoomType) {
    r.enable = !r.enable;
    this.roomListService.updateRoomType(r.id, r).subscribe({
      next: (response: any) => {
        Swal.fire('Thành công', 'Bạn đã cập nhật thành công', 'success');
        this.getAllRoomType();
      },
      error: (error) => {
        Swal.fire('Có lỗi xảy ra', error.error.message, 'error');
      },
    });
  }
  changePrice() {
    this.showPrice = false;
  }
}
