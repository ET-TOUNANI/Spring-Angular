import { Component , OnInit} from '@angular/core';
import { PageProduct, Product } from '../../model/product.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{

  products! : Array<Product>;
  errorMessage! : string;
  searchFormGroup!:FormGroup;
  currentPage:number=0;
  size:number=5;
  totalPages:number=0;

  constructor(private productService : ProductService,private fb:FormBuilder){
  }

  ngOnInit(){
    this.searchFormGroup = this.fb.group({
      keyword:this.fb.control(null)
    });
    this.handleGetPageProducts();
  }
  handleGetPageProducts(){
  this.productService.getPageProducts(this.currentPage,this.size).subscribe((data:PageProduct)=>{
       this.products=data.products;
       this.totalPages=data.totalPages;
       
    },
    Error => this.errorMessage = Error.message
    );
  }

  handleGetProducts(){
  this.productService.getProducts().subscribe((data:Product[])=>{
        this.products = data;
    },
    Error => this.errorMessage = Error.message
    );
  }
  handleDeleteProduct(p:Product){
    let conf=confirm("Are you sure you want to delete this product?");
    if(conf==false)return; 
    this.productService.deleteProduct(p.id).subscribe((data:boolean)=>{
      if(data)
      this.handleGetPageProducts();
    },
    Error => this.errorMessage = Error.message
    );
    /*
    let index = this.products.indexOf(p);
    this.products.splice(index,1);
    */
  }
  handlePromotionClick(p:Product){
      this.productService.promotionClick(p).subscribe((data:boolean)=>{
        if(data)
        this.handleGetPageProducts();
      });
  }

  handleSearchProducts(){
    this.productService.searchProducts(this.searchFormGroup.value.keyword,0,this.size).subscribe(
      (data:PageProduct)=>{
        this.products=data.products;
        this.totalPages=data.totalPages;
      },Error=>this.errorMessage=Error.message
    )
  }
  handleChangePage(index:number){
    this.currentPage=index;
    if(this.searchFormGroup.value.keyword!="")
      this.handleSearchProducts();
    else this.handleGetPageProducts();
  }
}
