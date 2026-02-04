import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { DrawerModule } from 'primeng/drawer';
import { RippleModule } from 'primeng/ripple';
import { LoginService } from '../login/login.service';
import { GlobalService } from '../global/global.service';

@Component({
  selector: 'app-menu',
  imports: [
    AvatarModule, 
    ButtonModule, 
    DrawerModule, 
    RippleModule,
    RouterModule
  ],
  templateUrl: './menu.html',
  styleUrl: './menu.css',
})
export class Menu {

    public visible: boolean = false;

    public userData: any = null;

    public projectInfo = require('../../../project_info.json');

    constructor(
      private loginService: LoginService,
      private globalService: GlobalService
    ) {}

    ngOnInit(){
      this.getUser();
    }

    logout(){

      this.loginService.logout();

    }

    redirectMenu(menu: string){

      this.visible = false;
      setTimeout(() => {
        window.location.href = menu;
      }, 300);

    }

    getUser(){
      if(!this.userData){
        const userString = this.globalService.getStorageItem('user');
        if(userString){
          this.userData = JSON.parse(userString);
        }
      }
    }

    getInitials(name: string): string {
      if (!name) return '';
      const names = name.split(' ');
      const initial = names[0].charAt(0).toUpperCase();
      return initial;
    }

    toggleDarkMode() {
      this.globalService.toggleDarkMode();
    }

    isDarkMode(): boolean {
      return this.globalService.isDarkMode();
    }
    
}
