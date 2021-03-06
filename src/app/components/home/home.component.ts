import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { TaskServicesService } from '../../../services/task-services.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  // changeDetection : ChangeDetectionStrategy.OnPush,
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
taskList : Array<any> =[];
show : boolean= false;
FilteredtaskList : Array<any> =[];
  constructor(public router : Router,private taskService : TaskServicesService) { }

  ngOnInit(): void {
    this.getTaskList();
  }

 
  getTaskList(){
this.taskService.getTaskList().subscribe((result : any)=>{
  this.taskList = result.tasks;
  this.FilteredtaskList = result.tasks;
  this.show = true;
})

}


  delete(id : any ,index : number){
let formdata : FormData = new FormData();
formdata.append('taskid',id);
this.taskService.deleteTask(formdata).subscribe((result :any)=>{
 this.getTaskList();
})
  }

set searchedTask(text : string){

this.FilteredtaskList =  this.taskList.filter((task : any)=> task.message.toLowerCase().indexOf(text.toLowerCase()) !== -1);

}

  

}
