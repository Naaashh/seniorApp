import {Component, Input} from '@angular/core';
import {Application} from './application.model';
import {ElectronService} from 'ngx-electron';
import {EditService} from '../commun/service/edit/edit.service';
import {ParameterService} from '../commun/service/parameters/parameter.service';
import {StorageService} from '../commun/service/storage/storage.service';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss']
})
export class ApplicationComponent {

  constructor(public editService: EditService,
              public parameterService: ParameterService,
              private electron: ElectronService,
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

  remove(event: Event, name: string): void {
    event.stopPropagation();
    this.storageService.remove(name);
  }

  edit(event: Event, application: Application): void {
    event.stopPropagation();
    this.storageService.edit(application);
  }
}
