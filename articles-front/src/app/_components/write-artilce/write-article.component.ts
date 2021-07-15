import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {DialogOverviewLogin, DialogOverviewSignin} from "../header/header.component";

@Component({
  selector: 'app-write-article',
  templateUrl: './write-article.component.html',
  styleUrls: ['./write-article.component.scss']
})
export class WriteArticleComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }
  openDialogWriteArticle(): void {
    const dialogRef = this.dialog.open(DialogOverviewSignin, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}



@Component({
  selector: 'app-dialog-overview-write-article',
  templateUrl: './dialog-overview-write-article.html',
  styleUrls: ['./write-article.component.scss']
})
export class DialogOverviewWriteArticle{

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewWriteArticle>,
    @Inject(MAT_DIALOG_DATA) public data: string) {}

  onNoClick(): void {
    this.dialogRef.close();
  }


}
