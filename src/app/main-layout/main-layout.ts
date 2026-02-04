import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Menu } from '../menu/menu';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { GlobalService } from '../global/global.service';

@Component({
  selector: 'app-main-layout',
  imports: [
    RouterOutlet,
    Menu,
    TagModule,
    ButtonModule,
  ],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css',
})
export class MainLayout {

  public projectInfo = require('../../../project_info.json');

  constructor(
    private globalService: GlobalService
  ) {}

  toggleDarkMode() {
    this.globalService.toggleDarkMode();
  }

  isDarkMode(): boolean {
    return this.globalService.isDarkMode();
  }
}
