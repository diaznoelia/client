import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Gallery } from './gallery';
import { catchError } from 'rxjs/operators';

const apiUrl = 'http://localhost:3000/gallery';

@Injectable({ //DI : inyeccion de dependencias
  providedIn: 'root'
})
//para meter los metodos para gestionar las peticiones que voy a hacer.
export class ApiService {
//zona de variables globales.

  constructor(private http: HttpClient) { 

  } //cierra el constructor

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }//cierra la funcion handleError

  getGalleryById(id: string): Observable<any> { //coger el id que hemos puesto en laa ruta y me va a devolver lo que 
                                                //hemos puesto en una ruta
    const url = `${apiUrl}/${id}`;
    return this.http.get<Gallery>(url).pipe( //esto es lo que hace la peticion. Coge lo pedido en la url de galeria. Si
                                             //va ok, muestra el dato pedido, sino da un mensaje de error.
      catchError(this.handleError)
    );
  }//cierra funcion del get

  addGallery(gallery: Gallery, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('imageTitle', gallery.imageTitle);
    formData.append('imageDesc', gallery.imageDesc);
    const header = new HttpHeaders();
    const params = new HttpParams();

    const options = {
      params,
      reportProgress: true,
      headers: header
    };
    const req = new HttpRequest('POST', apiUrl, formData, options);
    return this.http.request(req);
  }
}//cierra clase ApiService
