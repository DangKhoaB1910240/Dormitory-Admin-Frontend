import {
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { RoomType } from 'src/app/Models/roomtype/room-type';
import { ImageService } from 'src/app/Services/image/image.service';
import { RoomtypeService } from 'src/app/Services/roomtype/roomtype.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class ItemComponent implements OnInit {
  @Input() roomType!: RoomType;
  @Input() i!: number;
  constructor(
    private roomListService: RoomtypeService,
    private imageService: ImageService,
    private detect: ChangeDetectorRef
  ) {}
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
  imageUrls: string[] = [];
  ngOnInit(): void {
    if (this.roomType && this.roomType.images.length > 0) {
      this.roomType.images.forEach((image) => {
        this.imageService.getImage(image.name).subscribe((response) => {
          this.imageUrls.push(URL.createObjectURL(response.body!));
        });
      });
    }
  }
}
