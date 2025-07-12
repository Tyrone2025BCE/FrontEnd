import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { forumPost  } from './app';

@Injectable({
  providedIn: 'root'
})
export class ForumService {
private readonly apiUrl = environment.api //Obtiene el dato del enviromento
  private http = inject(HttpClient);
  private jsonHeader = new HttpHeaders({'Contect-Type':'application/json'});
  //constructor() { }

  getForums():Observable<forumPost[]>{
    return this.http.get<forumPost[]>(this.apiUrl,{
      headers:this.jsonHeader
    });
    

    
    /*.pipe(
      map((raw) => raw.reverse())
    );*/
  }

  addForum(forum:forumPost):Observable<forumPost>{
    return this.http.post<forumPost>(`${this.apiUrl}`, forum,{
      headers:this.jsonHeader
    });
  }

  updateForum(forum:forumPost):Observable<forumPost>{
    return this.http.put<forumPost>(`${this.apiUrl}/${forum.id}`,forum,{
      headers:this.jsonHeader
    });
  }

  

}
