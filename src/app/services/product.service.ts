import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }

  saveProduct(product:Product)
  {
    return this.http.post('http://localhost:9090/save_product',product);
  }
  getProduct()
  {
    return this.http.get('http://localhost:9090/get_product');
  }
  updateProduct(pro:Product)
  {
    return this.http.put('http://localhost:9090/edit_product/'+pro.productId,pro);
  }
  deleteProduct(id:number)
  {
    return this.http.delete('http://localhost:9090/delete_product/'+id);
  }
}
