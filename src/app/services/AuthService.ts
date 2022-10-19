import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs';
import {User} from "../entities/user";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public username: string;
  public password: string;

  userLoggedIn$: BehaviorSubject<any> = new BehaviorSubject<any>(false);

  constructor(private http: HttpClient,
              private router: Router
  ) {
  }

  connect(email: string, password: string): any {
    return this.http.get<any>(environment.hostUrl + `/users/connect/` + email + '/' + password);
  }

  disconnet(): any {
    localStorage.removeItem("token");
    this.router.navigate(['/login']);
  }

  changeCredentials(user: User, email: string, password: string): any {
    return this.http.put<any>(environment.hostUrl + `/users/modify/` + email + '/' + password,user);
  }

}
