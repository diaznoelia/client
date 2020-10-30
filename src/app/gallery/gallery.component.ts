import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }//cierra la funcion isErrorState
}//cierra clase

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  galleryForm: FormGroup; //Se declara el nombre de la variable : el tipo de dato que va a ser.
  imageFile: File = null;
  imageTitle = '';
  imageDesc = '';
  isLoadingResults = false;
  matcher = new MyErrorStateMatcher();

  constructor(
    private api: ApiService, //coger el servicio de api
    private formBuilder: FormBuilder, //gestionar formulario
    private router: Router) { //decirle donde tiene que ir
      
    }

  ngOnInit(): void {

    this.galleryForm = this.formBuilder.group({
      imageFile : [null, Validators.required],
      imageTitle : [null, Validators.required],
      imageDesc : [null, Validators.required]
    });

  }//gnOnInit seria no igual pero para hacernos una idea, al main de java

  onFormSubmit(): void {
    this.isLoadingResults = true; 
    this.api.addGallery(this.galleryForm.value, this.galleryForm.get('imageFile').value._files[0]) //objeto gallery (service) esta hecho en el servicio
                                                                                                   //le dices los datos que quieres llevarte (todos)(con value)
      .subscribe((res: any) => {
        this.isLoadingResults = false;
        if (res.body) {
          this.router.navigate(['/gallery-details', res.body._id]);
        }
      }, (err: any) => {
        console.log(err);
        this.isLoadingResults = false;
      });
  }

}
