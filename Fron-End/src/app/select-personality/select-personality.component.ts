import { Component, OnInit } from '@angular/core';
import {Http, RequestOptions, Headers} from '@angular/http';
import { Router, Params, ActivatedRoute, RoutesRecognized, RouterStateSnapshot  } from '@angular/router';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-select-personality',
  templateUrl: './select-personality.component.html',
  styleUrls: ['./select-personality.component.css']
})
export class SelectPersonalityComponent implements OnInit {

  arr = [ undefined, undefined];
  reqObject = {
    SH : false,	RI: false,	SP: false,	IMP: false,	TW: false,	CF: false,	CO: false,	PL: false,	ME: false
}
gameName : "";
gameId : any;
page : any;

 constructor(private http: Http, private rout : Router , private activated : ActivatedRoute ) {
  const snapshot: RouterStateSnapshot = rout.routerState.snapshot;
  this.gameId = snapshot.root.queryParams["gameId"];  // <-- hope it helps
  this.page = snapshot.root.queryParams["page"];
  }

  ngOnInit() {

  }


 ShowEvents()
 {

  var firstVariable = this.arr[0] == undefined ? this.arr[1] : this.arr[0];
  var secondVariable = this.arr[1] == undefined ? this.arr[0] : this.arr[1];
   var response;
   console.log(this.arr[0], this.arr[1]);
   this.http.post("http://34.238.136.185:8080/team/games/"+this.gameId+"/roles/", '{"roles" : ["' + firstVariable + '","' + secondVariable + '"]}', this.getOptions())
   .pipe( 
     map(res => res.json()))
   .subscribe(resp => 
   
       this.rout.navigate(['/Events'], { queryParams: { gameId: this.gameId, page: this.page, pers : [firstVariable, secondVariable]}})
     
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
 
  var key = this.arr.shift();
  if (key)
      this.reqObject[key] = false;

  this.arr.push(v);
  this.reqObject[v] = true;
}

}
