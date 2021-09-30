import { environment } from './../../../environments/environment';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { UploadFileService } from '../upload-file.service';
import { Subscription } from 'rxjs';
import { HttpEvent, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss'],
})
export class UploadFileComponent implements OnInit, OnDestroy {
  files: Set<File>;
  progress = 0;
  showBarProgress = false;

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

    this.progress = 0;
    this.showBarProgress = false;
  }

  onUpload(): void {
    if (this.files && this.files.size > 0) {
      this.showBarProgress = true;

      this.fileUpload$ = this.uploadService
        .upload(this.files, `${environment.API_NODE}/upload`)
        .subscribe(
          (event: HttpEvent<Object>) => {
            console.log(event);

            if (event.type === HttpEventType.Response) {
              console.log('Upload concluído');
              this.showBarProgress = false;
            } else if (event.type === HttpEventType.UploadProgress) {
              const percentDone = Math.round(
                (event.loaded * 100) / (event.total as number)
              );

              this.progress = percentDone;
            }
          },
          (erro) => console.log(erro)
        );
    }
  }
}
