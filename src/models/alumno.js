export default class Alumno {
    constructor(username, dni , edad) { 
    this.username = username;
    this.dni = dni;
    this.edad = edad;
    }

    getusername() {
    return this.username;
    }

    getdni() {
    return this.dni;
    }
    getEdad() {
        return this.edad;
        }

    getInformacionAlumno(){
        return `username:${this.username}, dni:${this.dni} , edad:${this.edad} `;
    }
}

export function convertirAToString() {

   var alumno = Alumno.prototype.toString
    return alumno;
            
}