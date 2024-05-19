import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { SearchComponent } from '../components/search/search.component';
import { CurrencyFormatPipe } from './pipe/currency-format.pipe';
import { HighlightDirective } from './directive/highlight.directive';

const components: any = [SearchComponent];
const directives: any = [HighlightDirective];
const pipes: any = [CurrencyFormatPipe];
@NgModule({
  declarations: [...components, ...directives, ...pipes],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSkeletonLoaderModule,
  ],
  exports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSkeletonLoaderModule,
    ...components,
    ...directives,
    ...pipes,
  ],
})
export class SharedModule {}
