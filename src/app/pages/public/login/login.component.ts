import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToasterService } from 'neercms/services/viewport';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  private readonly logout: boolean;

  constructor(fb: FormBuilder, private router: Router, private toaster: ToasterService) {
    this.logout = this.router.getCurrentNavigation()?.extras.state?.['logout'] === true;
    this.form = fb.group({
      login: new FormControl('admin'),
      password: new FormControl('Admin1234'),
    });
  }

  ngOnInit(): void {}

  submit() {
    console.log('login!');
  }
}
