import { Component, OnInit } from '@angular/core';
import { ContactService} from './contact.service';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';

import { Contact } from './contact.model';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent implements OnInit {
  isLoading = false;
  private mode = 'create';
  contact: Contact;

  constructor(public contactService: ContactService, public http: ContactService ) { }

  ngOnInit() {
  }




register(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === 'create') {
    const contact: Contact  = {
      name: form.value.name,
      phone: form.value.phone,
      email: form.value.email,
      message: form.value.message,
    };
    this.http.sendEmail('http://localhost:3000/sendmail', contact).subscribe(
      data => {
        const res: any = data;
        console.log('You have sent a email');
      }
    );
  }

}


}


