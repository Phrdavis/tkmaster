import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { lastValueFrom } from 'rxjs';
import { MessageService } from 'primeng/api';
import { validationErrorResponseInterface } from '../interfaces/error-response.interface';
import { GlobalService } from '../global/global.service';
import { SHARED_UI_MODULES } from '../global/ui-imports';

@Component({
  selector: 'app-login',
  imports: [
    SHARED_UI_MODULES
  ],
  providers: [MessageService],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  private messageService = inject(MessageService);

  constructor(
    private loginService: LoginService,
    private globalService: GlobalService
  ) { }

  public reactiveForm = this.createForm();

  createForm() {

    let form = new FormGroup({

      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),

    });

    return form;

  }

  async loginSubmit() {

    try{
      let data: any = await lastValueFrom<any>(this.loginService.login(this.reactiveForm.value));

      console.log(data);

      this.messageService.add({severity:'success', summary: 'Success', detail: 'Login successful!'});

      window.location.href = '/tasks';

    } catch (error: validationErrorResponseInterface | any) {
      console.log(error)
      if(error.error?.message){
        this.messageService.add({severity:'error', summary: 'Error', detail: error.error.message});
      }else if(error.message){
        this.messageService.add({severity:'error', summary: 'Error', detail: error.message});
      }else{
        this.messageService.add({severity:'error', summary: 'Error', detail: 'An error occurred during login.'});
      }
    }

  }

  cadastroNot(){
    this.messageService.add({severity:'info', summary: 'Info', detail: 'Pagina de Cadastro ainda em construção.'});
  }

}
