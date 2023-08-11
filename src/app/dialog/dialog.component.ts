import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import {MatDialogRef, MAT_DIALOG_DATA,} from '@angular/material/dialog'

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  
  employeeList =["Active Employee", "Candidate" ] 

  //4created a form
  employeeForm !: FormGroup;
  actionbtn : string ="save";

//5inject form builder in the constractor
//15 inject api service 

  constructor(private formBuilder : FormBuilder, private api: ApiService, @Inject(MAT_DIALOG_DATA) public editData : any,  private  dialogRef: MatDialogRef<DialogComponent> ) {}
  
  ngOnInit(): void {
    //6initialize our form in the next line 
    this.employeeForm=this.formBuilder.group ({
      Fullname : ['', Validators.required],
      email : ['', Validators.required],
      phone : ['', Validators.required],
      department : ['', Validators.required],
      employee : ['', Validators.required],
      company : ['', Validators.required],
      salary: [''],
      date : ['', Validators.required],

  })
  if(this.editData){
    this.actionbtn = "Update";
    this.employeeForm.controls['Fullname'].setValue(this.editData.Fullname);
    this.employeeForm.controls['phone'].setValue(this.editData.phone);
    this.employeeForm.controls['email'].setValue(this.editData.email);
    this.employeeForm.controls['company'].setValue(this.editData.company);
    this.employeeForm.controls['department'].setValue(this.editData.department);
    this.employeeForm.controls['employee'].setValue(this.editData.employee);
    this.employeeForm.controls['salary'].setValue(this.editData.salary);
    this.employeeForm.controls['date'].setValue(this.editData.date);
  }

 }

  //8when ever we save the form this method will be called
  //to check the binding console.log(this.employeeForm.value)
  //9if everything is binded successfuly=>store the value in the jason server
  //create the json server json-server --watch db.json
  //10 create Api service ng g s services/api
  addEmployee(){
    if(!this.editData){
      if(this.employeeForm.valid){
        this.api.postEmployee(this.employeeForm.value)
        .subscribe({
          next:(res)=>{
            alert('Added to list')
            this.employeeForm.reset();                  // this line resets the form
            this.dialogRef.close('save');               //import dialog ref(mat-dialog-ref) 1st then and inject it=>constractor
          },
          error:()=>{
            alert('Error while Adding ')
          }
          
          })
        }
    }else{
      this.updateEmployee()
    }
    }
    updateEmployee(){
      this.api.putEmpoyee(this.employeeForm.value, this.editData.id)
      .subscribe({
        next:(res)=>{
          alert('Added to list')
          this.employeeForm.reset();                  // this line resets the form
          this.dialogRef.close('update');               //import dialog ref(mat-dialog-ref) 1st then and inject it=>constractor
        },
        error:()=>{
          alert('Error while updating  ')
        }
        
        })
    }
}
