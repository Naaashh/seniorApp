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

  /**
   * get stored data
   */
  async getData(): Promise<Array<Application>> {
    this.electronService.ipcRenderer.send('get-data');
    return await new Promise(resolve => this.electronService.ipcRenderer.on('get-data', (event, message) => {
      this.currentApplications = message;
      this.currentApplicationsState.next(this.currentApplications);
      resolve(message);
    }));
  }

  /**
   * Add an application to stored data
   * @param application application to add
   */
  add(application: Application): void {
    this.currentApplications = [...this.currentApplications, application];
    this.modifyAndUpdateState();
  }

  /**
   * Add an image to images folder
   * @param image image data with name
   */
  addImage(image: {image: string, name: string}): void {
    this.electronService.ipcRenderer.send('add-image', image);
  }

  /**
   * edit an application to stored data
   * @param application application to edit
   */
  edit(application: Application): void {
    this.currentApplications[this.currentApplications.findIndex(app => app.id === application.id)] = application;
    this.modifyAndUpdateState();
  }

  /**
   * remove an application in stored data if exists
   * @param id application id to remove
   */
  remove(id: string): void {
    const indexOfAppToRemove: number = this.currentApplications.findIndex(application => application.id === id);

    if ( indexOfAppToRemove !== -1) {
      this.currentApplications.splice(indexOfAppToRemove, 1);
      this.modifyAndUpdateState();
    }
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
