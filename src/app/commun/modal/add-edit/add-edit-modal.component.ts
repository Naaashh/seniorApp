import {Component, HostListener, OnInit} from '@angular/core';
import {Application} from '../../../application/application.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AddEditModalService} from '../../modal/add-edit/service/add-edit-modal.service';
import {StorageService} from '../../service/storage/storage.service';
import {v4 as uuid} from 'uuid';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-add-edit-modal',
  templateUrl: './add-edit-modal.component.html',
  styleUrls: ['./add-edit-modal.component.scss']
})
export class AddEditModalComponent implements OnInit {
  /**
   * {@link FormGroup} for modal to add or edit request {@link Application}
   */
  form: FormGroup;

  /**
   * Image previewed showing current image / on image upload
   */
  imagePreviewed: { image: string, name: string };

  /**
   * {@link FileReader} used to read image on image upload
   */
  reader: FileReader;

  /**
   * ImagesFolder where all images are present
   */
  imagesFolder = environment.imagesFolder;

  /**
   * {@link Application} requested to be modified or added
   */
  application: Application;

  constructor(private fb: FormBuilder,
              public modal: AddEditModalService,
              private storageService: StorageService) { }

  ngOnInit(): void {
    this.modal.value$.subscribe({
      next: (data: Application) => {
        this.application = data;
        this.getImagePreview(this.application);
      },
      error: () => this.modal.closeModal(),
      complete: () => {
        this.reader = new FileReader();
        this.form = this.fb.group({
          name: this.fb.control(this.application.name, Validators.required),
          image: this.fb.control(this.application.image?.split('/').pop()),
          execute: this.fb.control(this.application.execute, [Validators.required, Validators.pattern('^ ?(?:https?:\\/\\/)?([\\w]+.)+.[a-z]+ ?$')])
        });
      }
    });
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
   * Add new / Modify {@link Application} to {@link StorageService} if {@link AddEditModalComponent.form} is
   * considered as valid then close modal
   *
   */
  submit(): void {

    if (this.form.valid) {
      let submitApplication = {...this.application};

      submitApplication = {
        ...submitApplication,
        name: this.form.value.name.trim(),
        image: this.form.value.image || environment.defaultImage,
        execute: (
          !this.form.value.execute.match('^https?:\/\/.+$') ?
            'https://' + this.form.value.execute : this.form.value.execute).trim()
      };

      // imports new image
      if (this.reader.result) {
        this.storageService.addImage(this.imagePreviewed);
      }

      // edits app if is an edit, else if it is a new app, creates one
      if (submitApplication.id) {
        this.storageService.edit(submitApplication);
      } else {
        this.storageService.add({...submitApplication, isProgram: false, id: uuid()});
      }

      // close modal
      this.modal.closeModal();
    }
  }

  /**
   * close current {@link AddEditModalComponent} modal
   */
  closeModal(): void {
    // small hack to clock modal using button without close parameters on same time
    setTimeout(() => this.modal.closeModal(), 1);
  }

  /**
   * Activate 'image-input-upload' in html input type=file
   */
  openChooseFileDialog(): void {
    // small hack to activate hidden input file
    document.getElementById('image-input-upload').click();
  }

  /**
   * Read chosen file and updated {@link AddEditModalComponent.imagePreviewed}
   * @param event chosen file
   */
  showChosenFile(event: Event): void {
    const file = (event.target as any).files[0];
    this.reader.readAsDataURL(file); // Converting file into data URL

    this.reader.onload = () => {
      // Setting up base64 URL on image
      this.imagePreviewed = {image: this.reader.result.toString(), name: file.name};
    };

    this.form.get('image').setValue(file.name);
  }

  /**
   * set image preview based on {@link AddEditModalComponent.application}
   * @param application Application pushed to modal
   */
  getImagePreview(application: Application): void {
    this.imagePreviewed = application?.image && application?.name
      ? {...this.application,
        image: environment.imagesFolder + '/' + this.application.image
      } :
      {
        image: environment.defaultImage,
        name: 'default image'
      };
  }
}
