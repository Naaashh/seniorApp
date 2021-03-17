import {Component, OnInit} from '@angular/core';
import {Application} from '../application/application.model';
import {StorageService} from '../commun/service/storage/storage.service';
import {Observable} from 'rxjs';
import {ModalService} from '../commun/service/modal/modal.service';

@Component({
  selector: 'app-application-list',
  templateUrl: './application-list.component.html',
  styleUrls: ['./application-list.component.scss']
})
export class ApplicationListComponent implements OnInit {

  applications: Observable<Array<Application>>;

  constructor(private storageService: StorageService,
              public modal: ModalService) {
  }

  ngOnInit(): void {
    this.applications = this.storageService.currentApplications$;

    // this.applications = of(applications);
  }
}
