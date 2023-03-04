"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-underscore-dangle */
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const helmet_1 = __importDefault(require("helmet"));
const express_1 = __importDefault(require("express"));
const serve_favicon_1 = __importDefault(require("serve-favicon"));
const body_parser_1 = __importDefault(require("body-parser"));
const default_1 = __importDefault(require("../routes/default"));
// import apiRoutes from '../routes/routes.js';
const morgan_middleware_1 = __importDefault(require("../middlewares/morgan_logger/morgan_middleware"));
const error_handler_1 = __importDefault(require("../middlewares/http_error_handler/error_handler"));
const jsonLimit = '5mb';
const publicLogs = './logs';
const publicFavicon = './public/assets/images/favicons/favicon.png';
exports.default = () => {
    const app = (0, express_1.default)();
    app.use((0, helmet_1.default)());
    app.use((0, cors_1.default)());
    app.use(morgan_middleware_1.default.morganConsoleLogger);
    app.use(morgan_middleware_1.default.morganFileLogger);
    app.use((0, serve_favicon_1.default)(publicFavicon));
    app.use(body_parser_1.default.json({ limit: jsonLimit }));
    app.use(body_parser_1.default.urlencoded({ extended: false }));
    app.use('/logs', express_1.default.static(publicLogs, { dotfiles: 'allow' }));
    app.use('/', default_1.default);
    // app.use('/api/v1/', apiRoutes);
    app.set('view engine', 'ejs');
    app.set('views', path_1.default.join(__dirname, '../app/views'));
    app.get('*', (req, res, next) => {
        next();
    });
    app.use(error_handler_1.default);
    return app;
};
