export class Contacto {
    _id?: string;
    email: string;
    password: string;
    name: string;
    direccion: string;
    documento: string;
    empresa: string;
    number: string;

    constructor(email: string,
        password: string,
        name: string,
        direccion: string,
        documento: string,
        number: string,
        empresa: string) {
        this.email = email
        this.password = password
        this.name = name
        this.direccion = direccion
        this.documento = documento
        this.number = number
        this.empresa = empresa
    }
}
