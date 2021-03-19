import {Application} from '../../application/application.model';

export interface State {
  applications: Array<Application>;
  zoom: number;
}
