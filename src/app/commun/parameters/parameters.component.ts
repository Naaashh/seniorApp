import {Component, Input} from '@angular/core';
import {StorageService} from '../service/storage/storage.service';
import {ModalService} from '../service/modal/modal.service';

@Component({
  selector: 'app-parameters',
  templateUrl: './parameters.component.html',
  styleUrls: ['./parameters.component.scss']
})
export class ParametersComponent {

  @Input() paramClick;

  constructor(public storageService: StorageService,
              public modal: ModalService) {
  }
}
