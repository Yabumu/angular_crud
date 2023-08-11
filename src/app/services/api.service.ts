import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // 11inject httpclient for http call
  constructor(private http : HttpClient) { }
  //12post the any data
postEmployee(data :any){
  return this.http.post<any>("http://localhost:3000/employeeList/", data);
}
//13get all the employee list
getEmployee(){
  return this.http.get<any>("http://localhost:3000/employeeList/");
}
putEmpoyee(data: any, id:number){
  return this.http.put<any>("http://localhost:3000/employeeList/"+id, data);
}
deleteEmployee (id: number){
  return this.http.delete<any>("http://localhost:3000/employeeList/"+id);
}
}

//14next inject the Api service in the dialog 
