import { Component, OnInit } from '@angular/core';
import * as models from '../../models/index';

@Component({
  selector: 'app-home',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomeComponent implements OnInit {

  public events: models.EventsModel[];
  public interests: models.InterestsModel[];
  public user: models.UserModel;
  public relationship: models.RelationshipModel[];

  constructor() { }

  ngOnInit() {
  }

}
