import { Component, OnInit } from '@angular/core';
import { ContactService } from './contact.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']

})
export class ContactusComponent implements OnInit {
  angForm: FormGroup;

  constructor(
    // private flashMessages: FlashMessagesService,
    private fb: FormBuilder,
    private contactService: ContactService) {
    this.createForm();
  }

  createForm() {
    this.angForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      message: ['', Validators.required],
    });
  }
  sendMail(name, email, message) {
    console.log('????');
    this.contactService.sendMail(name, email, message).subscribe(success => {
      console.log('????' + success);
      console.log(success);
    }, error => {
      console.log('Something went wrong');
    });
  }
  ngOnInit() {
  }

}


