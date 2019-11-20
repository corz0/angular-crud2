"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class IndexController {
    index(req, res) {
        res.send('API is in /api/games');
    }
}
const indexController = new IndexController();
exports.default = indexController;
