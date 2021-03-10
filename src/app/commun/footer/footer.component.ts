import {Component, ElementRef, HostListener} from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  paramClick = false;

  constructor(private eRef: ElementRef) {
  }

  /**
   * check if click outside current component
   * @param event click event
   */
  @HostListener('document:click', ['$event'])
  clickOutsideApp(event): void {
    if (!this.eRef.nativeElement.contains(event.target) && this.paramClick) {
      this.paramClick = false;
    }
  }

}
