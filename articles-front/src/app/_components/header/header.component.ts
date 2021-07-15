import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {




  constructor(public dialog: MatDialog) {}

  openDialogLogin(): void {
    const dialogRef = this.dialog.open(DialogOverviewLogin, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openDialogSignin(): void {
    const dialogRef = this.dialog.open(DialogOverviewSignin, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  ngOnInit(): void {
  }


}



@Component({
  selector: 'app-dialog-overview-login',
  templateUrl: './dialog-overview-login.html',
  styleUrls: ['./header.component.scss']
})
export class DialogOverviewLogin {
  email: any;
  password: any;
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewLogin>,
    @Inject(MAT_DIALOG_DATA) public data: string) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}

@Component({
  selector: 'app-dialog-overview-signins',
  templateUrl: './dialog-overview-signin.html',
  styleUrls: ['./header.component.scss']
})
export class DialogOverviewSignin{

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewLogin>,
    @Inject(MAT_DIALOG_DATA) public data: string) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}

