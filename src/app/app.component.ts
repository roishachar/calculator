import {Component} from '@angular/core';
import {AngularFire, FirebaseListObservable} from "angularfire2";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  items: FirebaseListObservable<any[]>;
  itemValues: FirebaseListObservable<any[]>;

  resList = [];

  constructor(af: AngularFire) {
    this.itemValues = af.database.list('/items', {preserveSnapshot: true});
    this.items = af.database.list('/items');

    this.itemValues.subscribe(snapshots => {
      this.resList = [];
      snapshots.forEach(snapshot => {
        this.resList.push(snapshot.val());
      });
    })
  }

  pushItem(str) {
    this.items.push(str);
  }

  clearList() {
    this.items.remove().then(_ => console.log('deleted!'));
  }

  getFixedList() {
    var fixedlist = [];
    var lastNumber = '';
    for (let res of this.resList) {
      var current = Number(res);
      if (!isNaN(current)) { //number
        lastNumber = lastNumber + current;
      }
      else { //operator
        fixedlist.push(lastNumber);
        fixedlist.push(res);
        lastNumber = '';
      }
    }
    fixedlist.push(lastNumber);
    return fixedlist;
  }


  showResult(str) {
    var list = this.getFixedList();
    var position = 1;
    var left = 0;
    var right = 0;
    var lastOperand = '+';

    for (let res of list) {
      var current = Number(res);
      if (!isNaN(current)) { //number
        if (position == 1) {
          left = current;
          position = 2;
        }
        else {
          right = current;

          switch (lastOperand) {
            case'+':
              left = left + right;
              break;
            case'-':
              left = left - right;
              break;
            case'x':
              left = left * right;
              break;
            case'÷':
              left = left / right;
              break;
            default:
              left = left + right;
          }
        }

      }
      else { // operator
        lastOperand = res;
      }
    }
    this.items.remove().then(_ => console.log('deleted!'));
    this.items.push(left);
  }

}
