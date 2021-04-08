import { Component } from '@angular/core';


import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

interface AppStore {
  message: string,
  photos: Array<any>
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  message$: Observable<string>;

  constructor(private store: Store<AppStore>){
   this.message$ = this.store.select('message');
  }

  spanishMessage() {
    this.store.dispatch({type: 'SPANISH'})
  }

  frechMessage() {
    this.store.dispatch({type: 'FRENCH'});
  }



}
