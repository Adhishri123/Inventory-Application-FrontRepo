import { Supplier } from "./supplier";

export class Product {
    productId:number;
    productName:string;
    productPrice:number;
    productColor:string;
    availableQuantity:number;
    supplier:Supplier;
}
