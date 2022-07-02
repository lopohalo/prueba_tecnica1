import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Contacto1Service } from 'src/app/services/contacto1.service';
import { EmpresasService } from 'src/app/services/empresas.service';
import Swal from 'sweetalert2'


@Component({
    selector: 'app-citas',
    templateUrl: './citas.component.html',
    styleUrls: ['./citas.component.css']
})
export class CitasComponent implements OnInit {
    user:any
    TareasLLegando :any
    tarea:any
    CitasGlobales: any
    ControlCitas: FormGroup
    revisarCorreo = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/
    GuardarCitas: any
    pepe: any
    popo: any
    nombre: any
    id: any | null
    @ViewChild('registrarse') registrarseHTML?: ElementRef
    @ViewChild('editar') editar?: ElementRef

    constructor(private fb: FormBuilder, private renderer2: Renderer2, private _Service: EmpresasService, private _ServiceUsuario: Contacto1Service) {
        this.ControlCitas = fb.group({
            documento: ['', Validators.compose([
                Validators.required,
                Validators.minLength(9),
                Validators.maxLength(10),
            ])],
            nombre: ['', Validators.required],
            tarea: ['', Validators.required],
            tipoD: ['', Validators.required],
            comentario: ['', Validators.required]
        })

    }

    ngOnInit(): void {
        this.encontrarUsuario()
        const nombreLS: any = localStorage.getItem('Nombre')
        this.nombre = JSON.parse(nombreLS)
        if (localStorage.getItem(this.nombre)) {
            this.popo = localStorage.getItem(this.nombre)
            this.pepe = JSON.parse(this.popo)
        } else {
            localStorage.setItem(this.nombre, '[]')
            this.popo = localStorage.getItem(this.nombre)
            this.pepe = JSON.parse(this.popo)
        }

        let empresa: any = localStorage.getItem('Empresa')
        empresa = JSON.parse(empresa)
        let guardar: any
        if (localStorage.getItem('proyecto1')) {
            guardar = localStorage.getItem('proyecto1')
        } else {
            guardar = localStorage.getItem('proyecto2')
        }
        guardar = JSON.parse(guardar)
        this.TareasLLegando = guardar
        console.log(this.TareasLLegando)

        this._Service.getEmpresas().subscribe(data => {
            const arregloEmpresas = data.filter((element: any) => element.name == empresa[0])
            let arreglo = arregloEmpresas.forEach((element: any) => {
                let tareas = element.history
                this.tarea = tareas
            })
        }, error => {
            console.log(error);
        })
    }

    encontrarUsuario(){
       let user :any = localStorage.getItem('usuario')
       user = JSON.parse(user)
        this._ServiceUsuario.getContacto(user).subscribe(data => {
            console.log(data)
            this.user = data
        },error => {
            console.log(error);
        })
    }



    generadoraID() {

        let random = Math.random().toString(36).substring(2);
        let tipoD = Date.now().toString(36)
        return random + tipoD;
    }
    Trayendoobjeto(obj: any) {
        const registrar = this.registrarseHTML?.nativeElement
        this.renderer2.setAttribute(registrar, 'value', 'Editar Cita')
        this.ControlCitas.setValue({
            documento: obj.documento,
            nombre: obj.nombre,
            tarea: obj.tarea,
            tipoD: obj.tipoD,
            comentario: obj.comentario
        })
        this.id = obj.id
    }
    Elimiando(id: any) {
        this.id = id
        Swal.fire({
            title: 'Esta Seguro?',
            text: "Esta accion no sea reversible!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Eliminalo!'
        }).then((result) => {
            if (result.isConfirmed) {
                const arregloGlobal: any = localStorage.getItem('control-medico')
                const arregloGlobal1: any = JSON.parse(arregloGlobal)
                const nuevoarreglo = this.pepe.filter((arregloViejo: any) => arregloViejo.id !== this.id)
                this.GuardarCitas = nuevoarreglo
                const nuevoArregloGlobal = arregloGlobal1.filter((arregloViejo1: any) => arregloViejo1.id !== this.id)
                this.CitasGlobales = nuevoArregloGlobal
                localStorage.setItem(this.nombre, JSON.stringify(this.GuardarCitas))
                localStorage.setItem('control-medico', JSON.stringify(this.CitasGlobales))
                this.id = null
                this.popo = localStorage.getItem(this.nombre)
                this.pepe = JSON.parse(this.popo)
                Swal.fire(
                    'Eliminado!',
                    'Se ha eliminado correctamente.',
                    'success'
                )
            }
        })
    }
    enviarDatos() {
        // const registrar = this.registrarseHTML?.nativeElement
        let citas = {
            documento: this.ControlCitas.get('documento')?.value,
            nombre: this.ControlCitas.get('nombre')?.value,
            tarea: this.ControlCitas.get('tarea')?.value,
            tipoD: this.ControlCitas.get('tipoD')?.value,
            comentario: this.ControlCitas.get('comentario')?.value,
            id: ''
        }
        

        let Hola:any = []
        Hola.push(citas)
            const obj = {
                proyecto: this.TareasLLegando.proyecto,
                tareas: Hola
            }
            // console.log(obj)
        this._ServiceUsuario.putUser(citas, this.user._id).subscribe(data => {
            console.log(data)
        },error => {
            console.log(error)
        })
        this.CitasGlobales = this.tarea.map((viejoArreglo: any) => viejoArreglo.proyecto == this.TareasLLegando.proyecto ? obj : viejoArreglo)
        // if (this.id == null) {
        //     citas.id = this.generadoraID()
        //     this.GuardarCitas.push(citas)
        //     this.CitasGlobales.push(citas)
        // } else {
        //     citas.id = this.id
        //     const arregloGlobal:any = localStorage.getItem('control-medico')
        //     const arregloGlobal1:any = JSON.parse(arregloGlobal)
        //     this.CitasGlobales = arregloGlobal1.map((viejoArreglo: any) => viejoArreglo.id === this.id ? citas : viejoArreglo)

        //     const nuevoArreglo = this.GuardarCitas.map((viejoArreglo: any) => viejoArreglo.id === this.id ? citas : viejoArreglo)
        //     this.GuardarCitas = nuevoArreglo
        //     this.id = null
        //     Swal.fire({
        //         position: 'top-end',
        //         icon: 'success',
        //         title: 'Se ha editado correctamento',
        //         showConfirmButton: false,
        //         timer: 1500
        //     })
        //     this.renderer2.setAttribute(registrar, 'value', 'Registrarse')
        // }
        // localStorage.setItem(this.nombre, JSON.stringify(this.GuardarCitas))
        // setTimeout(() => {
        //     localStorage.setItem('control-medico', JSON.stringify(this.CitasGlobales))
        // },500)
        // this.popo = localStorage.getItem(this.nombre)
        // this.pepe = JSON.parse(this.popo)
        // this.ControlCitas.reset()
    }

}
