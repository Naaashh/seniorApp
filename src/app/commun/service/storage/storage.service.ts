import {Injectable} from '@angular/core';
import {ElectronService} from 'ngx-electron';
import {Application} from '../../../application/application.model';
import {BehaviorSubject} from 'rxjs';
import {State} from '../../model/state.model';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  public state: State;
  private currentState = new BehaviorSubject<State>({applications: [], zoom: 0});
  public currentState$ = this.currentState.asObservable();

  constructor(private electronService: ElectronService) { }

  /**
   * get stored data
   */
  async getData(): Promise<State> {
    this.electronService.ipcRenderer.send('get-data');
    return await new Promise(resolve => this.electronService.ipcRenderer.on('get-data', (event, message: State) => {
      this.state = message;
      this.currentState.next(this.state);
      resolve(this.state);
    }));
  }

  /**
   * Add an application to stored data
   * @param application application to add
   */
  add(application: Application): void {
    this.state.applications = [...this.state.applications, application];
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
    this.state.applications[this.state.applications.findIndex(app => app.id === application.id)] = application;
    this.modifyAndUpdateState();
  }

  /**
   * edit an application to stored data
   * @param zoom zoom to update
   */
  editZoom(zoom: number): void {
    this.state.zoom = zoom;
    this.modifyAndUpdateState();
  }

  /**
   * remove an application in stored data if exists
   * @param id application id to remove
   */
  remove(id: string): void {
    const indexOfAppToRemove: number = this.state.applications.findIndex(application => application.id === id);

    if ( indexOfAppToRemove !== -1) {
      this.state.applications.splice(indexOfAppToRemove, 1);
      this.modifyAndUpdateState();
    }
  }

  /**
   * reset storage to default preset
   */
  async reset(): Promise<State> {
    this.electronService.ipcRenderer.send('reset-data');
    return await new Promise(resolve => this.electronService.ipcRenderer.on('reset-data', (event, data) => {
      this.state = data;
      this.currentState.next(this.state);
      resolve(this.state);
    }));
  }

  /**
   * send currentApplications to modification and update currentApplicationsState
   */
  modifyAndUpdateState(): void {
    this.electronService.ipcRenderer.send('modify-data', this.state);
    this.currentState.next(this.state);
  }
}
