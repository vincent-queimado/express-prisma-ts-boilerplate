"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const commons_1 = __importDefault(require("../app/controllers/commons"));
const logs_1 = __importDefault(require("../app/controllers/logs"));
const router = express_1.default.Router();
// Cors Settings
router.all('/*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
});
// API Redirects
router.get('/', commons_1.default.root);
// API Info
router.get('/info', commons_1.default.info);
// API Logs
router.get('/logs', logs_1.default.listar);
exports.default = router;
