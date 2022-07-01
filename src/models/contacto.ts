export class Contacto {
    _id?: string;
    email: string;
    password: string;
    name: string;
    direccion: string;
    nit: string;
    empresa: string;
    number: string;

    constructor(email: string,
        password: string,
        name: string,
        direccion: string,
        nit: string,
        number: string,
        empresa: string) {
        this.email = email
        this.password = password
        this.name = name
        this.direccion = direccion
        this.nit = nit
        this.number = number
        this.empresa = empresa
    }
}
