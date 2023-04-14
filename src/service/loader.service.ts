import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  show() {
    let _html = "";
    _html = "<div class='loader_body text-center'><div class='loader'></div></div>"
    return _html;
  }



  spinner() {
    let _html = '';
    _html = "<div class='loading'></div>";
    return _html
  }

  hide() {
    let _html = "";
    _html =""
    return _html;
  }
}
