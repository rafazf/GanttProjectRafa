import { Injectable } from '@angular/core';
import {GanttGateway} from "../../../domain/models/gateway/GanttGateway";
import {Observable, of, throwError} from "rxjs";
import {Project} from "../../../domain/models/project/project";
import {Task} from "../../../domain/models/task/task";
import {LocalApiService} from "../local-api/local-api.service";

@Injectable({
  providedIn: 'root'
})
export class GanttApiService extends GanttGateway{

  constructor(public dataLocal:LocalApiService){
    super();
  }

  getAllProjects(): Observable<Project[]> {
    return throwError(new Error('getAllProjects'));
  }

  getTaskByProjectId(projectId: number): Observable<Task[]> {
    return throwError(new Error('getAllProjects'));
  }

  saveProject(_project: Project): Observable<any> {
    this.dataLocal.setLocalProjects(_project);
    return of({msg:'Save project'});
  }

  saveTask(_task: Task): Observable<any> {
    this.dataLocal.setTask(_task);
    return of({msg:'Save task'});
  }

}
