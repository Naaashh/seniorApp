import {Component, Input} from '@angular/core';
import {Application} from './application.model';
import {ElectronService} from 'ngx-electron';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss']
})
export class ApplicationComponent {

  constructor(private electron: ElectronService) {
  }

  @Input() application: Application;

  openApp(): void {
    if (this.application.isProgram) {
      this.electron.ipcRenderer.send('execute-command', this.application.execute);
    } else {
      this.electron.shell.openExternal(this.application.execute);
    }
  }
}
