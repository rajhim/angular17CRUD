import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
// model
import { IProduct } from '../../../model/product.model';
// services
import { ProductService } from '../../../services/product.service';
// shared module
import { SharedModule } from '../../../shared/shared.module';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationModalComponent } from '../../../components/modal/modal.component';


@Component({
  selector: 'app-list',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ProductListComponent {
  filteredData$: Observable<IProduct[]> = new Observable<IProduct[]>;
  loader: Boolean = false;
  cardView = 1;
  constructor(private service: ProductService, private modalService: NgbModal) {
    
  }

  ngOnInit(): void {
    this.filteredData$ = this.service.getFilteredData();
  }
  confirmation(id: number){
    const modalRef = this.modalService.open(ConfirmationModalComponent);
    modalRef.componentInstance.title = 'Confirmation';
    modalRef.componentInstance.message = 'Are you sure you want to proceed?';

    modalRef.result.then((result) => {
      if (result === 'confirm') {
        this.service.deleteProduct(id).subscribe(data=>{
          this.filteredData$ = this.service.getFilteredData();
        })
      } else {
      
      }
    }).catch((error) => {
 
    });
  }
}
