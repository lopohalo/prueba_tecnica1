import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Login } from 'src/models/login'
import { Contacto1Service } from '../../services/contacto1.service'
import Swal from 'sweetalert2'


@Component({
    selector: 'app-navbarfija',
    templateUrl: './navbarfija.component.html',
    styleUrls: ['./navbarfija.component.css']
})
export class NavbarfijaComponent implements OnInit {
    productoForm: FormGroup;
    iniciarSesion: any;
    guardarNombre: any;
    guardarEmpresa: any;
    popo: any;
    pepe: any;
    revisarCorreo = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/
    @ViewChild('img') imgHTML?: ElementRef;
    @ViewChild('password') passwordHTML?: ElementRef;
    @ViewChild('botonInicio') botonInicio?: ElementRef
    constructor(private fb: FormBuilder,
        private renderer2: Renderer2,
        private _contactoService: Contacto1Service,
        private router: Router,) {
        this.productoForm = fb.group({
            email: ['', [Validators.required, Validators.pattern(this.revisarCorreo)]],
            password: ['', Validators.required],
        })
    }

    Analizando() {
        const inicio = this.botonInicio?.nativeElement;
        const iniciarSesion: Login = {
            email: this.productoForm.get('email')?.value,
            password: this.productoForm.get('password')?.value,
        }
        this._contactoService.postLogin(iniciarSesion).subscribe(data => {
            localStorage.setItem('usuario', JSON.stringify(data._id))
            this.productoForm.reset()
            inicio.click()
            this.guardarNombre = [data.name]
            this.guardarEmpresa = [data.empresa]
            localStorage.setItem('Empresa',JSON.stringify(this.guardarEmpresa))
            localStorage.setItem('Nombre', JSON.stringify(this.guardarNombre))
            this.popo = localStorage.getItem('Nombre')
            this.pepe = JSON.parse(this.popo)

                window.location.reload()
                this.router.navigate(['/empresas'])
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                text: `Hola ${data.name}`,
                showConfirmButton: false,
                timer: 1500
            })
        }, HttpErrorResponse => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: HttpErrorResponse.error.mensaje,
            })
        })
    }
    cerrarSesion() {
        localStorage.setItem('Nombre', '[]')
        localStorage.setItem('Empresa','[]')
        localStorage.setItem('usuario', '[]')
        this.popo = localStorage.getItem('Nombre')
        this.pepe = JSON.parse(this.popo)
        this.router.navigate(['/'])
        setTimeout(() =>{
            window.location.reload()
        },200)
    }
    cambio1() {
        const elemento = this.passwordHTML?.nativeElement;
        const imagen = this.imgHTML?.nativeElement;
        const juan = elemento.dataset.muestraj;
        if (juan == 'false') {
            this.renderer2.setAttribute(elemento, 'type', 'text');
            this.renderer2.setAttribute(elemento, 'data-muestraj', 'true');
            this.renderer2.setAttribute(imagen, 'src', './assets/img/eye-solid.svg');

        } else {
            this.renderer2.setAttribute(elemento, 'type', 'password');
            this.renderer2.setAttribute(elemento, 'data-muestraj', 'false');
            this.renderer2.setAttribute(imagen, 'src', './assets/img/eye-slash-solid.svg');
        }
    }


    ngOnInit(): void {
        if (localStorage.getItem('Nombre')) {
            this.popo = localStorage.getItem('Nombre')
            this.pepe = JSON.parse(this.popo)
        } else {
            localStorage.setItem('Nombre', '[]')
            this.popo = localStorage.getItem('Nombre')
            this.pepe = JSON.parse(this.popo)
        }
    }

}
