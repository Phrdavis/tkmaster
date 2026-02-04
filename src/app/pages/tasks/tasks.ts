import { Component } from '@angular/core';
import { TasksService } from './tasks.service';
import { TasksResponse } from './tasks.interface';
import { PageResponse } from '../../interfaces/paginable.model';
import { Table, TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { SkeletonModule } from 'primeng/skeleton';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { TruncatePipe } from "../../core/pipes/pipe.limiteTo";

@Component({
  selector: 'app-tasks',
  imports: [
    TableModule,
    ButtonModule,
    TagModule,
    SkeletonModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    TruncatePipe
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
        return 'info';
    }
  }

  pageChange(event: any) {
    this.size = event.rows;
  }

  getFilterFromColumns(){
    return this.columns.map(col => col.field);
  }

}
