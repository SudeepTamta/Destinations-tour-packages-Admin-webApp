import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UkToursModel } from '../models/uk-tours.model';
import { AddUkToursModel } from '../models/add-uk-tours.model';

@Injectable({
  providedIn: 'root'
})
export class UkToursService {
  url = `${environment?.baseUrl}`;
  constructor(
    private http: HttpClient,
  ) { }



  getAllUkTours(): Observable<UkToursModel[]> {
    return this.http.get<UkToursModel[]>(`${this.url}/UkTours`);
  }

  createUkTours(formData: AddUkToursModel): Observable<UkToursModel[]> {
    return this.http.post<UkToursModel[]>(`${this.url}/UkTours`, formData);
  }

  getUkTourById(id: string): Observable<UkToursModel[]> {
    return this.http.get<UkToursModel[]>(`${this.url}/UkTours/${id}`,)
  }

  updateUkTour(id: string, updateUkTour: AddUkToursModel): Observable<UkToursModel> {
    return this.http.put<UkToursModel>(`${this.url}/UkTours/${id}`, updateUkTour)
  }

  deleteUkTourById(id: string): Observable<UkToursModel> {
    return this.http.delete<UkToursModel>(`${this.url}/UkTours/${id}`)
  }
}
