import { Component, OnInit } from '@angular/core';
import { Product } from '../../model/product';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrl: './view-product.component.css'
})
export class ViewProductComponent implements OnInit{

  constructor(private ps:ProductService, private router:Router) {}

  viewProduct:Product[];

  ngOnInit(): void {
    this.ps.getProduct().subscribe((data:Product[])=>{
      this.viewProduct=data;
    })
  }

  onEdit(pro:Product)
  {
    let Projson:string = JSON.stringify(pro);
    this.router.navigateByUrl('/inventory/edit/'+Projson);
  }

  onDelete(id:number)
  {
    this.ps.deleteProduct(id).subscribe();
    window.location.reload();
  }
}
