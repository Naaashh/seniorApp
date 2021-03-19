import {Component, Input} from '@angular/core';
import {Application} from './application.model';
import {ElectronService} from 'ngx-electron';
import {ParameterService} from '../commun/service/parameters/parameter.service';
import {StorageService} from '../commun/service/storage/storage.service';
import {ModalService} from '../commun/service/modal/modal.service';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss']
})
export class ApplicationComponent {

  constructor(public parameterService: ParameterService,
              private electron: ElectronService,
              private modal: ModalService,
              public storageService: StorageService) {
  }

  @Input() application: Application;

  /**
   * open app on host computer
   */
  openApp(): void {
    if (this.application.isProgram) {
      // send command line input to open program
      this.electron.ipcRenderer.send('execute-command', this.application.execute);
    } else {
      // open url in navigator
      this.electron.shell.openExternal(this.application.execute);
    }
  }

  /**
   * Remove application from list
   * @param event current application
   * @param id application id
   */
  remove(event: Event, id: string): void {
    // stop propagation to not open app
    event.stopPropagation();
    this.storageService.remove(id);
  }

  /**
   * edit requested application
   * @param event current application
   * @param application chosen application
   */
  edit(event: Event, application: Application): void {
    // stop propagation to not open app
    event.stopPropagation();
    this.modal.openModal(application);
  }
}
