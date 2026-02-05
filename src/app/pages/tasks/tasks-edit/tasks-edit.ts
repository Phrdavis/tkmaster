import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModeEnum } from '../../../enums/mode.enum';
import { SHARED_UI_MODULES } from '../../../global/ui-imports';

@Component({
  selector: 'app-tasks-edit',
  imports: [
    SHARED_UI_MODULES
  ],
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

  public modeEnum = ModeEnum;

  constructor() {}

  open(mode: ModeEnum = ModeEnum.VIEW){
    this.mode = mode;

    if(this.isEditable()) {
      this.reactiveForm.get('owner')?.enable();
    } else {
      this.reactiveForm.get('owner')?.disable();
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
      owner:   new FormControl({value: null, disabled: !this.isEditable()}, Validators.required)
    });

    return form;

  }

  saveTask(){
    console.log(this.reactiveForm.value);
    this.visible = false
  }

  isEditable(): boolean {
    return this.mode === ModeEnum.EDIT || this.mode === ModeEnum.CREATE;
  }

}
