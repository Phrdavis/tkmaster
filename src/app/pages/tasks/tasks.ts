import { Component, ViewChild } from '@angular/core';
import { TasksService } from './tasks.service';
import { TasksResponse } from './tasks.interface';
import { PageResponse } from '../../interfaces/paginable.model';
import { TasksEdit } from './tasks-edit/tasks-edit';
import { SHARED_UI_MODULES } from '../../global/ui-imports';
import { ModeEnum } from '../../enums/mode.enum';

@Component({
  selector: 'app-tasks',
  imports: [
    SHARED_UI_MODULES
  ],
  templateUrl: './tasks.html',
  styleUrl: './tasks.css',
})
export class Tasks {

  public page: number = 0;
  public pageSizeOptions: number[] = [5, 10, 20, 50, 100];
  public size: number = 10;
  public disabledNext: boolean = false;

  public selectedTasks: TasksResponse[] = [];
  public items: TasksResponse[] = [];
  public columns: any[] = [];
  public isLoading: boolean = false;

  public modeEnum = ModeEnum;

  @ViewChild('tasksEdit') tasksEdit!: TasksEdit;;

  constructor(
    private tasksService: TasksService
  ) {}

  ngOnInit(){

    this.getItems();
    this.getColumns();

  }

  getItems(showMore: boolean = false) {

    this.isLoading = true;

    if(showMore) {
      this.page++;
    } else {
      this.page = 0;
    }

    let data = {
      page: this.page,
      size: this.size
    }

    console.clear()

    this.tasksService.getMyTasks(data).subscribe({
      next: (response: PageResponse<TasksResponse>) => {
        
        console.log(response);

        if(showMore) {
          this.items = [...this.items, ...response.content];
        } else {
          this.items = response.content;
        }
        this.disabledNext = response.page.totalElements - ((this.page + 1) * this.size) <= 0;
      },
      error: (err) => {
        console.error('Error fetching tasks', err);
      },
      complete: () => {
        this.isLoading = false;
      }
      
      
    });

  }

  getColumns(){
    this.columns = this.tasksService.columns;
  }

  getSeverity(status: string) {
    switch(status) {
      case 'USER':
        return 'info';
      case 'COORDINATOR':
        return 'success';
      case 'ADMIN':
        return 'danger';
      default:
        return 'secondary';
    }
  }

  pageChange(event: any) {
    this.size = event.rows;
  }

  getFilterFromColumns(){
    return this.columns.map(col => col.field);
  }

  openEditTask(mode: ModeEnum = ModeEnum.VIEW, title: string = 'Nova Tarefa'){
    this.tasksEdit.title = title;
    this.tasksEdit.open(mode);
  }

}
