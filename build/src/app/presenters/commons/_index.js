"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const api_root_1 = __importDefault(require("./api_root"));
const api_info_1 = __importDefault(require("./api_info"));
exports.default = {
    apiRoot: api_root_1.default,
    apiInfo: api_info_1.default,
};
