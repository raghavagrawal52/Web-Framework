import { User, UserProps } from '../models/User';
import { Component } from './Component';

export class UserShow extends Component<User, UserProps> {
  template() {
    return `
      <h1>User Detail</h1>
      <div>User Name: ${this.model.get('name')}</div>
      <div>User Age: ${this.model.get('age')}</div>
    `;
  }
}
