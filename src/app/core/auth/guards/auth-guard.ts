import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router} from '@angular/router';
import { MystorageService } from '../../services/mystorage.service';
import { isPlatformBrowser } from '@angular/common';

export const authGuard: CanActivateFn = (route, state) => {

  const pLATFORM_ID=inject(PLATFORM_ID)
  const mystorageService=inject(MystorageService)
  const router=inject(Router)

  if (isPlatformBrowser(pLATFORM_ID)) {
       if(mystorageService.getToken()){
    return true
  }
  else{
    return router.parseUrl('/login')
  }
  }

  
    return true
  
 
  
};
