import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from '../services/firebase.service';
import { HelperService } from '../Services/helper.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.page.html',
  styleUrls: ['./create-account.page.scss'],
})
export class CreateAccountPage implements OnInit {

  constructor(
    private fb: FormBuilder,
    private firebaseService: FirebaseService,
    private helper: HelperService,
    private navCtrl: NavController,
    ) {
    this.registerForm = this.fb.group({
      displayName: ['',[ Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required,Validators.email]],
      password: ['',[ Validators.required, Validators.minLength(6)]],
    })
  }

  ngOnInit(
    
  ) {

  }


  registerForm: FormGroup;


  register() {
    let form = this.registerForm.value;
    this.firebaseService.createAccountEmail(form.email, form.password, form.displayName, "No Photo")
    .then(()=>{
      this.navCtrl.navigateBack("/login");
      this.helper.okAlert("Account Created", "Your account was created sucessfully!")
    })
  }
}
