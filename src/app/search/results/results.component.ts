import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IPageInfo } from '@iharbeck/ngx-virtual-scroller';
import { Observable } from 'rxjs';
import { ImageService } from 'src/app/data/image-service';
import { Image, ImageResults } from '../../model/models';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit, OnChanges {

  @Input()
  text: string = '';

  buffer: Image[] = [];
  loading = false;

  constructor(private imageService: ImageService, public dialog: MatDialog) {}

  ngOnInit(): void {
  }

  ngOnChanges() {
    if (typeof this.text === 'string') {
      this.fetchImages();
    }
  }

  fetchMore(event: IPageInfo) {
    if (event.endIndex !== this.buffer.length-1) return;

    this.loading = true;
    this.fetchNextChunk(this.buffer.length, 30).subscribe(res => {
      const chunk = res.photos;
      this.buffer = this.buffer.concat(chunk);
      this.loading = false;
    });
  }

  openDialog(image: Image) {
    const dialogRef = this.dialog.open(ModalComponent, {
      data: image
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  private fetchNextChunk(page: number, limit: number): Observable<ImageResults> {
    return this.imageService.fetchImages(this.text, page, limit);
  }

  private fetchImages(): void {
    this.imageService.fetchImages(this.text, 1, 30).subscribe(res => {
      this.buffer = res.photos;
    });
  }
}
