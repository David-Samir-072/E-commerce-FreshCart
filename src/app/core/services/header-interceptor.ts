import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { MystorageService } from './mystorage.service';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {
  const mystorageService = inject(MystorageService)


  if (mystorageService.getToken()) {
    req = req.clone({
      setHeaders: {
        token: mystorageService.getToken()!
      }
    })
  }


  return next(req);
};
