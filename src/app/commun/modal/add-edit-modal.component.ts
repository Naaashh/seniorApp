import {Component, HostListener, OnInit} from '@angular/core';
import {Application} from '../../application/application.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ModalService} from '../service/modal/modal.service';
import {StorageService} from '../service/storage/storage.service';
import {v4 as uuid} from 'uuid';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-add-edit-modal',
  templateUrl: './add-edit-modal.component.html',
  styleUrls: ['./add-edit-modal.component.scss']
})
export class AddEditModalComponent implements OnInit {

  form: FormGroup;
  imagePreviewed: { image: string, name: string };
  reader: FileReader;
  imagesFolder = environment.imagesFolder;
  application: Application;

  constructor(private fb: FormBuilder,
              public modal: ModalService,
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
   * check if click outside modal (click on bg-modal)
   * @param event click event
   */
  @HostListener('document:click', ['$event'])
  clickOutsideApp(event): void {
    if (event.target.className === 'bg-modal') {
      this.modal.closeModal();
    }
  }

  /**
   * submit modal
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
   * close modal
   */
  closeModal(): void {
    // small hack to clock modal using button without close parameters on same time
    setTimeout(() => this.modal.closeModal(), 1);
  }

  /**
   * activate input file when click on input text
   */
  uploadFile(): void {
    // small hack to activate hidden input file
    document.getElementById('image-input-upload').click();
  }

  /**
   * update modal when new file has been uploaded
   * @param event uploaded file
   */
  fileUploaded(event: Event): void {
    const file = (event.target as any).files[0];
    this.reader.readAsDataURL(file); // Converting file into data URL

    this.reader.onload = () => {
      // Setting up base64 URL on image
      this.imagePreviewed = {image: this.reader.result.toString(), name: file.name};
    };

    this.form.get('image').setValue(file.name);
  }

  /**
   * set image preview
   * @param application application pushed to modal
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
