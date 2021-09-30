import { environment } from './../../../environments/environment';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { UploadFileService } from '../upload-file.service';
import { Subject, Subscription } from 'rxjs';
import { HttpEvent } from '@angular/common/http';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss'],
})
export class UploadFileComponent implements OnInit, OnDestroy {
  files: Set<File>;

  fileUpload$ = new Subscription();

  constructor(private uploadService: UploadFileService) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.fileUpload$.unsubscribe();
  }

  onChange(event: any): void {
    const selectedFiles = <FileList>event?.srcElement.files;

    this.files = new Set();

    for (let i = 0; i < selectedFiles.length; i++) {
      this.files.add(selectedFiles[i]);
    }
  }

  onUpload(): void {
    if (this.files && this.files.size > 0) {
      this.fileUpload$ = this.uploadService.upload(this.files, `${environment.API_NODE}/upload`)
        .subscribe(
          response => console.log('Upload concluído'),
          erro => console.log(erro)
        );
    }
  }
}
