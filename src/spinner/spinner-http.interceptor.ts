import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {finalize, tap} from "rxjs/operators";
import {NgxSpinnerService} from "ngx-spinner";

@Injectable()
export class SpinnerHttpInterceptor implements HttpInterceptor {

    constructor(private spinner: NgxSpinnerService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this.spinner.show();

    return next.handle(req)
      .pipe(tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          this.spinner.hide();
        }
      }, (error) => {
        this.spinner.hide();
      }));
  }
}
