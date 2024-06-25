import { Injectable } from '@angular/core';
import {GanttGateway} from "../models/gateway/GanttGateway";
import {Observable} from "rxjs";
import {Project} from "../models/project/project";

@Injectable({
  providedIn: 'root'
})
export class GetProjectUseCase {

  constructor(private _ganttGateway:GanttGateway) { }

  saveProject(_project: Project){
    return this._ganttGateway.saveProject(_project);
  }
  getProjectAll():Observable<Project[]> {
    return this._ganttGateway.getAllProjects();
  }
}
