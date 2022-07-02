import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
    empresa:any
    @ViewChild('botonInicio') boton?: ElementRef;
    constructor() { }

    cerrar(){
        const cerrar = this.boton?.nativeElement
        setTimeout(() => {
            cerrar.click();
        }, 500);
    }
    ngOnInit(): void {
        if(localStorage.getItem('Empresa') == '[]') {
            localStorage.setItem('Empresa', '[]')
        }
        const verificar:any = localStorage.getItem('Empresa')
        this.empresa = JSON.parse(verificar)
    }



}
