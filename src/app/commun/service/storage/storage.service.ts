import {Injectable} from '@angular/core';
import {ElectronService} from 'ngx-electron';
import {Application} from '../../../application/application.model';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private currentApplications: Array<Application>;
  private currentApplicationsState = new BehaviorSubject<Array<Application>>([]);
  public currentApplications$ = this.currentApplicationsState.asObservable();

  constructor(private electronService: ElectronService) { }

  async getData(): Promise<Array<Application>> {
    this.electronService.ipcRenderer.send('get-data');
    return await new Promise(resolve => this.electronService.ipcRenderer.on('get-data', (event, message) => {
      this.currentApplications = message;
      this.currentApplicationsState.next(this.currentApplications);
      resolve(message);
    }));
  }

  add(application: Application): void {
    this.currentApplications = [...this.currentApplications, application];
    this.modifyAndUpdateState();
  }

  edit(application: Application): void {
    this.currentApplications[this.currentApplications.findIndex(app => app.name === application.name)] = application;
    this.modifyAndUpdateState();
  }

  remove(name: string): void {
    this.currentApplications.splice(this.currentApplications.findIndex(application => application.name === name), 1);
    console.log(this.currentApplications);
    this.modifyAndUpdateState();
  }

  /**
   * reset storage to default preset
   */
  async reset(): Promise<void> {
    this.electronService.ipcRenderer.send('reset-data', this.currentApplications);
    return await new Promise(resolve => this.electronService.ipcRenderer.on('reset-data', (event, data) => {
      this.currentApplications = data;
      this.currentApplicationsState.next(this.currentApplications);
      resolve(data);
    }));
  }

  /**
   * send currentApplications to modification and update currentApplicationsState
   */
  modifyAndUpdateState(): void {
    this.electronService.ipcRenderer.send('modify-data', this.currentApplications);
    this.currentApplicationsState.next(this.currentApplications);
  }
}
