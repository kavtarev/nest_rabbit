import { SumOfTwo } from '@nest_rabbit/common';

class First {
  sum(a: number, b: number) {
    return SumOfTwo(a, b);
  }
}

const first = new First();

console.log(first.sum(1, 56));
