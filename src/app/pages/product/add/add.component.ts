
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

//Interface
import { IProduct } from './../../../model/product.model';

//Services
import { ProductService } from '../../../services/product.service';
import { SharedModule } from '../../../shared/shared.module';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './add.component.html',
  styleUrl: './add.component.scss'
})
export class ProductAddComponent {
  productForm: FormGroup;
  productId: number;
  loader: Boolean = false;
  constructor(
    private fb: FormBuilder,
    private service: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {
    
    this.productForm = this.fb.group({
      id: [0],
      name: ['', Validators.required],
      description: ['', [Validators.required]],
      price: [0, [Validators.required]],
    });
    // get route `id`
    this.productId = +this.route.snapshot.paramMap.get('id')!;
    if(this.productId){
      this.loader = true;
      this.service.getProductById(this.productId).subscribe((data: IProduct)=>{
        this.loader = false;
        this.productForm = this.fb.group({
          id: [{ value: data?.id, disabled: true }, Validators.required,],
          name: [data?.name, Validators.required],
          description: [data?.description, [Validators.required]],
          price: [data?.price, [Validators.required]],
        });
      },er => {
        this.loader = false;
      })
      
    }
   
  }

  onSubmit(): void {
   
    if (this.productForm.valid) {
      alert("s")
      const product: IProduct = this.productForm.value;
      if(this.productId){
      this.service.updateProduct(product).subscribe(data=>{
        this.router.navigate(['/products']);
        this.toastr.success('Success', 'Updated Successfully');
      }, err=> {
        this.toastr.error( 'Error ');
      })
    }else{
      this.service.createProduct(product).subscribe(data=>{
        this.router.navigate(['/products']);
        this.toastr.success('Success', 'Added Successfully');
      }, err=> {
        this.toastr.error( 'Error ');
      })
    }
    }else{
      this.productForm.markAllAsTouched();
    }
  }
}
