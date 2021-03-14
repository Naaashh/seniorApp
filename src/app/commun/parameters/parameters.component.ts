import {Component, Input} from '@angular/core';
import {EditService} from '../service/edit/edit.service';
import {StorageService} from '../service/storage/storage.service';

@Component({
  selector: 'app-parameters',
  templateUrl: './parameters.component.html',
  styleUrls: ['./parameters.component.scss']
})
export class ParametersComponent {

  @Input() paramClick;

  constructor(private editService: EditService,
              private storageService: StorageService) {
  }

  add(): void {

  }

  setEditMode(): void {
    this.editService.setEditMode();
  }

  reset(): void {
    this.storageService.reset();
  }
}
