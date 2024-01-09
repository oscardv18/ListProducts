import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsDataService {
  private apiUrl = 'https://ds.deepcompany.com/marketplace/product-demo?page=1';

  private headers = new HttpHeaders({
    Accept: 'application/json, text/plain, */*',
    'x-apikey-marketplace':
      'rIH99Wc_HcMlonQTugzKySx5J31O2XgFJsLVJS8m9tF-Zyr01SfiwmvQZFVuqErM8soJeGV-RCgdSMXpT_25wg',
  });

  constructor(private http: HttpClient) {}

  getData(): Observable<any> {
    return this.http.get(this.apiUrl, { headers: this.headers });
  }
}
