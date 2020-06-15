// This is a general File

import { Model } from '../models/Model';

export abstract class Component<T extends Model<K>, K> {
  regions: { [key: string]: Element } = {};

  constructor(public parent: Element, public model: T) {
    this.bindModel();
  }

  abstract template(): string;

  regionsMap(): { [key: string]: string } {
    return {};
  }

  eventsMap(): { [key: string]: () => void } {
    return {};
  }

  bindModel(): void {
    this.model.on('change', () => {
      this.render();
    });
  }

  bindEvents(fragment: DocumentFragment): void {
    const eventsMap = this.eventsMap();

    for (let eventKey in eventsMap) {
      // we split the string in eventsMap and destructure them
      const [eventName, selector] = eventKey.split(':');
      // we add a new event listener to the particular html element
      fragment.querySelectorAll(selector).forEach((element) => {
        element.addEventListener(eventName, eventsMap[eventKey]);
      });
    }
  }

  mapRegions(fragment: DocumentFragment): void {
    const regionsMap = this.regionsMap();

    for (let key in regionsMap) {
      const selector = regionsMap[key];
      const element = fragment.querySelector(selector);

      if (element) {
        this.regions[key] = element;
      }
    }
  }

  onRender(): void {}

  render(): void {
    this.parent.innerHTML = ''; // This empties the parent and then we can re-render
    const templateElement = document.createElement('template');
    templateElement.innerHTML = this.template();
    // This is used to enable event handlers in our html
    this.bindEvents(templateElement.content);
    // This is used to nest it to parent components
    this.mapRegions(templateElement.content);
    this.onRender();
    // this adds the snippet of html in the dom
    this.parent.append(templateElement.content);
  }
}
