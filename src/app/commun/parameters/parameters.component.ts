import {AfterViewChecked, Component, ElementRef, HostListener, Input, OnInit} from '@angular/core';
import {StorageService} from '../service/storage/storage.service';
import {AddEditModalService} from '../modal/add-edit/service/add-edit-modal.service';
import {State} from '../model/state.model';

@Component({
  selector: 'app-parameters',
  templateUrl: './parameters.component.html',
  styleUrls: ['./parameters.component.scss']
})
export class ParametersComponent implements OnInit, AfterViewChecked {

  /**
   * true if {@link ParametersComponent} should be shown
   */
  @Input() paramShow: boolean;
  /**
   * true if zoom range should be shown
   */
  isZoom = false;
  /**
   * current zoom value
   */
  zoomed: number;

  constructor(public storageService: StorageService,
              public modal: AddEditModalService,
              private eRef: ElementRef) {
  }

  /**
   * apply zoom on {@link ParametersComponent} start
   */
  ngAfterViewChecked(): void {
    this.applyZoom();
  }

  /**
   * get current app {@link State} and update {@link ParametersComponent.zoomed}
   */
  ngOnInit(): void {
    this.storageService.currentState$.subscribe((state: State) => this.zoomed = state.zoom);
  }

  /**
   * update font size change on zoom change
   * @param $event zoom value
   */
  zoom($event): void {
    this.zoomed = Number($event.target.value);
    this.applyZoom();
  }

  /**
   * apply {@link ParametersComponent.zoomed} to general font-size
   */
  applyZoom(): void {
    const fontSize = 30 + this.zoomed;
    document.getElementById('container').style.fontSize = fontSize + 'px';
  }

  /**
   * check if click outside current component
   * on click outisde zoom, store value and close zoom (!isZoom)
   * @param event click event
   */
  @HostListener('document:click', ['$event'])
  focusOutZoom(event): void {
    if (!this.eRef.nativeElement.contains(event.target) && !this.paramShow) {
      if (this.zoomed !== this.storageService.state.zoom) {
        this.storageService.editZoom(this.zoomed);
      }
      this.isZoom = false;
    }
  }
}
