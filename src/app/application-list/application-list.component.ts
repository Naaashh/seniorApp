import {Component, OnInit} from '@angular/core';
import {StorageService} from '../commun/service/storage/storage.service';
import {Observable} from 'rxjs';
import {ModalService} from '../commun/service/modal/modal.service';
import {State} from '../commun/model/state.model';

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
              public modal: ModalService) {
  }

  /**
   * get actual app state from {@link StorageService}
   */
  ngOnInit(): void {
  this.state = this.storageService.currentState$;
   // this.state = of(applications);
  }
}
