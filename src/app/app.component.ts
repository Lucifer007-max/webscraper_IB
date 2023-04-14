import { Component, Input , OnChanges, SimpleChanges } from '@angular/core';
import { AbstractControl, FormBuilder  , FormGroup, Validators } from '@angular/forms';
import { ServiceService } from 'src/service/service.service';
import { SafePipe } from 'src/pipe.pipe';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { LoaderService } from 'src/service/loader.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  code:any;
  loading:any;
  title = 'searchAPIapp';
  searchQuery:any = FormGroup;
  selectedValue:any = '';
  siteLink:any = '';
  selectedEngine:any = '';
  @Input() getApiEndpoint: any = (requestUrl: any) => Observable;
  url:any
  resData:any
  @Input() apiRoute: any;
  flag:any;
  constructor (private FB : FormBuilder , private service : ServiceService , private santizer : DomSanitizer , private http : HttpClient , private loader : LoaderService ) {}

  ngOnInit() {
    {
      this.searchQuery = this.FB.group({
        Querytxt : ['', Validators.required],
      })
    }
    if(this.selectedValue == '') {
      this.selectedValue = 'New york';
    }
    if(this.selectedEngine == '') {
      this.selectedEngine = 'Google';
    }

  }


  handleChange(e:any){
    this.selectedValue = e.target.value
    console.log(this.selectedValue)
  }


  handleSearch() {
    const jsonbody =  {
      "Querytxt" : this.searchQuery.value.Querytxt,
      "country" : this.selectedValue,
      "searchEngine" : this.selectedEngine
    }
    this.flag = false;
    this.loading =  this.loader.show();
    this.service.QuerySearch(jsonbody).subscribe((res:any) =>{
      this.flag = true;
      this.loading =  this.loader.hide();
      this.resData = res
    })
  }



  handleSearchEngine(e:any){
    this.selectedEngine = e.target.value
  }



}



