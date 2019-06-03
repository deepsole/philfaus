import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const apiUrl = 'http://localhost:3000/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  sendEmailUrl = '/send';
  constructor(private http: HttpClient) { }

  sendMail(name, email, message): Observable<any> {
    const uri = `${apiUrl + this.sendEmailUrl}`;
    console.log('WHAT ????');
    const obj = {
      name: name,
      email: email,
      message: message,
    };
    console.log('????' + obj.name);
    return this.http.post(uri, obj);
  }
}
