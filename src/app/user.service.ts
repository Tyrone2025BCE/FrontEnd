import { forumPostUsuario ,forumPost} from './app';
import { environment } from '../environments/environment.development';
import { Injectable ,inject} from '@angular/core';
import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  [x: string]: any;

  status:string="";
    errorMessage:string="";


 private readonly apiUrl = environment.api;
 private readonly apiUrlGetAllUser = environment.apiGetAllUser;
 private readonly apiUrlCreateUser = environment.apiCreateUser;
 private readonly apiDeleteUserById = environment.apiDeleteUserById;
 private readonly apiUpdateUser= environment.apiUpdateUser;
  private http=inject(HttpClient);
 private jsonHeaders = new HttpHeaders({'Content-Type':'application/json'});

 
 getForums():Observable<forumPostUsuario[]>{
    return this.http.get<forumPostUsuario[]>(this.apiUrl,{
      headers:this.jsonHeaders
    })
    
  }

getForumUsers():Observable<forumPostUsuario[]>{
    return this.http.get<forumPostUsuario[]>(this.apiUrlGetAllUser,{
      headers:this.jsonHeaders
    })
    
  }


  addForum(forum:forumPostUsuario):Observable<forumPostUsuario>{
     return this.http.post<forumPostUsuario>(`${this.apiUrl}`,forum,{
      headers:this.jsonHeaders
     });
  }

 addForumUser(forumUser:forumPostUsuario):Observable<forumPostUsuario>{
     return this.http.post<forumPostUsuario>(`${this.apiUrlCreateUser}`,forumUser,{
      headers:this.jsonHeaders
     });
  }

   /*updateUser(forumUser:forumPostUsuario){
        console.log("Inicia actualizacion ");
         this.http.put<void>(`${this.apiUpdateUser}`,forumUser).subscribe({
                next: data => {
                       this.status = 'Actualización correcta';
                },
                error: error => {
                    this.errorMessage = error.message;
                    console.error('Error! en actualizar', error);
                }
                  
            });
            
  }*/

      updateUser(forumUser: forumPostUsuario): Observable<any> {
  console.log("Inicia actualización");
  return this.http.put(`${this.apiUpdateUser}`, forumUser);
}
      

  updateForum(forum: forumPostUsuario):Observable<forumPostUsuario>{
        return this.http.put<forumPostUsuario>(`${this.apiUpdateUser}`,forum,{
      headers:this.jsonHeaders
     });
  }

  /*
  deleteForumUser(forumUser:forumPostUsuario){
     console.log("Inicia borrado ");
     this.http.delete<void>(`${this.apiDeleteUserById}/${forumUser.id}`).subscribe({
                next: data => {
                    this.status = 'Delete successful';
                },
                error: error => {
                    this.errorMessage = error.message;
                    console.error('There was an error!', error);
                }
            });
  }
*/

deleteForumUser(forumUser: forumPostUsuario): Observable<any> {
  console.log("Inicia borrado");
  return this.http.delete(`${this.apiDeleteUserById}/${forumUser.id}`);
}


}





