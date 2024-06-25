import {Project} from "../project/project";
import {Observable} from "rxjs";
import {Task} from "../task/task";

export abstract class GanttGateway {
  abstract saveProject(_project:Project): Observable<any>;
  abstract getAllProjects(): Observable<Project[]>;

  abstract saveTask(_task:Task): Observable<any>;
  abstract getTaskByProjectId(projectId: number): Observable<Task[]>;
}
