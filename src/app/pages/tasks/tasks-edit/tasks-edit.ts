import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModeEnum } from '../../../enums/mode.enum';
import { SHARED_UI_MODULES } from '../../../global/ui-imports';
import { TasksService } from '../tasks.service';
import { TasksResponse } from '../tasks.interface';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-tasks-edit',
  imports: [
    SHARED_UI_MODULES
  ],
  providers: [MessageService],
  templateUrl: './tasks-edit.html',
  styleUrl: './tasks-edit.css',
})
export class TasksEdit {

  public visible: boolean = false;
  public isLoadingUsers: boolean = false;
  public users: Array<any> = [
    { id: 1, name: 'David Souza' },
    { id: 2, name: 'Maria Silva' },
    { id: 3, name: 'João Pereira' },
  ];
  public reactiveForm: FormGroup = this.createFormTask();

  @Input('mode') mode: ModeEnum = ModeEnum.VIEW;
  @Input('title') title: string = 'Nova Tarefa';

  @Output('onsave') onSave: EventEmitter<boolean> = new EventEmitter<boolean>();

  public modeEnum = ModeEnum;

  private messageService = inject(MessageService);

  constructor(
      private tasksService: TasksService
  ) {}

  open(mode: ModeEnum = ModeEnum.VIEW){
    this.mode = mode;

    if(this.isEditable()) {
      this.reactiveForm.get('ownerId')?.enable();
    } else {
      this.reactiveForm.get('ownerId')?.disable();
    }

    this.visible = true;
    
  }

  close(){
    this.visible = false;
  } 

  createFormTask(){

    let form = new FormGroup({
      id:   new FormControl(null),
      title:   new FormControl('', Validators.required),
      description:   new FormControl(''),
      ownerId:   new FormControl({value: null, disabled: !this.isEditable()}, Validators.required)
    });

    return form;

  }

  saveTask(){
    
    let data = this.reactiveForm.value;
    data.ownerId = Number(data.ownerId.id);
    
    console.log(data)
    
    this.tasksService.saveNewTask(data).subscribe({
      next: (response: any) => {
        
        console.log(response);
        this.messageService.add({severity:'success', summary: 'Success', detail: 'Task saved successfully!'});
        this.onSave.emit(true);

      },
      error: (err) => {
        console.log(err)
        if(err.error?.message){
          this.messageService.add({severity:'error', summary: 'Error', detail: err.error.message});
        }else if(err.message){
          this.messageService.add({severity:'error', summary: 'Error', detail: err.message});
        }else{
          this.messageService.add({severity:'error', summary: 'Error', detail: 'An error occurred during save task.'});
        }
      },
      complete: () => {

        this.visible = false
      }
      
      
    });
  }

  isEditable(): boolean {
    return this.mode === ModeEnum.EDIT || this.mode === ModeEnum.CREATE;
  }

}
