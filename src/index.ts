import './index.html';
import { startGame, Game } from 'gamedeck/lib/Game';
import { Scene } from 'gamedeck/lib/Scene';
import { Background } from 'gamedeck/lib/gobjects/Background';
import { Rectangle } from 'gamedeck/lib/gobjects/Rectangle';
import { GObject } from 'gamedeck/lib/GObject';
import { Vector2 } from 'gamedeck/lib/Utils';
import { Rectangle as RectAsset, Sprite } from 'gamedeck/lib/Assets';
import board from './sprites/board.jpg';
import greenPieces from './sprites/Spritesheets/piecesGreen.png';
import bluePieces from './sprites/Spritesheets/piecesBlue.png';
import redPieces from './sprites/Spritesheets/piecesRed.png';
import rollADie from 'roll-a-die';

class Main extends Scene {
  greenPieceLocation = new Vector2(100, 100);
  pieceLocations = [
    new Vector2(100, 100),
    new Vector2(100, 200),
    new Vector2(100, 300),
  ]
  movePiece = -1;
  moveOffset = new Vector2(0, 0);

  build(game: Game) {
    return new Background({
      color: '#eeeeee',
      children: [
        new Rectangle({
          width: game.canvasElement.width,
          height: game.canvasElement.height,
          color: 'white',
          x: 0,
          y: 0
        }),
        new Board({
          position: new Vector2(0, 0),
          locations: this.pieceLocations
        })
      ]
    })
  }

  update(game: Game) {
    if (game.canvasElement.width !== window.innerWidth) {
      game.canvasElement.width = window.innerWidth;
    }
    if (game.canvasElement.height !== window.innerHeight) {
      game.canvasElement.height = window.innerHeight;
    }

    for (let piece = 0; piece < 3; piece++) {
      const location = this.pieceLocations[piece];
      if (this.movePiece === piece) {
        const newPos = game.input.getMouseLocation();
        const change = newPos.add(this.moveOffset.invert());
        location.addM(change);
        this.movePiece = -1;
      }
      if (
        this.movePiece === -1 &&
        game.input.mouseIsDown() &&
        game.input.getMouseLocation().getX() >= location.getX() &&
        game.input.getMouseLocation().getX() <= location.getX() + 27 &&
        game.input.getMouseLocation().getY() >= location.getY() &&
        game.input.getMouseLocation().getY() <= location.getY() + 49
      ) {
        this.movePiece = piece;
        this.moveOffset = game.input.getMouseLocation();
      }
    }
  }
}

enum GamePieceColors {
  green,
  red,
  blue
}

class GamePiece extends GObject {
  constructor(props: {
    color: GamePieceColors,
    position: Vector2
  }) {
    super(props);
    if (props.color === GamePieceColors.green) {
      this.sprite = new Sprite(greenPieces, 27, 49, 19, 8, 27, 49);
    }
    if (props.color === GamePieceColors.red) {
      this.sprite = new Sprite(redPieces, 27, 49, 19, 8, 27, 49);
    }
    if (props.color === GamePieceColors.blue) {
      this.sprite = new Sprite(bluePieces, 27, 49, 19, 8, 27, 49);
    }
  }
}

class Board extends GObject {
  constructor(props: {
    position: Vector2,
    children?: GObject[],
    locations: Vector2[]
  }) {
    props.children = [
      new GamePiece({position: props.locations[2], color: GamePieceColors.red}),
      new GamePiece({position: props.locations[1], color: GamePieceColors.blue}),
      new GamePiece({position: props.locations[0], color: GamePieceColors.green}),
    ]
    super(props);
    this.sprite = new Sprite(board, 1287 / 1.2, 916 / 1.2, 0, 0, 1287, 916);
  }
}

const canvas = document.querySelector('canvas')!;
const dice = document.querySelector('#dice')!;
const wrapper = document.querySelector('#die-wrapper')!;

function roll() {
  rollADie({
    element: dice,
    numberOfDice: 1,
    callback: values => console.log(values),
    delay: 500000000
  })
}

wrapper.addEventListener('click', roll);

const game = startGame(new Main(), {canvas});
