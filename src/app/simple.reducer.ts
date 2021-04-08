import { Action } from '@ngrx/store';

export function simpleReducer(state, action: Action){
  console.log(action.type, state);

  switch(action.type) {
    case 'SPANISH':
      return state = "HOLA MUNDO";

    case 'FRENCH':
      return state = "Bonjor le monde";

    default:
      return state;
  }
}