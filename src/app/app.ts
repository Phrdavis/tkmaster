import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { Menu } from './menu/menu';
import { GlobalService } from './global/global.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ButtonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'tkmaster';

  constructor(private globalService: GlobalService) {}

  ngOnInit() {
    this.globalService.initAppState();
  }

}
