import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {finalize} from "rxjs/operators";
import {NgxSpinnerService} from "ngx-spinner";

@Injectable()
export class SpinnerHttpInterceptor implements HttpInterceptor {

    constructor(private spinner: NgxSpinnerService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

       if(req.url.includes('/projects/addImg/')) {
           this.spinner.show();
       }
           return next.handle(req).pipe(finalize(() => {
               /** spinner ends after 5 seconds */
               this.spinner.hide();
           }));


    }
}
