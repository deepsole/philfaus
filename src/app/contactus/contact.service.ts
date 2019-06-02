import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Contact } from './contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contact: Contact;

  constructor(private http: HttpClient, private router: Router) { }


  // createMessage(
  //   { name, phone, email, message }: { name: string; phone: number; email: string; message: string; }    ) {
  //       const contact: Contact = { name: name, phone: phone, email: email, message: message}
  //       this.http.post<Contact>('http://localhost:3000/sendmail', contact).subscribe(
  //         (responseData) => {
  //           this.router.navigate(['/']);
  //         });
  //     }


  sendEmail(url, contact) {
    return this.http.post(url, contact);
  }
}
