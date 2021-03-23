import {Component, OnInit} from '@angular/core';
import {StorageService} from '../commun/service/storage/storage.service';
import {Observable} from 'rxjs';
import {AddEditModalService} from '../commun/modal/add-edit/service/add-edit-modal.service';
import {State} from '../commun/model/state.model';
import {ImagesCreditModalService} from '../commun/modal/images-credit/service/images-credit-modal.service';

@Component({
  selector: 'app-application-list',
  templateUrl: './application-list.component.html',
  styleUrls: ['./application-list.component.scss']
})
export class ApplicationListComponent implements OnInit {

  /**
   * Actual app {@link State} as Observable
   */
  state: Observable<State>;

  constructor(private storageService: StorageService,
              public modal: AddEditModalService,
              public imagesCreditModal: ImagesCreditModalService) {
  }

  /**
   * get actual app state from {@link StorageService}
   */
  ngOnInit(): void {
  this.state = this.storageService.currentState$;
  // this.state = of(applications);
  }
}
