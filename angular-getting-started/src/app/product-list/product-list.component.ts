import { Component, OnInit } from '@angular/core';
import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {


  pageTitle: string = "Product List";
  products: IProduct[] = [];

  imageWidth: number = 50;
  imageMargin: number = 2;
  showImage: boolean = false;

  _listFilter: string = '';
  errorMessage: any;

  get listFilter(): string {
    return this._listFilter;
  }

  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredProducts = this._listFilter ? this.performFilter(this.listFilter) : this.products;
  }

  filteredProducts: IProduct[];
  constructor(private _productService: ProductService) { 
  }

  ngOnInit() {
    this._productService.getProducts().subscribe(
      products => {
        this.products = products;
        this.filteredProducts = this.products;
      },
      error => this.errorMessage = <any>error
    );
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }
 
  performFilter(listFilter: string): IProduct[] {
    listFilter = listFilter.toLocaleLowerCase();
    return this.products.filter((product: IProduct) =>
      product.productName.toLocaleLowerCase().indexOf(listFilter) != -1);
  }

  OnRatingClicked(message: string): void{
      this.pageTitle = message;
  }
}
