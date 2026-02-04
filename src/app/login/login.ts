import { Component, inject } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { LoginService } from './login.service';
import { lastValueFrom } from 'rxjs';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { validationErrorResponseInterface } from '../interfaces/error-response.interface';
import { loginResponseInterface } from '../interfaces/login-response.interface';
import { GlobalService } from '../global/global.service';

@Component({
  selector: 'app-login',
  imports: [
    CardModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    FloatLabelModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    PasswordModule,
    ToastModule,
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
    console.log(this.reactiveForm.value);

    try{
      let data: any = await lastValueFrom<any>(this.loginService.login(this.reactiveForm.value));

      this.globalService.setToken((data as loginResponseInterface).token);

      console.log(data);
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
