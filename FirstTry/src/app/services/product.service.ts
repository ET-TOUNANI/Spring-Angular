import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { PageProduct, Product } from '../model/product.model';
import { UUID } from 'angular2-uuid';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  products! :Array<Product>;

  constructor() { 
    this.products = [
      { id:UUID.UUID(),name: 'Phone XL', price: 799, description: 'A large phone with one of the best screens' ,promotion:true},
      { id:UUID.UUID(),name: 'Phone Mini', price: 699, description: 'A great phone with one of the best cameras' ,promotion:false},
      { id:UUID.UUID(),name: 'Phone Standard', price: 299, description: 'A great phone with big battries',promotion:true},
    ];
    for(let i=0;i<10;i++){
      this.products.push({ id:UUID.UUID(),name: 'Phone XL'+i, price: 799*(i+1), description: 'A large phone with one of the best screens'+i ,promotion:true})
    }
  }

  
  public getPageProducts(page:number,size:number):Observable<PageProduct>{
    let index=page*size;
    let totalPage=~~this.products.length/size;
    if(this.products.length%size!=0)
      totalPage++;
    let pageProduct=this.products.slice(index,index+size);
    return of({page:page,size:size,totalPages:totalPage,products:pageProduct})
  } 
  public getProducts():Observable<Product[]>{
    let rnd=Math.random();
    if(rnd<0.1)
    return throwError(()=>new Error("internal server error"));
    else
    return of(this.products);
  }
  public deleteProduct(id:string):Observable<boolean>{
    this.products=this.products.filter(p=>p.id!=id);
    return of(true);
  }
  public promotionClick(p:Product):Observable<boolean>{
   this.products.find(pr=>pr.id==p.id)!.promotion=!p.promotion;
   // this.products=this.products.filter(p=>p.id!=id);
    return of(true);
  }
  searchProducts(keyword: string):Observable<Product[]> {
    let products=this.products.filter(pr=>pr.name.includes(keyword));
    return of(products);
  }
}
