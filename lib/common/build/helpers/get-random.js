"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetRandom = void 0;
const crypto_1 = require("crypto");
function GetRandom() {
    return { random: (0, crypto_1.randomUUID)() };
}
exports.GetRandom = GetRandom;
