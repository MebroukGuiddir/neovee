export class Article {
  id: string;
  title: string;
  content: string;
  modificationDate: Date;


  constructor() {
    this.id ="";
    this.title="";
    this.content="";
    this.modificationDate=new Date();
  }

}
