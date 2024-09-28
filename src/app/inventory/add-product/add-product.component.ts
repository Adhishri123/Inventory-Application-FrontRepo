import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { __param } from 'tslib';
import { Product } from '../../model/product';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent implements OnInit{

constructor(private fb:FormBuilder, private ps:ProductService, private activerout:ActivatedRoute) {}

flag:boolean=false;

productForm:FormGroup;

ngOnInit(): void {
  this.productForm=this.fb.group(
    {
      productId:[0],
      productName:[],
      productPrice:[],
      productColor:[],
      availableQuantity:[],
      supplier:this.fb.group(
        {
          supplierId:[],
          supplierName:[],
          supplierEmail:[],
          supplierAddress:[],
          pincode:[],
        }
      )
    }
  )
  this.getEditData();
}

getEditData()
{
  this.activerout.paramMap.subscribe(
    param=>{
      let prjson:string = param.get('prod')
      if(prjson!=null)
      {
        let p:Product = JSON.parse(prjson);
        this.productForm.patchValue(p);
        this.flag=true;
      }
    }
  )
}

onSubmit()
{
  if(this.flag)
  {
    this.ps.updateProduct(this.productForm.value).subscribe();
    alert('Product Details updated successfully');
  }
  else
  {
    this.ps.saveProduct(this.productForm.value).subscribe(
      (data:any)=>{
        console.log(data)
        if(data!=null)
        {
          alert('Product Details added successfully');
        }
      },
      (error:any)=>{
        if(error.status==500)
        {
          alert('Product email is already used');
        }
      }
    );
    
  }
  window.location.reload();
}
}
