declare module 'roll-a-die' {
  export default function rollADie(
    params: {
      element: Element,
      numberOfDice: number,
      callback: (values: number[]) => void,
      values?: number[],
      delay?: number
    }
  ): void;
}
