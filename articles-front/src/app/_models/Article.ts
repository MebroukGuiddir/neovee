import {User} from "@app/_models/User";

export class Article {
  id: string;
  title: string;
  description:string;
  content: string;
  image: string;
  modificationDate: Date;
  author?: User;

  constructor() {
    this.id ="";
    this.title="";
    this.description="";
    this.content="";
    this.image="";
    this.modificationDate=new Date();
  }

}
