import {Component, HostListener, OnInit} from '@angular/core';
import {ImageCredit} from '../../model/imageCredit.model';
import {StorageService} from '../../service/storage/storage.service';
import {ImagesCreditModalService} from './service/images-credit-modal.service';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-images-credit-modal',
  templateUrl: './images-credit-modal.component.html',
  styleUrls: ['./images-credit-modal.component.scss']
})
export class ImagesCreditModalComponent implements OnInit {

  /**
   * ImagesFolder where all images are present
   */
  imagesFolder = environment.imagesFolder;

  imagesCredits: Array<ImageCredit>;

  constructor(private storageService: StorageService,
              private modal: ImagesCreditModalService) { }

  ngOnInit(): void {
   this.storageService.getImagesCredit().then(result => this.imagesCredits = result);
  }

  /**
   * check if click outside modal component (click on bg-modal)
   * @param event click event
   */
  @HostListener('document:click', ['$event'])
  clickOutsideApp(event): void {
    if (event.target.className === 'bg-modal') {
      this.modal.closeModal();
    }
  }

  /**
   * close current {@link ImagesCreditModalComponent} modal
   */
  closeModal(): void {
    // small hack to clock modal using button without close parameters on same time
    setTimeout(() => this.modal.closeModal(), 1);
  }
}
