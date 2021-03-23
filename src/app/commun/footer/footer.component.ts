import {Component, ElementRef, HostListener} from '@angular/core';
import {ParameterService} from '../service/parameters/parameter.service';
import {AddEditModalService} from '../modal/add-edit/service/add-edit-modal.service';
import {ImagesCreditModalService} from '../modal/images-credit/service/images-credit-modal.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  constructor(private eRef: ElementRef,
              private modal: AddEditModalService,
              public imagesCreditModal: ImagesCreditModalService,
              public parameterService: ParameterService) {
  }

  /**
   * check if click outside current component
   * @param event click event
   */
  @HostListener('document:click', ['$event'])
  clickOutsideApp(event): void {
    if (!this.eRef.nativeElement.contains(event.target) && !this.modal.show && this.parameterService.parameterShow) {
      this.parameterService.changeParamMode();
    }
  }
}
