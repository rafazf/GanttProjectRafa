import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, map, of } from 'rxjs';
import { Project } from '../../domain/models/project/project';
import { Task } from '../../domain/models/task/task';
@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  constructor() { }

  /**Project */
  private bs = new BehaviorSubject<Project[]>([]);
  arrProjects:Project[]=[];

  get project():Observable<Project[]>{
    return this.bs.asObservable();
  }
  set projects(_project:Project){
    this.arrProjects.push(_project);
    localStorage.setItem('projects',JSON.stringify(this.arrProjects));
    this.bs.next(this.arrProjects);
  }
  get projectById():Observable<Project>{
    const data = this.arrProjects.filter(d=>d.id===this.getProjectId());
    if(!data){
      return of ();
    }
    return of (data[0]);

  }
  adapterProject(data:any){
    const formattedData:Project = {
      id:this.generateId(),
      name:data.nameProject,
      description:data.description,
      startDate:data.startDate,
      endDate:data.endDate,
    }
    this.projects = formattedData;
  }
  generateId(){
    let id = Math.floor(Math.random() * 1000000);
    return id;
  }

  /**Task */
  private taskBs = new BehaviorSubject<Task[]>([]);
  arrTasks:Task[]=[];

  get tasks():Observable<Task[]>{
    return this.taskBs.asObservable();
  }
  
  set addTasks(_task:Task){
    this.arrTasks.push(_task);
    localStorage.setItem('tasks',JSON.stringify(this.arrTasks));
    this.taskBs.next(this.arrTasks);
  }
  adapterTask(data:any){
    const formattedData:Task = {
      id:this.generateId(),
      id_project:this.getProjectId(),
      name:data.title,
      status:'create',
      startDate:data.startDate,
      endDate:data.endDate,
    }
    this.addTasks = formattedData;
  }
  
  getProjectId():number{
    return JSON.parse(localStorage.getItem('idProject') || '');
  }
  saveIdProjectLocal(id:number){
    localStorage.setItem('idProject',JSON.stringify(id));
  }

  //**idproject */
  private idProjectBs = new BehaviorSubject<number>(0);
  idProject$:Observable<number> = this.idProjectBs.asObservable();
  setIdProject(id:number){
    this.saveIdProjectLocal(id)
    this.idProjectBs.next(id);
  }
}
