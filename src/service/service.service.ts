import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private httpclient : HttpClient) { }
  base_url:string  = 'http://localhost:4000/'
  // base_url:string  = 'https://serp.ikshudigital.com/'


  QuerySearch(data:any){
    return this.httpclient.post(this.base_url + 'search/queryPost' , data)
    .pipe(catchError(this.handleError));
  }
  pageLoad(data:any){
    return this.httpclient.post(this.base_url + 'search/pageLoad' , data)
    .pipe(catchError(this.handleError));
  }
  prevpageLoad(data:any){
    return this.httpclient.post(this.base_url + 'search/prevpageLoad' , data)
    .pipe(catchError(this.handleError));
  }
  getLinks(): Observable<any[]> {
    return this.httpclient.get<any[]>(this.base_url + 'search/getLink')
  }



  handleError(handleError: any): any {
    throw new Error(handleError.Error.message);
  }


}


