import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { Contacto } from 'src/models/contacto'
import { ActivatedRoute, Router } from '@angular/router';
import { Contacto1Service } from '../../services/contacto1.service'
import Swal from 'sweetalert2'

@Component({
    selector: 'app-registro',
    templateUrl: './registro.component.html',
    styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
    registroGrupo: FormGroup;
    guardarEmpresa: any
    revisarCorreo = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/
    revisarNumero =  /([0-18])$/
    revisarContraseñaFuerte = /(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}/
    @ViewChild('password') passwordHTML?: ElementRef;
    @ViewChild('password1') password1HTML?: ElementRef;
    @ViewChild('boton') btnHTML?: ElementRef;
    @ViewChild('img') imgHTML?: ElementRef;
    @ViewChild('img2') img2HTML?: ElementRef;
    @ViewChild('name') nameHTML?: ElementRef;
    @ViewChild('lastname') lastnameHTML?: ElementRef;
    @ViewChild('email') emailHTML?: ElementRef;
    @ViewChild('number') numberHTML?: ElementRef;
    @ViewChild('iconame') iconameHTML?: ElementRef;
    @ViewChild('icolastname') icolastname?: ElementRef;
    @ViewChild('icoemail') icoemail?: ElementRef;
    @ViewChild('iconumber') iconumber?: ElementRef;
    @ViewChild('icocontra') icocontra?: ElementRef;
    @ViewChild('icocontra1') icocontra1?: ElementRef;
    @ViewChild('spanconfirma') spanconfirma?: ElementRef;
    @ViewChild('spanValidarFormulario') spanValidarFormulario?: ElementRef;

    constructor(private renderer2: Renderer2, private fb: FormBuilder,private _contactoService: Contacto1Service,private router: Router,private idRoute: ActivatedRoute,) {
        this.registroGrupo = fb.group({
            email: ['',[Validators.required, Validators.pattern(this.revisarCorreo)]],
            password:['',[Validators.required, Validators.pattern(this.revisarContraseñaFuerte)]],
            password1: ['',Validators.required],
            number:['', Validators.compose([
                Validators.required,
                Validators.minLength(10),
                Validators.maxLength(10),
                Validators.pattern(/^[1-9]\d{9}$/)
            ])],
            name: ['', Validators.required],
            direccion: ['',Validators.required],
            documento: ['', Validators.compose([
                Validators.required,
                Validators.minLength(9),
                Validators.maxLength(10),
                Validators.pattern(/^[1-9]\d{9}$/)
            ])],
            empresa: ['--Seleccione Empresa---',Validators.required],
        })


    }
    ngOnInit(): void {

    }



    ComprobandoPassword(){
        const confirmando = this.spanconfirma?.nativeElement
        let status:boolean=false
        const verificar: any = {
            password: this.registroGrupo.get('password')?.value,
            password1: this.registroGrupo.get('password1')?.value,
        }
        console.log(verificar)
        if(verificar.password != verificar.password1){
            this.renderer2.setAttribute(confirmando, 'value', 'LAS CONTRASEÑAS NO COINCIDEN')
            status = false
        }else{
            this.renderer2.setAttribute(confirmando, 'value', '')
            status = true
        }
        return status;
    }

    AnalizandoRegistro(){
        const registroGrupo: Contacto = {
            email: this.registroGrupo.get('email')?.value,
            password: this.registroGrupo.get('password')?.value,
            number: this.registroGrupo.get('number')?.value,
            name: this.registroGrupo.get('name')?.value,
            empresa: this.registroGrupo.get('empresa')?.value,
            direccion: this.registroGrupo.get('direccion')?.value,
            documento: this.registroGrupo.get('documento')?.value
        }
        const confirmando1 = this.spanValidarFormulario?.nativeElement
        if(this.ComprobandoPassword() == false){
            this.renderer2.setAttribute(confirmando1, 'value', 'Por favor vertifique Las claves')
        }else{
            this.renderer2.setAttribute(confirmando1, 'value', '')
            this._contactoService.postContacto(registroGrupo).subscribe(data => {
                console.log(data)
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Se ha registrado correctamente',
                    showConfirmButton: false,
                    timer: 1500
                })

                const nombre = [data.name]
                this.guardarEmpresa = [data.empresa]
                localStorage.setItem('Empresa',JSON.stringify(this.guardarEmpresa))

                localStorage.setItem('Nombre', JSON.stringify(nombre) )
                setTimeout(() => {
                    window.location.reload()
                },1000)
            }, HttpErrorResponse => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: HttpErrorResponse.error.mensaje,
                })
            })
        }
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
    cambio2() {
        const elemento2 = this.password1HTML?.nativeElement;
        const imagen2 = this.img2HTML?.nativeElement;
        const juan2 = elemento2.dataset.muestrak;
        if (juan2 == 'false') {
            this.renderer2.setAttribute(elemento2, 'type', 'text');
            this.renderer2.setAttribute(elemento2, 'data-muestrak', 'true');
            this.renderer2.setAttribute(imagen2, 'src', './assets/img/eye-solid.svg');

        } else {
            this.renderer2.setAttribute(elemento2, 'type', 'password');
            this.renderer2.setAttribute(elemento2, 'data-muestrak', 'false');
            this.renderer2.setAttribute(imagen2, 'src', './assets/img/eye-slash-solid.svg');
        }
    }

    cambio3() {
        const icocontra1 = this.icocontra?.nativeElement;
        const contra1 = this.passwordHTML?.nativeElement
        const icocontra2 = this.icocontra1?.nativeElement;
        const contra2 = this.password1HTML?.nativeElement
        const number1 = this.numberHTML?.nativeElement;
        const iconumber1 = this.iconumber?.nativeElement
        const email1 = this.emailHTML?.nativeElement;
        const icoemail1 = this.icoemail?.nativeElement;
        const icolastname1 = this.icolastname?.nativeElement;
        const lastname1 = this.lastnameHTML?.nativeElement;
        const name1 = this.nameHTML?.nativeElement;
        const iconame1 = this.iconameHTML?.nativeElement;
        const dataname = name1.dataset.name;
        if (dataname == 'false') {
            this.renderer2.removeClass(icocontra1, 'icoTodos')
            this.renderer2.setAttribute(contra1, 'data-contra', 'false');
            this.renderer2.removeClass(icocontra2, 'icoTodos')
            this.renderer2.setAttribute(contra2, 'data-contra1', 'false');
            this.renderer2.removeClass(iconumber1, 'icoTodos')
            this.renderer2.setAttribute(number1, 'data-number', 'false');
            this.renderer2.removeClass(icoemail1, 'icoTodos')
            this.renderer2.setAttribute(email1, 'data-email', 'false');
            this.renderer2.addClass(iconame1, 'icoTodos')
            this.renderer2.setAttribute(name1, 'data-name', 'true');
            this.renderer2.removeClass(icolastname1, 'icoTodos')
            this.renderer2.setAttribute(lastname1, 'data-name', 'false');
        } else {
            this.renderer2.removeClass(iconame1, 'icoTodos')
            this.renderer2.setAttribute(name1, 'data-name', 'false');
        }

    }
    cambio4() {
        const icocontra1 = this.icocontra?.nativeElement;
        const contra1 = this.passwordHTML?.nativeElement
        const icocontra2 = this.icocontra1?.nativeElement;
        const contra2 = this.password1HTML?.nativeElement
        const number1 = this.numberHTML?.nativeElement;
        const iconumber1 = this.iconumber?.nativeElement
        const email1 = this.emailHTML?.nativeElement;
        const icoemail1 = this.icoemail?.nativeElement;
        const name1 = this.nameHTML?.nativeElement;
        const iconame1 = this.iconameHTML?.nativeElement;
        const lastname1 = this.lastnameHTML?.nativeElement;
        const icolastname1 = this.icolastname?.nativeElement;
        const datalastname = lastname1.dataset.name;
        if (datalastname == 'false') {
            this.renderer2.removeClass(icocontra1, 'icoTodos')
            this.renderer2.setAttribute(contra1, 'data-contra', 'false');
            this.renderer2.removeClass(icocontra2, 'icoTodos')
            this.renderer2.setAttribute(contra2, 'data-contra1', 'false');
            this.renderer2.removeClass(iconumber1, 'icoTodos')
            this.renderer2.setAttribute(number1, 'data-number', 'false');
            this.renderer2.removeClass(icoemail1, 'icoTodos')
            this.renderer2.setAttribute(email1, 'data-email', 'false');
            this.renderer2.removeClass(iconame1, 'icoTodos')
            this.renderer2.setAttribute(name1, 'data-name', 'false');
            this.renderer2.addClass(icolastname1, 'icoTodos')
            this.renderer2.setAttribute(lastname1, 'data-lastname', 'true');
        } else {
            this.renderer2.removeClass(icolastname1, 'icoTodos')
            this.renderer2.setAttribute(lastname1, 'data-lastname', 'false');
        }

    }
    cambio5() {
        const icocontra1 = this.icocontra?.nativeElement;
        const contra1 = this.passwordHTML?.nativeElement
        const icocontra2 = this.icocontra1?.nativeElement;
        const contra2 = this.password1HTML?.nativeElement
        const number1 = this.numberHTML?.nativeElement;
        const iconumber1 = this.iconumber?.nativeElement
        const icolastname1 = this.icolastname?.nativeElement;
        const lastname1 = this.lastnameHTML?.nativeElement;
        const name1 = this.nameHTML?.nativeElement;
        const iconame1 = this.iconameHTML?.nativeElement;
        const email1 = this.emailHTML?.nativeElement;
        const icoemail1 = this.icoemail?.nativeElement;
        const dataemail = email1.dataset.email;
        if (dataemail == 'false') {
            this.renderer2.removeClass(icocontra1, 'icoTodos')
            this.renderer2.setAttribute(contra1, 'data-contra', 'false');
            this.renderer2.removeClass(icocontra2, 'icoTodos')
            this.renderer2.setAttribute(contra2, 'data-contra1', 'false');
            this.renderer2.removeClass(iconumber1, 'icoTodos')
            this.renderer2.setAttribute(number1, 'data-number', 'false');
            this.renderer2.removeClass(icolastname1, 'icoTodos')
            this.renderer2.setAttribute(lastname1, 'data-name', 'false');
            this.renderer2.removeClass(iconame1, 'icoTodos')
            this.renderer2.setAttribute(name1, 'data-name', 'false');
            this.renderer2.addClass(icoemail1, 'icoTodos')
            this.renderer2.setAttribute(email1, 'data-email', 'true');
        } else {
            this.renderer2.removeClass(icoemail1, 'icoTodos')
            this.renderer2.setAttribute(email1, 'data-email', 'false');
        }
    }
    cambio6() {
        const icocontra1 = this.icocontra?.nativeElement;
        const contra1 = this.passwordHTML?.nativeElement
        const icocontra2 = this.icocontra1?.nativeElement;
        const contra2 = this.password1HTML?.nativeElement
        const number1 = this.numberHTML?.nativeElement;
        const iconumber1 = this.iconumber?.nativeElement
        const email1 = this.emailHTML?.nativeElement;
        const icoemail1 = this.icoemail?.nativeElement;
        const icolastname1 = this.icolastname?.nativeElement;
        const lastname1 = this.lastnameHTML?.nativeElement;
        const name1 = this.nameHTML?.nativeElement;
        const iconame1 = this.iconameHTML?.nativeElement;
        const datanumber = number1.dataset.number;
        if (datanumber == 'false') {
            this.renderer2.removeClass(icocontra1, 'icoTodos')
            this.renderer2.setAttribute(contra1, 'data-contra', 'false');
            this.renderer2.removeClass(icocontra2, 'icoTodos')
            this.renderer2.setAttribute(contra2, 'data-contra1', 'false');
            this.renderer2.removeClass(iconame1, 'icoTodos')
            this.renderer2.setAttribute(name1, 'data-name', 'false');
            this.renderer2.removeClass(icoemail1, 'icoTodos')
            this.renderer2.setAttribute(email1, 'data-email', 'false');
            this.renderer2.addClass(iconumber1, 'icoTodos')
            this.renderer2.setAttribute(number1, 'data-number', 'true');
            this.renderer2.removeClass(icolastname1, 'icoTodos')
            this.renderer2.setAttribute(lastname1, 'data-name', 'false');
        } else {
            this.renderer2.removeClass(iconumber1, 'icoTodos')
            this.renderer2.setAttribute(number1, 'data-number', 'false');
        }

    }
    cambio7() {
        const icocontra2 = this.icocontra1?.nativeElement;
        const contra2 = this.password1HTML?.nativeElement
        const icocontra1 = this.icocontra?.nativeElement;
        const contra1 = this.passwordHTML?.nativeElement
        const number1 = this.numberHTML?.nativeElement;
        const iconumber1 = this.iconumber?.nativeElement
        const email1 = this.emailHTML?.nativeElement;
        const icoemail1 = this.icoemail?.nativeElement;
        const icolastname1 = this.icolastname?.nativeElement;
        const lastname1 = this.lastnameHTML?.nativeElement;
        const name1 = this.nameHTML?.nativeElement;
        const iconame1 = this.iconameHTML?.nativeElement;
        const datacontra = contra1.dataset.contra;
        if (datacontra == 'false') {
            this.renderer2.removeClass(icocontra2, 'icoTodos')
            this.renderer2.setAttribute(contra2, 'data-contra1', 'false');
            this.renderer2.removeClass(iconame1, 'icoTodos')
            this.renderer2.setAttribute(name1, 'data-name', 'false');
            this.renderer2.removeClass(iconumber1, 'icoTodos')
            this.renderer2.setAttribute(number1, 'data-number', 'false');
            this.renderer2.removeClass(icoemail1, 'icoTodos')
            this.renderer2.setAttribute(email1, 'data-email', 'false');
            this.renderer2.addClass(icocontra1, 'icoTodos')
            this.renderer2.setAttribute(contra1, 'data-contra', 'true');
            this.renderer2.removeClass(icolastname1, 'icoTodos')
            this.renderer2.setAttribute(lastname1, 'data-name', 'false');
        } else {
            this.renderer2.removeClass(icocontra1, 'icoTodos')
            this.renderer2.setAttribute(contra1, 'data-contra', 'false');
        }
    }
    cambio8() {
        const icocontra2 = this.icocontra1?.nativeElement;
        const contra2 = this.password1HTML?.nativeElement
        const icocontra1 = this.icocontra?.nativeElement;
        const contra1 = this.passwordHTML?.nativeElement
        const number1 = this.numberHTML?.nativeElement;
        const iconumber1 = this.iconumber?.nativeElement
        const email1 = this.emailHTML?.nativeElement;
        const icoemail1 = this.icoemail?.nativeElement;
        const icolastname1 = this.icolastname?.nativeElement;
        const lastname1 = this.lastnameHTML?.nativeElement;
        const name1 = this.nameHTML?.nativeElement;
        const iconame1 = this.iconameHTML?.nativeElement;
        const datacontra2 = contra2.dataset.contra1;
        if (datacontra2 == 'false') {
            this.renderer2.removeClass(iconame1, 'icoTodos')
            this.renderer2.setAttribute(name1, 'data-contra', 'false');
            this.renderer2.removeClass(icocontra1, 'icoTodos')
            this.renderer2.setAttribute(contra1, 'data-contra', 'false');
            this.renderer2.removeClass(iconumber1, 'icoTodos')
            this.renderer2.setAttribute(number1, 'data-number', 'false');
            this.renderer2.removeClass(icoemail1, 'icoTodos')
            this.renderer2.setAttribute(email1, 'data-email', 'false');
            this.renderer2.addClass(icocontra2, 'icoTodos')
            this.renderer2.setAttribute(contra2, 'data-contra1', 'true');
            this.renderer2.removeClass(icolastname1, 'icoTodos')
            this.renderer2.setAttribute(lastname1, 'data-name', 'false');
        } else {
            this.renderer2.removeClass(icocontra2, 'icoTodos')
            this.renderer2.setAttribute(contra2, 'data-contra1', 'false');
        }

    }
}






