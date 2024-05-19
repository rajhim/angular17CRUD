import { Component, EventEmitter, Output } from '@angular/core';
import { Observable, Subject, debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs';
import { ProductService } from '../../services/product.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IProduct } from '../../model/product.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  @Output() searchTerm = new EventEmitter<string>();
  constructor(private service: ProductService) {
   
  }

  ngOnInit(): void {
  
  }
  
  search(event: any): void {
    const term = event?.target?.value;
    this.service.search(term);
  }
}
