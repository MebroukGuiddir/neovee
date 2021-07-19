import { Pipe, PipeTransform } from "@angular/core";
import * as marked from "marked";

@Pipe({
  name: "marked"
})
export class MarkedPipe implements PipeTransform {
  transform(value: any): String {
    if (value && value.length > 0) {
      return marked(value);
    }
    return value;
  }
}
