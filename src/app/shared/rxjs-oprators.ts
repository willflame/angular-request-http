import { HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';

import { MonoTypeOperatorFunction, pipe } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';

export function filterResponse<T>() {
  return pipe(
    filter((event: HttpEvent<T>) => event.type === HttpEventType.Response),
    map((res: HttpEvent<T>) => {
      const response = res as HttpResponse<T>;
      return response.body;
    })
  );
}

export function uploadProgress<T>(
  cb: (progress: number) => void
): MonoTypeOperatorFunction<HttpEvent<T>> {
  return tap((event: HttpEvent<T>) => {
    if (event.type === HttpEventType.UploadProgress) {
      cb(Math.round((event.loaded * 100) / (event.total as number)));
    }
  });
}
