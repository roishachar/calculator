import {Component} from '@angular/core';
import {AngularFire, FirebaseListObservable} from "angularfire2";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  items: FirebaseListObservable<any[]>;

  constructor(af: AngularFire) {
    this.items = af.database.list('/items');
  }

  pushItem(str)
  {
    this.items.push(str);
  }
  clearList()
  {
    this.items.remove().then(_ => console.log('deleted!'));
  }
  title = 'app works!';
}
