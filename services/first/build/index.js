"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nest_rabbit/common");
class Second {
    random() {
        return (0, common_1.GetRandom)();
    }
}
const first = new Second();
console.log(first.random().random);
