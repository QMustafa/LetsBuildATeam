import { Component, OnInit } from '@angular/core';
import {Http, RequestOptions, Headers} from '@angular/http';
import { Router, RouterStateSnapshot } from '@angular/router';
import {map} from 'rxjs/operators';
import { equal } from 'assert';

@Component({
  selector: 'app-show-events',
  templateUrl: './show-events.component.html',
  styleUrls: ['./show-events.component.css']
})
export class ShowEventsComponent implements OnInit {

  gameId :"";
  page : string;
  pers : ["", ""];
  total: number;

  constructor(private http: Http, private rout : Router ) { 
    const snapshot: RouterStateSnapshot = rout.routerState.snapshot;
    this.gameId = snapshot.root.queryParams["gameId"];  // <-- hope it helps
    this.page = snapshot.root.queryParams["page"];
    this.pers = snapshot.root.queryParams["pers"];
    this.total = snapshot.root.queryParams["total"];
  }

  questions: any;

  ngOnInit() {
    this.http.get("http://34.238.136.185:8080/team/games/"+this.gameId+"/events?page=0&size=3", this.getOptions())
    .pipe( 
      map(res => res.json()))
    .subscribe(resp => 
      this.questions = resp.data
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


  getSum() : number {
    let sum = 0;
    console.log(this.questions.length);
    for(let i = 0; i < this.questions.length; i++) {
      for(let j = 0; j < this.questions[i].eventRoles.length; j++){
        if(this.pers.indexOf(this.questions[i].eventRoles[j].role.roleType) !== -1)
          sum += this.questions[i].eventRoles[j].impact;
      }
    }
    console.log("pers :  " + this.pers[0] + ", " + this.pers[1]);
    return sum;
  }

  ShowNext() {
    if(this.page  === "2")
    {
      var first = this.total;
      var second = this.getSum();
      var final = +first + +second;
      console.log(final);
      this.rout.navigate(['/result'], { queryParams: { gameId: this.gameId, total : final}});
    }
    else
    {
      this.rout.navigate(['/Personalities2'], { queryParams: { gameId: this.gameId, page : 2, total: this.getSum(),  pers : [this.pers[0], this.pers[1]]}});
    }
    
  }

}
