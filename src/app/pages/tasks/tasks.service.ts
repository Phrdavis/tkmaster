import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { GlobalService } from "../../global/global.service";
import { PageResponse } from "../../interfaces/paginable.model";
import { TasksResponse } from "./tasks.interface";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  public columns: any[] = [
    { field: 'id', header: 'ID' },
    { field: 'title', header: 'Título' },
    { field: 'description', header: 'Descrição' },
    { field: 'ownerName', header: 'Responsável' },
    { field: 'ownerEmail', header: 'Email do Responsável' },
    { field: 'ownerRole', header: 'Função do Responsável' },
  ]

  constructor(
    private http: HttpClient,
    private globalService: GlobalService
  ) { }

  getMyTasks(data: any): Observable<PageResponse<TasksResponse>>{

    return this.http.get<PageResponse<TasksResponse>>(`/api/v1/tasks/myTasks`, {
      params: data 
    });

  }

}