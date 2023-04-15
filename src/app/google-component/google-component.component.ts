import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';
import Swal from 'sweetalert2';
import { ServiceService } from 'src/service/service.service';
import { LoaderService } from 'src/service/loader.service';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-google-component',
  templateUrl: './google-component.component.html',
  styleUrls: ['./google-component.component.css']
})

export class  GoogleComponentComponent implements OnChanges  {
  @Input('data') resData: any;
  res:any
  time: any[] = [];
  prevtime: any[] = [];
  searchParms:any;
  totalResults:any;
  totalTime:any;
  organicResult:any;
  organicResultAbout:any;
  adsResults:any;
  spinner:any
  Loadurl:any
  prevLoadurl:any
  link:any;
  cmsurl:any;
  cms:any[] = [];
  constructor(private clipboard: Clipboard , private service : ServiceService , private loader: LoaderService) { }
  ngOnChanges(changes: SimpleChanges): void {
    this.res = this.resData
    this.searchParms =  this.res.search_parameters.q
    this.totalResults = this.res.search_information.total_results;
    this.totalTime = this.res.search_information.time_taken_displayed

    this.adsResults = this.res.ads
    this.organicResult = this.res.organic_results
    this.getLink()
  }


  copytitle(e:any){
    this.clipboard.copy(e);
    Swal.fire({
      titleText: 'Title copied to your clipboard',
      icon:'success',
      timer:2000,
      position: 'top-right'
    })
  }
  copydescription(e:any){
    this.clipboard.copy(e);
    Swal.fire({
      titleText: 'Description copied to your clipboard',
      icon:'success',
      timer:2000,
      position: 'top-right'
    })
  }

  pageLoad(e:any , i:any) {
    console.log(e, this.link)
    this.spinner = this.loader.spinner()
    this.Loadurl = e
    var json = { "url" : e };
    this.service.pageLoad(json).subscribe((res:any) =>{
      this.getLink()
      this.spinner  = this.loader.hide();
      this.time[i] = res;
    })
  }
  prevLoad(e:any , i:any) {
    this.spinner = this.loader.spinner()
    this.prevLoadurl = e
    var json = { "url" : e };
    this.service.prevpageLoad(json).subscribe((res:any) =>{
      this.spinner  = this.loader.hide();
      this.prevtime[i] = res;
    })
  }

  getLink() {
    this.service.getLinks().subscribe((res:any) => {
      res.forEach((ele:any) => {
        this.link = ele.url
        console.log(this.link)
      });
    })
  }


  fileName= 'Organic-Result.xlsx';
  export(){
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    XLSX.writeFile(wb, this.fileName);
  }
  fileNameads= 'Ads-Result.xlsx';
  exportAds(){
    let element = document.getElementById('excel-table-ads');
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet2');

    XLSX.writeFile(wb, this.fileNameads);
  }



  handleCMS(t: any, i: any) {
    console.log(t, this.link),
    this.spinner = this.loader.spinner(),
    this.cmsurl = t,
    this.service.CMSload({ url: t }).subscribe((res: any) => {
      this.spinner = this.loader.hide(),
      this.cms[i] = res
    })
  }

}
