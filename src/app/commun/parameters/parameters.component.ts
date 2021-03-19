import {AfterViewChecked, Component, ElementRef, HostListener, Input, OnInit} from '@angular/core';
import {StorageService} from '../service/storage/storage.service';
import {ModalService} from '../service/modal/modal.service';
import {State} from '../model/state.model';

@Component({
  selector: 'app-parameters',
  templateUrl: './parameters.component.html',
  styleUrls: ['./parameters.component.scss']
})
export class ParametersComponent implements OnInit, AfterViewChecked {


  @Input() paramClick: boolean;

  isZoom = false;
  private zoomed: number;

  constructor(public storageService: StorageService,
              public modal: ModalService,
              private eRef: ElementRef) {
  }

  ngAfterViewChecked(): void {
    this.applyZoom();
  }

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
    if (!this.eRef.nativeElement.contains(event.target) && !this.paramClick) {
      if (this.zoomed !== this.storageService.state.zoom) {
        this.storageService.editZoom(this.zoomed);
      }
      this.isZoom = false;
    }
  }
}
