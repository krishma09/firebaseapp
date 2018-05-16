import { Component, OnInit } from '@angular/core';
import { Product } from './product';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponent implements OnInit {


arr:Product[]=[];
ProductCollection:AngularFirestoreCollection<Product>;
Products:Observable<Product[]>;
ProductDocument:AngularFirestoreDocument<Product>

  constructor(private _afs:AngularFirestore) { 

this.ProductCollection = this._afs.collection('Product');


this.Products = this._afs.collection('Product').snapshotChanges().map(
 
changes => {
 
return changes.map(
 
a => {
 
const data = a.payload.doc.data() as Product;
 
data.pid = a.payload.doc.id;
 
return data;
 
});
});

  }
/*no1:number;
no2:number;
total:number;                         add
onClick()
{
  this.total=this.no1+this.no2;
}
pid:string;
pname:string;
pprice:number;
pimg:string;
soh:number;

arr:Product[]=[
new Product('1','omega',10000,'img1',5),
new Product('2','titan',2000,'img2',10),
new Product('3','timex',1000,'img3',25),
new Product('4','rolex',100000,'img4',7)
];

onDelete(item:Product)
{
this.arr.splice(this.arr.indexOf(item),1);
}

onAdd()
{
  this.arr.push(new Product(this.pid,this.pname,this.pprice,this.pimg,this.soh));
}*/

  ngOnInit() {

    this.Products.subscribe(
      (x:Product[])=>{
        this.arr=x;
      }
    )

}
}
