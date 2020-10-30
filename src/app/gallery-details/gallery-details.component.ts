import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { Gallery } from '../gallery';

@Component({
  selector: 'app-gallery-details',
  templateUrl: './gallery-details.component.html',
  styleUrls: ['./gallery-details.component.scss']
})
export class GalleryDetailsComponent implements OnInit {
  //Variables para mostrar por pantalla los detalles de galery
  gallery: Gallery = { _id: '', imageUrl: '', imageTitle: '', imageDesc: '', uploaded: null };
  isLoadingResults = true;
  constructor(
    private route: ActivatedRoute, //decirle la ruta que corresponda
    private api: ApiService //hacer la peticion get
  ) { }

  ngOnInit(): void {
    this.getGalleryDetails(this.route.snapshot.paramMap.get('id')); //el objeto ruta, tienee snapshot que es la ruta actual y
                                                                    //me coge el objeto que es gallery id.
  }

  getGalleryDetails(id: string): void {
    this.api.getGalleryById(id) //llama al servicio, cuando le paso el id me devuelve un json
      .subscribe((data: any) => { //any es object en java
        this.gallery = data; //lo metemos en la variable
        console.log(this.gallery); //lo pinto con console log.
        this.isLoadingResults = false;
      });
  }


}
