
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, combineLatest, debounceTime, delay, distinctUntilChanged, map, of, startWith, switchMap } from 'rxjs';

import { IProduct } from './../model/product.model';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private searchTerm = new Subject<string>();
  private data$: Observable<any[]> = new Observable<any[]>;
  private apiUrl = 'https://66484d642bb946cf2fa01f73.mockapi.io/product';

  constructor(private http: HttpClient) {
    this.data$ = this.getProducts();
  }

  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.apiUrl);
  }

  getProductById(id: number): Observable<IProduct> {
    return this.http.get<IProduct>(`${this.apiUrl}/${id}`);
  }

  createProduct(product: IProduct): Observable<IProduct> {
    return this.http.post<IProduct>(this.apiUrl, product);
  }

  updateProduct(product: IProduct): Observable<IProduct> {
    return this.http.put<IProduct>(`${this.apiUrl}/${product.id}`, product);
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  
  search(term: string): void {
    this.searchTerm.next(term);
  }
  getFilteredData(): Observable<any[]> {
    return combineLatest([this.data$, this.searchTerm.pipe(
      startWith(''),
      debounceTime(300),
      distinctUntilChanged()
    )]).pipe(
      map(([data, term]) => data.filter(item => item.name.toLowerCase().includes(term.toLowerCase())))
    );
  }
}
