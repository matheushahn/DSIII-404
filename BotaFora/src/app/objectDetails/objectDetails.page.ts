import { Component, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { ObjectService } from '../services/object.service';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Object } from '../interfaces/Object';
@Component({
  selector: 'app-objectDetails',
  templateUrl: './objectDetails.page.html',
  styleUrls: ['./objectDetails.page.scss'],
})
export class ObjectDetailsPage implements OnInit {

  private object: Observable<Object>;

  constructor(
    private objectService: ObjectService,
    private activatedRoute: ActivatedRoute
  ) {
    let id = this.activatedRoute.snapshot.params['id'];
    this.object = this.objectService.getObject(id);
  }

  ngOnInit() { }

  ngOnDestroy() { }

}
