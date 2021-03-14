import {Component, ElementRef, HostListener} from '@angular/core';
import {ParameterService} from '../service/parameters/parameter.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  constructor(private eRef: ElementRef,
              public parameterService: ParameterService) {
  }

  /**
   * check if click outside current component
   * @param event click event
   */
  @HostListener('document:click', ['$event'])
  clickOutsideApp(event): void {
    if (!this.eRef.nativeElement.contains(event.target) && this.parameterService.parameterShow) {
      this.parameterService.changeParamMode();
    }
  }
}
