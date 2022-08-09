type OperationsObj = {
  [key: string]: (a: number, b: number) => number;
};

export default {
  sum: (a: number, b: number) => a + b,
  sub: (a: number, b: number) => a - b,
  mul: (a: number, b: number) => a * b,
  div: (a: number, b: number) => a / b,
} as OperationsObj;
