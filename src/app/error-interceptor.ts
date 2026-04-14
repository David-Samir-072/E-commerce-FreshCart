import { isPlatformBrowser } from '@angular/common';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const pLATFORM_ID = inject(PLATFORM_ID);
  const toastr = inject(ToastrService);


  if (isPlatformBrowser(pLATFORM_ID)) {
    return next(req).pipe(catchError((err) => {
      toastr.error(err.error.message, '', { progressBar: true, closeButton: true })
      return throwError(() => err)
    }))
  }


  return next(req)
};

