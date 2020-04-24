import { Component, OnInit } from '@angular/core';
import { StoreService } from '../service/store.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  constructor(public storeService: StoreService) { }

  ngOnInit(): void {

  }

}
