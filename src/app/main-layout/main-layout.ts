import { Component } from '@angular/core';
import { Menu } from '../menu/menu';
import { GlobalService } from '../global/global.service';
import { SHARED_UI_MODULES } from '../global/ui-imports';

@Component({
  selector: 'app-main-layout',
  imports: [
    Menu,
    SHARED_UI_MODULES
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
