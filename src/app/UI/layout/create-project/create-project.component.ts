import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { SharedDataService } from '../../services/shared-data.service';
@Component({
  selector: 'app-create-project',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-project.component.html',
  styleUrl: './create-project.component.css'
})
export class CreateProjectComponent {
  fb = inject(FormBuilder);
  sData = inject(SharedDataService);

  showModal:boolean=false;
  project = this.fb.group({
    nameProject:['',Validators.required]
  })
  createProject = this.fb.group({
    description:[''],
    startDate:['',Validators.required],
    endDate:['',Validators.required],
  })
  newProject(){
    if(this.project.valid){
      this.showModal = true;
    }
  }
  saveProject(){
    if(this.createProject.valid){
      const arrProject = {...this.project.value,...this.createProject.value};
      this.sData.adapterProject(arrProject);
      this.controlModal();
    }
  }
  
  controlModal(){
    this.showModal = !this.showModal;
  }
}
