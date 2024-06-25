import { Component } from '@angular/core';
import {UserComponent} from "./user/user.component";
import {CreateProjectComponent} from "./create-project/create-project.component";
import {ProjectsComponent} from "./projects/projects.component";
import {GanttComponent} from "./gantt/gantt.component";

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [UserComponent,CreateProjectComponent,ProjectsComponent,GanttComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

  allocateIdProject:number=0;


}
