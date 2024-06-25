import { Component, inject, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { SharedDataService } from '../../services/shared-data.service';

@Component({
  selector: 'app-create-task',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.css'
})
export class CreateTaskComponent {
  showTaskModal = output<boolean>()
  fb = inject(FormBuilder);
  sData = inject(SharedDataService)

  createTaskForm = this.fb.group({
    title: ['',Validators.required],
    startDate:['',Validators.required],    
    endDate:['',Validators.required],    
  })

  controlModalTask(){
    this.showTaskModal.emit(false);
  }

  saveTask(){
    if(this.createTaskForm.valid){
      this.sData.adapterTask(this.createTaskForm.value);
    }
    this.controlModalTask();
  }
  
}
