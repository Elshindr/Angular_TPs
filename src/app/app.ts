import { Square } from '../app/models/square';
import './app.scss';

export class App {
  static run() {
    const inputColor = document.querySelector('[type=color]') as HTMLInputElement;
    console.log(inputColor);
    const inputSize = document.querySelector('[type=range]') as HTMLInputElement;
    const btSubmit = document.querySelector('button');

    btSubmit.addEventListener('click', () => {
      console.log(inputColor);
      new Square(+inputSize.value, inputColor.value).render();
    });
  }
}