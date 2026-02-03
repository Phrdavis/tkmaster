import { Component } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { Drawer, DrawerModule } from 'primeng/drawer';
import { RippleModule } from 'primeng/ripple';

@Component({
  selector: 'app-menu',
  imports: [
    AvatarModule, 
    ButtonModule, 
    DrawerModule, 
    RippleModule
  ],
  templateUrl: './menu.html',
  styleUrl: './menu.css',
})
export class Menu {

    visible: boolean = false;
    
}
