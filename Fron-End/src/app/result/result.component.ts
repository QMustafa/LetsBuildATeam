import { Component, OnInit } from '@angular/core';
import {Http, RequestOptions, Headers} from '@angular/http';
import { Router, Params, ActivatedRoute, RoutesRecognized, RouterStateSnapshot  } from '@angular/router';
import {map} from 'rxjs/operators';
import { retry } from 'rxjs/operators/retry';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  total : number;
  grade:string;
  constructor(private http: Http, private rout : Router , private activated : ActivatedRoute ) {
    const snapshot: RouterStateSnapshot = rout.routerState.snapshot;
    this.total = snapshot.root.queryParams["total"];
    }

  ngOnInit() {
    this.getGrade();
  }
  getGrade()
{
  if(this.total >= 80)
  {
    this.grade = "Excellent";
  }
  else if(this.total >= 40)
  {
    this.grade = "Good";
  }
  else if(this.total >= 20)
  {
    this.grade = "Survival";
  }
  else
  {
    this.grade = "Bad"
  } 
}


}
