import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogModule} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { ApiService } from './services/api.service';
import {AfterViewInit, } from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  
})
export class AppComponent implements OnInit  {
  title = 'angular_crud';


  displayedColumns: string[] = ['Fullname', 'phone', 'email', 'company', 'department', 'employee', 'salary', 'date', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  

   constructor (private dialog: MatDialog, private api : ApiService) {
    
   }
   ngOnInit() : void{
    this.getAllEmployee();        //ie oninit method
   }

   //1below openes the dialog and give it 30% width
   //2next generate a component with a name of dialog
   //3to use it we have to inject it in the constractor
  openDialog() {
    this.dialog.open(DialogComponent, {
      width:'30%'
    }).afterClosed().subscribe(val=>{
      if (val === 'save'){
        this.getAllEmployee
      }
    })
  }

  // inject the api first in the constractor and get the data with below function
  getAllEmployee(){
    this.api.getEmployee()
    .subscribe({
      next:(res)=>{
        //console.log(res)     //=======> call this inside ngOnInit ie implment OnInit on the export class
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        
      },
      error:(err)=>{
        alert("error") 
      }
    })

  }
  editEmployee( row : any){
    this.dialog.open(DialogComponent,{
      width :'30%',
      data : row
    }).afterClosed().subscribe(val =>{
      if(val === 'update'){
        this.getAllEmployee();
      }

    })
  }
  deleteEmployee(id : number){
    this.api.deleteEmployee(id)
    .subscribe({
      next:(res) =>{
        alert('Deleted Succesfully');
        this.getAllEmployee()

      },
      error:()=>{
        alert('error occured while deleting the record')
      }
      

    })

  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
}
