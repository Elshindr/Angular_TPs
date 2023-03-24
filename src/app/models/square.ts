import './square.scss';

export class Square {
  private static _id: number = 0;
  private squareId: number;

  constructor(
    private _size: number,
    private _color: string = 'gray',
  ) {
    this.squareId = ++Square._id;
  }

  public render() {
    const div = document.createElement('div');
    div.id = `square-${this.squareId}`;
    div.setAttribute('style', `
      width: ${this._size}px;
      height: ${this._size}px;
      background: ${this._color};
    `);
    document
      .querySelector('#mySquares')
      .appendChild(div);
  }
}