import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { ToastrService } from "ngx-toastr";
import { environment } from "../../../environments/environment";
import { retry } from "rxjs/operators";
import { ColumnMode, SelectionType } from "@swimlane/ngx-datatable";
import { FormControl, FormGroup } from '@angular/forms';
import { fileTemplates } from 'src/app/shared/import-data/import-header';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.scss']
})
export class ImportComponent implements OnInit {
  
  importForm ?: FormGroup;

  isProcess : boolean = false;

  message : string = '';
 

  constructor( 
    readonly httpClient : HttpClient
  ){
  }


  fileTemplates : any;

  isLoading : boolean = false;
  ColumnMode = ColumnMode;
  SelectionType = SelectionType;    

  ngOnInit(): void {

      
      this.importForm = new FormGroup({
          inputFile : new FormControl(''),
      })
      

      this.fileTemplates = fileTemplates; 

 


      
  }

 

  inputFile : any;

  onFileChange(event : any) {

      if (event.target.files.length > 0) {
        const file = event.target.files[0];
          
        this.inputFile = file;
      
      }
    }


  async processUpload() {


      this.isProcess = true;
      this.message = '';

      // for (let index = 0; index < files.length; index++) {
          // const file = files[index];
          const params  : any = await this.createInput(this.inputFile);
          try{


              if(params.Data.length > 1) {

                  const res : any = await this.httpClient.post(`${environment.api.student}/process-upload`, params).toPromise()
                  if(res.errors == undefined){
                      // this.toastr.success('Success!', 'Uploading Completed', {timeOut:3000});
                  }else {
                      // this.toastr.warning('Warning!', 'Please fix all Issues on excel', {timeOut:3000});

                  }

                  this.message = JSON.stringify(res);
                  this.isProcess = false;

              }else {


                  // this.toastr.warning('Warning!', 'No Data in Excel, Please check the uploaded file and Re-upload it again!', {timeOut:3000});
                  this.isProcess = false;

              }

          }catch(err) {
              this.isProcess = false;
              // this.toastr.error('Failed!', JSON.stringify(err), {timeOut:3000});
          }

          
      // }


  }


  
  createInput(file : any) {


      let filenameValue = this.getFilenameValue(file.name);
      

         let promise = new Promise((resolve, reject) => {
            const reader = new FileReader()
              reader.onload = (e : any) => {

                  const bstr = e.target.result;
                  const wb = XLSX.read(bstr, { type: 'binary' })
                  const wsname = wb.SheetNames[0]
                  const ws = wb.Sheets[wsname]
                  const data = XLSX.utils.sheet_to_json(ws, { raw: false, defval: null, header: 1, blankrows : false })

                  console.log(data)
             
                  let args = {
                      Module : filenameValue,
                      Data : data,
                      Filename: file.name
                  }

                  resolve(args);

              }

 
              reader.readAsBinaryString(file)

          });

      return promise;
  }


  getFilenameValue(file_name : string) {
      let filename = file_name.split('-')[0];
      let filenameValue = null;
      filenameValue = this.fileTemplates.find((template : any) => { return template.filename.split('-')[0] == filename })

      if(filenameValue)
          return filenameValue.text;
      else
          return false;
  }


  downloadTemplate(template : any){
      let fileSheet = XLSX.utils.json_to_sheet(template.header);
      let wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, fileSheet, template.text)
      XLSX.writeFile(wb, template.filename)
  }
}
