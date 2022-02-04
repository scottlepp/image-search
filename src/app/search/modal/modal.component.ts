import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FileSaverService } from 'ngx-filesaver';
import { Image } from 'src/app/model/models';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: Image, private http: HttpClient, private fs: FileSaverService) {}

  ngOnInit(): void {}

  downloadImage(image: Image) {
    this.http.get(image.src.original, {
      responseType: 'blob'
    }).subscribe(res => {
      this.fs.save(res, image.alt);
    });
  }
}
