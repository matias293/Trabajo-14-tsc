"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
class Product {
    constructor() {
        this.leerProductos = () => {
            if (this.productos.length === 0)
                return [];
            return this.productos;
        };
        this.leerProductosPorId = (id) => {
            const producto = productos.find(product => product.id === id);
            return producto;
        };
        this.guardarProducto = (title, price, thumbnail) => {
            let obj = {
                title,
                price,
                thumbnail,
                id: uuid_1.v4()
            };
            this.productos.push(obj);
            return obj;
        };
        this.actualizarProducto = (title, price, thumbnail, id) => {
            let productoActualizado;
            let productos = this.productos;
            for (let index = 0; index < productos.length; index++) {
                if (productos[index].id === id) {
                    productoActualizado = { title, price, thumbnail, id };
                    this.productos.splice(index, 1, productoActualizado);
                }
            }
            return productoActualizado;
        };
        this.eliminarProducto = (id) => {
            let productoBorrado;
            let productos = this.productos;
            for (let index = 0; index < productos.length; index++) {
                if (productos[index].id === id) {
                    productoBorrado = productos[index];
                    this.productos.splice(index, 1);
                }
            }
            return productoBorrado;
        };
        this.productos = [];
    }
}
exports.default = Product;
//# sourceMappingURL=Productos.js.map