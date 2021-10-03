import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UploadFileService {
  constructor(private http: HttpClient) {}

  upload(files: Set<File>, url: string): Observable<HttpEvent<Object>> {
    const formData = new FormData();
    files.forEach(file => formData.append('file', file, file.name));

    // const request = new HttpRequest('POST', url, formData);
    // return this.http.request(request);

    return this.http.post(url, formData, {
      observe: 'events',
      reportProgress: true,
    });
  }

  download(url: string) {
    return this.http.get(url, {
      responseType: 'blob' as 'json',
      // reportProgress
      // content-length
    });
  }

  handleFile(res: any, filename: string) {
    console.log(res);
        const file = new Blob([res], {
          type: res.type
        });

        // IE
        // if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        //   window.navigator.msSaveOrOpenBlob(file);
        //   return;
        // }

        const blob = window.URL.createObjectURL(file);

        const link = document.createElement('a');
        link.href = blob;
        link.download = filename;

        link.click();

        // Firefox
        link.dispatchEvent(new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
          view: window,
        }));

        // Firefox remover o link para o download
        setTimeout(() => {
          window.URL.revokeObjectURL(blob);
          link.remove();
        }, 100);

        window.URL.revokeObjectURL(blob);
        link.remove();
  }
}
