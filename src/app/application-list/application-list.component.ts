import {Component, OnInit} from '@angular/core';
import {Application} from '../application/application.model';
import {environment} from '../../environments/environment';
import {StorageService} from '../commun/service/storage/storage.service';
import {applications} from '../commun/global.constants';
import {Observable, of} from 'rxjs';

@Component({
  selector: 'app-application-list',
  templateUrl: './application-list.component.html',
  styleUrls: ['./application-list.component.scss']
})
export class ApplicationListComponent implements OnInit {

  applications: Observable<Array<Application>>;

  constructor(private storageService: StorageService) {
  }

  ngOnInit(): void {
   // this.applications = this.storageService.currentApplications$.pipe(map(application => application.map(app => ({...app, image: `${environment.imagesFolder}/${app.image}`}))));

    this.applications = of(applications.map(application => ({...application, image: `${environment.imagesFolder}/${application.image}`})));
  }
}
