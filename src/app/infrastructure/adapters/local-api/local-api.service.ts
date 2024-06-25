import { Injectable } from '@angular/core';
import {Project} from "../../../domain/models/project/project";
import {Task} from "../../../domain/models/task/task";

@Injectable({
  providedIn: 'root'
})
export class LocalApiService {
  constructor() { }
  setLocalProjects(project:Project){
    localStorage.setItem('projects', JSON.stringify(project));
  }
  setTask(task: Task){
    localStorage.setItem('tasks', JSON.stringify(task));
  }

  getLocalProjects(){
    const all = localStorage.getItem('projects');
  }
  getAllTask():string {
    const all = localStorage.getItem('task');
    return all ? JSON.parse(all) : [];
  }
  getTaskByID(taskId: number){
    const tasks = this.getAllTask();

  }
}
