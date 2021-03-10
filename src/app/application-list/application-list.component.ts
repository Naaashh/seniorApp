import {Component, OnInit} from '@angular/core';
import {Application} from '../application/application.model';
import {applications} from '../commun/global.constants';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-application-list',
  templateUrl: './application-list.component.html',
  styleUrls: ['./application-list.component.scss']
})
export class ApplicationListComponent implements OnInit {

  applications: Array<Application> = applications;

  ngOnInit(): void {
    this.applications = this.applications.map(application => ({...application, image: `${environment.imagesFolder}/${application.image}`}));
  }
}
