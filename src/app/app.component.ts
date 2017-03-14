import {Component} from '@angular/core';
import {AngularFire, FirebaseListObservable} from "angularfire2";
import {forEach} from "@angular/router/src/utils/collection";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  items: FirebaseListObservable<any[]>;
  itemValues: FirebaseListObservable<any[]>;
  result: string = '';
  resultNumber: number = 0;
  resList = [];

  constructor(af: AngularFire) {
    this.itemValues = af.database.list('/items', {preserveSnapshot: true});
    this.items = af.database.list('/items');
    this.resultNumber=0;

    this.itemValues.subscribe(snapshots => {
      this.result = '';
      this.resultNumber=0;
      let lastTypeNumber=true;
      let lastNumber='';


      snapshots.forEach(snapshot => {
        // console.log(snapshot.val())

        // this.result = this.result + snapshot.val()
        // this.resultNumber =  this.resultNumber + Number(snapshot.val());

        debugger;
        var current = Number(snapshot.val());

        // console.log(current);
        if (!isNaN(current) && lastTypeNumber==false) {
          lastTypeNumber=true;
          this.resultNumber=this.resultNumber+current;
        }
        else if (!isNaN(current) && lastTypeNumber==true) {
          lastTypeNumber=true;
          lastNumber=lastNumber+current;
        }
        else if (isNaN(current)) {
          lastTypeNumber=false;
          this.resultNumber= this.resultNumber+Number(lastNumber);
          lastNumber='';
        }
        // console.log("last number:");
        // console.log(lastNumber);
        // console.log("last type:");
        // console.log(lastTypeNumber);


        this.resList.push(Number(snapshot.val()));

      });
    })
  }

  pushItem(str) {
    this.items.push(str);
  }

  clearList() {
    this.items.remove().then(_ => console.log('deleted!'));
  }

  showResult(str) {
    // let res = 0 ;
    // let numbers = [1, 2, 3];
    // for (let num of numbers) {
    //   res=res+num;
    // }
    var res = this.resultNumber;
    this.items.remove().then(_ => console.log('deleted!'));
    this.items.push(res);
    console.log(this.resultNumber);

    // Number('1234')

   // console.log(this.result)
    // this.items.forEach(item => {
    //   console.log('Item:', item);
    // });
  }

  title = 'app works!';
}
