import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent {
  form: FormGroup;

  constructor(fb: FormBuilder) {
    this.form = fb.group({
      userName: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl(''),
      // age: new FormControl(''),
      // description: new FormControl(''),
      // dateOfBirth: new FormControl(''),
      // dateOfEndBirth: new FormControl(''),
    });

    console.log(this.form);
  }

  submit(): void {
    if (this.form.invalid) {
      console.log('ok');
    } else {
      console.log('err', this.form.value);
    }
  }
}
