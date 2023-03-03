"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nest_rabbit/common");
class First {
    sum(a, b) {
        return (0, common_1.SumOfTwo)(a, b);
    }
}
const first = new First();
console.log(first.sum(1, 56));
