import { Component, OnInit } from '@angular/core';
import {Http, RequestOptions, Headers} from '@angular/http';
import { Router, Params, ActivatedRoute, RoutesRecognized, RouterStateSnapshot  } from '@angular/router';
import {map} from 'rxjs/operators';
@Component({
  selector: 'app-select-personality-2',
  templateUrl: './select-personality-2.component.html',
  styleUrls: ['./select-personality-2.component.css']
})
export class SelectPersonality2Component implements OnInit {

 
  arr = [undefined];
  reqObject = {
    SH : false,	RI: false,	SP: false,	IMP: false,	TW: false,	CF: false,	CO: false,	PL: false,	ME: false
}
gameName : "";
gameId : any;
page : any;
pers : any;
total: number;

 constructor(private http: Http, private rout : Router , private activated : ActivatedRoute ) {
  const snapshot: RouterStateSnapshot = rout.routerState.snapshot;
  this.gameId = snapshot.root.queryParams["gameId"];  // <-- hope it helps
  this.page = snapshot.root.queryParams["page"];
  this.total = snapshot.root.queryParams["total"];
  this.pers = snapshot.root.queryParams["pers"];
  }

  ngOnInit() {

  }


 ShowEvents()
 {


   var response;
   console.log(this.arr[0], this.arr[1]);
   this.http.post("http://34.238.136.185:8080/team/games/"+this.gameId+"/roles/", '{"roles" : ["' + this.arr[0] + '"]}', this.getOptions())
   .pipe( 
     map(res => res.json()))
   .subscribe(resp => 
   
       this.rout.navigate(['/Events'], { queryParams: { gameId: this.gameId, page: this.page, total : this.total, pers: [this.pers[0], this.pers[1], this.arr[0]]}})
     
   );
 }

 private getOptions() : RequestOptions {
   const options = new RequestOptions({
     headers: new Headers({
       "Content-Type" : "application/json"      
     })
   });
   return options;
 }

checkChanged (v) {
 
  var key = this.arr[0];
  if (key)
      this.reqObject[key] = false;

  this.arr[0] = v;
}

}
