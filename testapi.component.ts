import { Component, OnInit } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
// import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/topromise';
import {Observable} from "rxjs/Rx";
import { ArrayJson } from '../arrayJson';

@Component({
  selector: 'app-testapi',
  templateUrl: './testapi.component.html',
  // template:'<h4>{{arrayJson}}</h4>',
  styleUrls: ['./testapi.component.css']
})
export class TestapiComponent implements OnInit {
  // arrayJson: ArrayJson;
  arr : ArrayJson[] = [];
  item: ArrayJson;
  private headers = new Headers({'Content-Type' : 'application/json'});
  // options: Options;
  constructor(private http:Http) {
    this.http.get("https://5b7f7c80af5e5600144d5e83.mockapi.io/testtable")
    .toPromise()
    // .then(res=>(res.json()))
    // .then(r=>r.json()) //tuong duong return x=y;
    .then(res=>{this.arr.push(res.json()); console.log(this.arr=res.json());})
   }
  selectedIndex = null;
  getNews() {
    return this.http.get('https://5b7f7c80af5e5600144d5e83.mockapi.io/testtable')
    .toPromise()
    .then(res=>{this.arr.push(res.json()); console.log(this.arr=res.json());});
  }
  adddetailapi(nm,lp,kh) {
    // this.item ={id: i, tensv: nm, lop: lp, khoa: kh};
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    // let body = JSON.stringify(this.item);
    return this.http.post('https://5b7f7c80af5e5600144d5e83.mockapi.io/testtable', JSON.stringify({tensv: nm, lop: lp, khoa: kh}), options ).subscribe(
      data => {
        // refresh the list
        this.getNews();
        return true;
      });
  }
  showid: string; 
  showtensv: string; 
  showlop: string; 
  showkhoa: string;
  showdetailapi(item){
    // alert("arr:"+ this.arr);
    // alert("arrayJson:"+this.arrayJson);
    this.selectedIndex=item;
    // alert(this.arr[item].id);
    this.showid = this.arr[item].id;
    this.showtensv = this.arr[item].tensv;
    this.showlop = this.arr[item].lop;
    this.showkhoa = this.arr[item].khoa;
  }
  editdetailapi(nm,lp,kh){
    this.item ={id: this.arr[this.selectedIndex].id, tensv: nm, lop: lp, khoa: kh};
    this.http.put("https://5b7f7c80af5e5600144d5e83.mockapi.io/testtable/"+this.arr[this.selectedIndex].id,JSON.stringify(this.item),{ headers: this.headers })
    // .toPromise();
    // this.arr.splice(this.selectedIndex,1,this.item);
    .subscribe(
      data => {
        // refresh the list
        this.getNews();
        return true;
      });
  }
  removedetailapi(){
    // alert(this.arr[this.selectedIndex].id);
    this.http.delete("https://5b7f7c80af5e5600144d5e83.mockapi.io/testtable/"+this.arr[this.selectedIndex].id)
    // .toPromise();
    // this.arr.splice(this.selectedIndex,1);
    .subscribe(
      data => {
        // refresh the list
        this.getNews();
        return true;
      });
  }
  ngOnInit(){}
  // ngOnInit(): void {
  //   this.http.get('https://5b7f7c80af5e5600144d5e83.mockapi.io/testtable')
  //   .subscribe(data => { this.arr.push(JSON.parse(JSON.stringify(data))); console.log(this.arr= JSON.parse(JSON.stringify(data)))
  //   });
  // }
}
