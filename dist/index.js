"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const http = __importStar(require("http"));
const socket_io_1 = __importDefault(require("socket.io"));
const moment_1 = __importDefault(require("moment"));
const Productos_1 = __importDefault(require("./Productos"));
const Mensajes_1 = __importDefault(require("./Mensajes"));
const productos_1 = __importDefault(require("./routes/productos"));
/** INICIALIZACION API con EXPRESS */
const app = express_1.default();
const puerto = 8000;
const publicPath = path_1.default.resolve(__dirname, '../public');
app.use(express_1.default.static(publicPath));
app.set('view engine', 'pug');
const viewsPath = path_1.default.resolve(__dirname, '../views');
app.set('views', viewsPath);
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
const myServer = http.Server(app);
myServer.on('error', (err) => {
    console.log('ERROR ATAJADO', err);
});
myServer.listen(puerto, () => console.log('Server up en puerto', puerto));
app.use('/api', productos_1.default);
const myWSServer = socket_io_1.default(myServer);
const products = new Productos_1.default();
const mensajes = new Mensajes_1.default();
myWSServer.on('connect', (socket) => {
    socket.on('new-product', (product) => {
        let { title, price, thumbnail } = product;
        products.guardarProducto(title, price, thumbnail);
    });
    let listaProductos = products.leerProductos();
    myWSServer.emit('products', listaProductos);
    socket.on('askProduct', (productos) => {
        let listaProductos = products.leerProductos();
        socket.emit('products', listaProductos);
    });
    socket.on('new-mensaje', (mensaje) => __awaiter(void 0, void 0, void 0, function* () {
        let fecha = moment_1.default().format('lll');
        let msj = Object.assign(Object.assign({}, mensaje), { fecha });
        mensajes.guardar(msj);
    }));
    let todosMensajes = mensajes.leer();
    console.log(todosMensajes);
    myWSServer.emit('mensajes', todosMensajes);
    socket.on('askMensajes', (mensajes) => {
        let todosMensajes = mensajes.leer();
        socket.emit('mensajes', todosMensajes);
    });
});
//# sourceMappingURL=index.js.map