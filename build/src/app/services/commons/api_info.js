"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const package_json_1 = __importDefault(require("../../../../package.json"));
exports.default = () => {
    const data = {
        name: package_json_1.default.name,
        description: package_json_1.default.description,
        version: package_json_1.default.version,
    };
    return { success: true, data, error: null };
};
