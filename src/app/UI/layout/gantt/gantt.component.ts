import { Component, inject, input } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { Task } from '../../../domain/models/task/task';
import { SharedDataService } from '../../services/shared-data.service';
import { AsyncPipe } from '@angular/common';
import { IMes } from '../../../domain/models/project/month';
import { Project } from '../../../domain/models/project/project';
@Component({
  selector: 'app-gantt',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './gantt.component.html',
  styleUrl: './gantt.component.css'
})
export class GanttComponent {
  sData = inject(SharedDataService);
  tasksData$:Observable<Task[]> = new Observable();
  arrMonth$:Observable<IMes[]> = new Observable();

  constructor() {
    this.sData.idProject$.subscribe((id)=>
      {
        this.tasksData$ =  this.sData.tasks.pipe(
          map(tasks => tasks.filter(task => task.id_project === id))
        );
        this.sData.projectById.subscribe(p=>{
          if(p){
            this.arrMonth$ = this.getDaysByMonthsRange(p)
          }
        })
      }
    )
   //this.tasksData$ = this.sData.tasks 
  }
  getDaysByMonthsRange(project:Project): Observable<IMes[]> {
    let year = this.getDayMonthYear(project.startDate).year;
    let startMonth = this.getDayMonthYear(project.startDate).month;
    let endMonth = this.getDayMonthYear(project.endDate).month;
    const months: IMes[] = [];
    for (let i = startMonth; i <= endMonth; i++) {
      const nombreMes = new Date(year, i - 1).toLocaleString('es-ES', {
        month: 'long',
      });
      const cantidadDias = new Date(year, i, 0).getDate();
      const diasDelMes = Array.from(
        { length: cantidadDias },
        (_, index) => index + 1
      );
      months.push({
        nombre: nombreMes,
        numero: i,
        dias: diasDelMes,
      });
    }
    return of (months);
  }
  getDayMonthYear(dateString: string) {
    const date = new Date(dateString + 'T00:00:00'); // Añade el tiempo para evitar problemas de zona horaria
  
    const day = date.getUTCDate();
    const month = date.getUTCMonth() + 1; // Mes (0-11, se suma 1 para obtener 1-12)
    const year = date.getUTCFullYear();
  
    return { day, month, year };
  }

  getMonthFromDate(fecha: string): number {
    let fechaDate = new Date(fecha);
    return fechaDate.getUTCMonth() + 1;
  }
  obtenerDia(fecha: string): number {
    let fechaI = new Date(fecha);
    const dia = fechaI.getUTCDate();
    return dia;
  }
  obtenerCantidadDias(fechaInicio: string, fechaFin: string): number {
    let fInit = new Date(fechaInicio);
    let fFin = new Date(fechaFin);
    // Convertir ambas fechas a tiempo UNIX para calcular la diferencia en milisegundos
    const tiempoInicio = fInit.getTime();
    const tiempoFin = fFin.getTime();

    // Calcular la diferencia en milisegundos
    const diferenciaMilisegundos = tiempoFin - tiempoInicio;

    // Convertir la diferencia de milisegundos a días
    const milisegundosEnUnDia = 1000 * 60 * 60 * 24;
    const diferenciaDias = diferenciaMilisegundos / milisegundosEnUnDia + 1;

    // Redondear el resultado y convertirlo a un número entero
    return Math.round(diferenciaDias);
  }
  
}
