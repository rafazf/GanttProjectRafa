import { Component, inject, output } from '@angular/core';
import {CreateTaskComponent} from "../create-task/create-task.component";
import { Project } from '../../../domain/models/project/project';
import { SharedDataService } from '../../services/shared-data.service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CreateTaskComponent,AsyncPipe],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent {
  openCreateTaskModal = false;
  sData = inject(SharedDataService);
  arrProjects$:Observable<Project[]>;

  constructor() {
    this.arrProjects$ = this.sData.project
  }

  addOneTaskByProjectId(id:number){
    this.sData.saveIdProjectLocal(id);
    this.controlModalTask(true);
  }

  controlModalTask(band:boolean){
    this.openCreateTaskModal = band;
  }

  emitIdProject(id:number){
    this.sData.setIdProject(id);
  }
  
}
