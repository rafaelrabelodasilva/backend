"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("express-async-errors");
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const routes_1 = require("./routes");
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)()); //Biblioteca que libera a app para qualquer ip
app.use((0, express_fileupload_1.default)({
    limits: { fileSize: 50 * 1024 * 1024 } //Recebe no máx 50mb
}));
app.use(routes_1.router);
//MiddleWare
//http://localhost:3333/files/18f6b22f1d5e108e22ca7472a117f84b-frangocatupiry.jpeg
app.use('/files', express_1.default.static(path_1.default.resolve(__dirname, '../', 'temp')));
//MiddleWare
app.use((err, req, res, next) => {
    if (err instanceof Error) {
        //Se for uma instância do tipo error
        return res.status(400).json({
            error: err.message
        });
    }
    return res.status(500).json({
        status: 'error',
        message: 'Internal server error.'
    });
});
app.listen(process.env.PORT, () => console.log('Servidor online!'));
