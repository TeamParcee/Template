import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FirebaseService } from '../services/firebase.service';
import { HelperService } from '../Services/helper.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private fb: FormBuilder,
    private firebaseService: FirebaseService,
    private helper: HelperService,
    private navCtrl: NavController,
  ) { 
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }

  ngOnInit() {
  }
loginForm: FormGroup;

login(){
  let form = this.loginForm.value;
  this.firebaseService.loginEmail(form.email, form.password).then(()=>{
    this.navCtrl.navigateForward("/tabs")
  })
}



}
