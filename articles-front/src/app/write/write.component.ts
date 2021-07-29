import { Component, OnInit } from '@angular/core';
import {AccountService, ArticleService} from "@app/_services";


@Component({
  selector: 'app-write',
  templateUrl: './write.component.html',
  styleUrls: ['./write.component.scss']
})
export class WriteComponent implements OnInit {
  title: any;
  content ="";
  imgFile: string | undefined;
  text = "Normal";
  bold = false;
  italic = false;
  underlined = false;
  imageError ='';
  isImageSaved = false;
  cardImageBase64 = "";
  description: any;
  constructor( public accountService: AccountService, private articleService : ArticleService) {
  }

  resizedataURL(data64: string, wantedWidth: number, wantedHeight: number):Promise<any>{
    return new Promise(async function(resolve,reject){

      // We create an image to receive the Data URI
      const img = document.createElement('img');

      // When the event "onload" is triggered we can resize the image.
      img.onload = function()
      {
        // We create a canvas and get its context.
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        // We set the dimensions at the wanted size.
        canvas.width = wantedWidth;
        canvas.height = wantedHeight;

        // We resize the image with the canvas method drawImage();
        ctx?.drawImage(img, 0, 0, wantedWidth, wantedHeight);

        const dataURI = canvas.toDataURL();

        // This is the return of the Promise
        resolve(dataURI);
      };

      // We put the Data URI in the image's src attribute
      img.src = data64;

    })
  }
  async fileChangeEvent(fileInput: any) {
    this.imageError = '';
    if (fileInput.target.files && fileInput.target.files[0]) {
      // Size Filter Bytes
      const max_size = 20971520;
      const allowed_types = ['image/png', 'image/jpeg'];
      const max_height = 15200;
      const max_width = 25600;

      if (fileInput.target.files[0].size > max_size) {
        this.imageError =
          'Maximum size allowed is ' + max_size / 1000 + 'Mb';

        return false;
      }

      if (!allowed_types.includes(fileInput.target.files[0].type)) {
        this.imageError = 'Only Images are allowed ( JPG | PNG )';
        return false;
      }
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = async (rs) => {
          console.log(rs?.currentTarget);
          const img_height = 100 //rs?.currentTarget?.['height'] ;
          const img_width = 100 //rs?.currentTarget?.width;

          //  console.log(img_height, img_width);


          if (img_height > max_height && img_width > max_width) {
            this.imageError =
              'Maximum dimentions allowed ' +
              max_height +
              '*' +
              max_width +
              'px';
            return false;
          } else {
            const imgBase64Path = e.target.result;
            this.cardImageBase64 = imgBase64Path;
            this.cardImageBase64 = await this.resizedataURL(this.cardImageBase64 , 1200, 600);
            this.isImageSaved = true;
            // this.previewImagePath = imgBase64Path;
          }
          return true;
        };
      };

      reader.readAsDataURL(fileInput.target.files[0]);
    }
    return true;
  }


  removeImage() {
    this.cardImageBase64 = '';
    this.isImageSaved = false;
  }


  ngOnInit(): void {
    const editableContent = document.getElementById('editableContent');
    editableContent?.focus();
  }

  publishArticle() {

    this.articleService.createArticle(this.accountService.userValue.id, this.title, this.content,this.description, this.cardImageBase64);
  }
  clickBold(){
    this.bold=!this.bold;
    if(this.bold)  this.content+='<b>';
    else this.content+='</b>';
  }
  clickItalic(){
    this.italic=!this.italic;
    if(this.italic)  this.content+='<i>';
    else this.content+='</is>';
  }
  clickIns(){
    this.underlined=!this.underlined;
    if(this.underlined)  this.content+='<ins>';
    else this.content+='</ins>';

  }
  onChange($event: any) {
    console.log($event.target.textContent)
    this.content=$event.target.textContent;
  }
}
