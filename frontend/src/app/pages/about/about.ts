import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import emailjs from '@emailjs/browser';
import {FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  imports: [FontAwesomeModule, FormsModule, CommonModule],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About {
  faPaperPlane = faPaperPlane;

  contactName = '';
  contactEmail = '';
  contactMessage = '';
  successMessage = '';
  errorMessage = '';

  sendEmail() {
    const templateParams = {
      from_name: this.contactName,
      from_email: this.contactEmail,
      message: this.contactMessage
    };

    emailjs.send(
      'service_wippm1e',
      'template_gymvdnj',
      templateParams,
      '_wzixuwe1HoSsRO9Y'
    ).then(() => {

      this.successMessage = 'Message sent successfully!';
      this.errorMessage = '';

      this.contactName = '';
      this.contactEmail = '';
      this.contactMessage = '';

    }).catch(() => {
      this.errorMessage = 'Something went wrong. Please try again.';
      this.successMessage = '';
    });
  }

}
