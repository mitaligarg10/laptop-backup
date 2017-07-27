import {Component , NgModule , OnInit} from '@angular/core';
import { ReactiveFormsModule , FormControl ,FormGroup, FormArray, FormBuilder , FormsModule} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import { Authentication } from './authentication';
import {Router} from '@angular/router';
@Component({
 selector: 'login',
   template: ` <div *ngIf ="initial">
   <form [formGroup]='myForm' >
   <div class="form-group">
   <label>UserName:</label>
     <input type="text" #username class="form-control" formControlName="login">
   <label>PassWord:</label>
     <input type="password" #password class="form-control" formControlName="password">
   </div>
  
   <button type="button" (click)=onSave(username.value,password.value)>login</button>
   </form>
   </div>
   
     <router-outlet></router-outlet>
     <div *ngIf ='flag'>
     <logout></logout>
     </div>
  `
})
export class LoginComponent {
myForm: FormGroup;
error:boolean;
flag:boolean=false;
initial :boolean=true;
constructor(private auth:Authentication,private router:Router) {
  }
ngOnInit(){
 this.myForm=new FormGroup({
   login:new FormControl(''),
   password:new FormControl('')
});
}
onSave(user,pass){
   this.auth.login(user,pass).subscribe(
    (token:any) => {   this.initial=false; this.flag=true;
                       this.router.navigate(['/app-root']); },
     () => {this.error=true;}
     );
   }
  
}