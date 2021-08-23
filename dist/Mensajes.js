"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require('fs');
const path = require('path');
const pathArchivo = path.resolve(__dirname, 'mensajes.txt');
class Archivo {
    constructor() {
        this.leer = () => {
            try {
                const data = fs.readFileSync(pathArchivo, 'utf-8');
                if (!data) {
                    return [];
                }
                if (data) {
                    return JSON.parse(data);
                }
            }
            catch (error) {
                console.log('No se pudo leer el archivo ', error);
            }
        };
        this.guardar = (mensaje) => {
            const data = fs.readFileSync(pathArchivo, 'utf-8');
            if (!data) {
                this.mensajes.push(mensaje);
            }
            if (data) {
                const mensajes = JSON.parse(data);
                this.mensajes = mensajes;
                this.mensajes.push(mensaje);
            }
            try {
                fs.writeFileSync(pathArchivo, JSON.stringify(this.mensajes, null, '\t'));
            }
            catch (error) {
                console.log('No se pudo guardar el archivo ', error);
            }
        };
        this.mensajes = [];
    }
}
exports.default = Archivo;
//# sourceMappingURL=Mensajes.js.map