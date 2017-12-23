import { Component, OnInit } from '@angular/core';
import {Http, RequestOptions, Headers} from '@angular/http';
import { Router, Params, ActivatedRoute, RoutesRecognized, RouterStateSnapshot  } from '@angular/router';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-instruction',
  templateUrl: './instruction.component.html',
  styleUrls: ['./instruction.component.css']
})
export class InstructionComponent implements OnInit {

  gameId:number;
  constructor(private http: Http, private rout : Router  ) {
    const snapshot: RouterStateSnapshot = rout.routerState.snapshot;
    this.gameId = snapshot.root.queryParams["gameId"];  // <-- hope it helps
    }

  ngOnInit() {
    
  }

  Start()
  {
        this.rout.navigate(['/Personalities'], { queryParams: { gameId: this.gameId, page : 1}});

  }
}
