import { Injectable } from '@angular/core';
import { Marque, Pays } from './model/marque.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Image } from './model/Image.model';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class MarqueService {
  [x: string]: any;
  apiURL: string = 'http://localhost:8080/marques/api';
  apiURLPay: string = 'http://localhost:8080/marques/pay';

  constructor(private http: HttpClient,private authService : AuthService) {}

  listeMarques(): Observable<Marque[]> {
   
      let jwt = this.authService.getToken();
      jwt = "Bearer "+jwt;
      let httpHeaders = new HttpHeaders({"Authorization":jwt})
    return this.http.get<Marque[]>(this.apiURL+"/all",{headers:httpHeaders});
  }

  ajouterMarque(marque: Marque): Observable<Marque> {
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
    return this.http.post<Marque>(this.apiURL+"/addmar",marque,{headers:httpHeaders});
    
  }

  supprimerMarque(id: number): Observable<any> {
    const url = `${this.apiURL}/delmar/${id}`;
    let jwt = this.authService.getToken();
        jwt = "Bearer "+jwt;
        let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
    return this.http.delete(url, {headers:httpHeaders});
  }

  consulterMarque(id: number): Observable<Marque> {
    const url = `${this.apiURL}/getbyid/${id}`;
    console.log(url);
          let jwt = this.authService.getToken();
          jwt = "Bearer "+jwt;
          let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
    return this.http.get<Marque>(url,{headers:httpHeaders} );
  }

  trierMarquesNomsPrix(): Observable<Marque[]> {
    const url = `${this.apiURL}/trierMarquesNomsPrix`;
    return this.http.get<Marque[]>(url);
  }
  listePays():Observable<Pays[]>{
    return this.http.get<Pays[]>(this.apiURL+"/pay");
    }
    updateMarque(marque :Marque) : Observable<Marque>
    {
      let jwt = this.authService.getToken();
      jwt = "Bearer "+jwt;
      let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
        return this.http.put<Marque>(this.apiURL+"/updatemar", marque,{headers:httpHeaders});
    }
    rechercherParPays(idPays: number):Observable< Marque[]> {
      const url = `${this.apiURL}/marquespays/${idPays}`;
      return this.http.get<Marque[]>(url);
      }
      rechercherParNom(nom: string):Observable< Marque[]> {
        const url = `${this.apiURL}/marByName/${nom}`;
        return this.http.get<Marque[]>(url);
        }
      
    ajouterPay( cat: Pays):Observable<Pays>{
      let jwt = this.authService.getToken();
      jwt = "Bearer "+jwt;
      let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
      
      return this.http.post<Pays>(this.apiURLPay, cat, {headers:httpHeaders});
     }

     supprimerPay(id : number) {
      let jwt = this.authService.getToken();
      jwt = "Bearer "+jwt;
      let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
      const url = `${this.apiURLPay}/${id}`;
      return this.http.delete(url, {headers:httpHeaders});
      } 
      uploadImage(file: File, filename: string): Observable<Image>{
const imageFormData = new FormData();
imageFormData.append('image', file, filename);
const url = `${this.apiURL + '/image/upload'}`;
return this.http.post<Image>(url, imageFormData);
}
loadImage(id: number): Observable<Image> {
const url = `${this. apiURL +'/image/get/info'}/${id}`;
return this.http.get<Image>(url);
}


uploadImageMar(file: File, filename: string, idProd:number): Observable<any>{
  const imageFormData = new FormData();
  imageFormData.append('image', file, filename);
  const url = `${this.apiURL + '/image/uplaodImageMar'}/${idProd}`;
  return this.http.post(url, imageFormData);
  }
  supprimerImage(id : number) {
    const url = `${this.apiURL}/image/delete/${id}`;
    return this.http.delete(url, httpOptions);
    }
    
   
}
