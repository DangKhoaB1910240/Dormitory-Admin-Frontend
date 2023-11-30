import {
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { RoomtypeService } from '../Services/roomtype/roomtype.service';
import { RoomType } from '../Models/roomtype/room-type';
import { ImageService } from '../Services/image/image.service';
import Swal from 'sweetalert2';
import { forkJoin, of } from 'rxjs';
import { Room } from '../Models/room/room';

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
  index: number = 0;
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
      next: (response: RoomType[]) => {
        this.listRoomType = response;

        // Create an array of observables for image requests
        const imageRequests = response.map((roomType) => {
          if (roomType && roomType.images.length > 0) {
            return this.imageService.getImage(roomType.images[0].name);
          } else {
            // Return an observable with null if no image is present
            return of(null);
          }
        });

        // Use forkJoin to wait for all image requests to complete
        forkJoin(imageRequests).subscribe((responses: any[]) => {
          responses.forEach((response, index) => {
            if (response && response.body) {
              this.imageUrl = URL.createObjectURL(response.body);
              this.imageUrls[index] = this.imageUrl;
            }
          });
          // Nguyên tắc này đảm bảo rằng imageUrls đã được đặt đúng trước khi hiển thị trong template.
          this.detect.detectChanges();
        });
      },
      error: (error) => {
        if (error.status === 401) {
          // Handle 401 error
        }
      },
    });
  }
  // displayImage(imageData: Blob, index: number) {

  //   // Sử dụng imageUrl để hiển thị ảnh trong template của bạn
  // }

  changePrice() {
    this.showPrice = false;
  }
  updateEnable(r: RoomType) {
    r.enable = !r.enable;
    if (r.id)
      this.roomListService.updateRoomType(r.id, r).subscribe({
        next: (response: any) => {
          Swal.fire('Thành công', 'Bạn đã cập nhật thành công', 'success');
        },
        error: (error) => {
          Swal.fire('Có lỗi xảy ra', error.error.message, 'error');
        },
      });
  }
}
