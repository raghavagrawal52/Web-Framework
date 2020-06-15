import { User, UserProps } from '../models/User';
import { Component } from './Component';

export class UserForm extends Component<User, UserProps> {
  eventsMap(): { [key: string]: () => void } {
    return {
      'click:.set-age': this.setRandomAgeOnClick, // This adds a event handler to a particular class name in an element
      'click:.set-name': this.setNameOnInput,
      'click:.save-model': this.saveModelOnClick,
    };
  }

  saveModelOnClick = (): void => {
    this.model.save();
  };
  setNameOnInput = (): void => {
    const input = this.parent.querySelector('input');
    if (input) {
      const name = input.value;
      this.model.set({ name });
    }
  };
  setRandomAgeOnClick = (): void => {
    this.model.setRandomAge();
  };

  template(): string {
    return `
    <div>
      <input placeholder=${this.model.get('name')} />
      <button class='set-name'>Update Name</button>
      <button class='set-age'>Random Age</button>
      <button class='save-model'>Save</button>
    </div>
    `;
  }
}
