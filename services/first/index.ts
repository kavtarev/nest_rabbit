import { GetRandom } from '@nest_rabbit/common';

class Second {
  random() {
    return GetRandom();
  }
}

const first = new Second();

console.log(first.random().random);
