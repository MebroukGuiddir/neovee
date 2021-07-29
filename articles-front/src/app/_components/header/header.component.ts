import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {AccountService} from "@app/_services";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "@app/_models/User";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {




  constructor(public dialog: MatDialog, private accountService: AccountService) {}

  openDialogLogin(): void {
    const dialogRef = this.dialog.open(DialogOverviewLogin, {
      width: '30vw',
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '60vh',

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  getUser(){
    return this.accountService.userValue;
  }
  openDialogSignin(): void {
    const dialogRef = this.dialog.open(DialogOverviewSignin, {
      width: '30vw',
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '80vh',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  ngOnInit(): void {
  }


  logout() {
    this.accountService.logout();
  }
}



@Component({
  selector: 'app-dialog-overview-login',
  templateUrl: './dialog-overview-login.html',
  styleUrls: ['./header.component.scss']
})
export class DialogOverviewLogin implements OnInit{
  loginForm= this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  });
  isSubmitted  =  false;
  constructor(
    private formBuilder: FormBuilder,
    public accountService: AccountService,
    public dialogRef: MatDialogRef<DialogOverviewLogin>,
    @Inject(MAT_DIALOG_DATA) public data: string) {}

  ngOnInit(): void {
  }
  get formControls() { return this.loginForm?.controls; }
  onNoClick(): void {
    this.dialogRef.close();
  }

  login() {
    console.log(this.loginForm?.value);
    this.isSubmitted = true;
    if(this.loginForm?.invalid){
      return;
    }

    this.accountService.login(this.loginForm?.value.email,this.loginForm?.value.password).subscribe(value => {
      this.dialogRef.close();
    })


  }
}

@Component({
  selector: 'app-dialog-overview-signins',
  templateUrl: './dialog-overview-signin.html',
  styleUrls: ['./header.component.scss']
})
export class DialogOverviewSignin{
  registerForm= this.formBuilder.group({
    email: ['', Validators.required, Validators.pattern("[^ @]*@[^ @]*") ],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
  });
  isSubmitted  =  false;
  onSubmit = false;
  error = "";
  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<DialogOverviewLogin>,

    @Inject(MAT_DIALOG_DATA) public data: string) {



  }
  get formControls() { return this.registerForm?.controls; }
  onNoClick(): void {
    this.dialogRef.close();
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action,{
      verticalPosition: "top",
    });
  }
  register() {
    this.isSubmitted = true;
    this.onSubmit = true;
    this.error = "";
    if (this.registerForm?.invalid) {
      return;
    }
    else{
      let user: User = {
        email: this.registerForm.value.email,
        firstName: this.registerForm.value.firstName,
        id: "",
        lastName: this.registerForm.value.lastName,
        password: this.registerForm?.value.password
      }
      this.accountService.register(user).subscribe(
        response => {
          this.openSnackBar("registered!", "close");
          this.onSubmit=false;
          this.dialogRef.close();

        },
        error =>{
          this.openSnackBar(error.error.message, "close");
          this.onSubmit=false;
        }
      )
    }
  }
}

