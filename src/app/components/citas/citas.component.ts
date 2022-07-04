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
    nuevoArreglo: any
    user1: any= []
    dataempresa: any
    empresaID: any
    empresa1: any
    user: any
    TareasLLegando: any
    tarea: any
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
        let empresa1: any = localStorage.getItem('idEmpresa')
        empresa1 = JSON.parse(empresa1)
        this.empresaID = empresa1
        let empresa: any = localStorage.getItem('Empresa')
        empresa = JSON.parse(empresa)
        this.empresa1 = empresa
        let guardar: any
        if (localStorage.getItem('proyecto1')) {
            guardar = localStorage.getItem('proyecto1')
        } else {
            guardar = localStorage.getItem('proyecto2')
        }
        guardar = JSON.parse(guardar)
        this.TareasLLegando = guardar
        this._Service.getEmpresas().subscribe(data => {
            const arregloEmpresas = data.filter((element: any) => element.name == empresa[0])
            this.dataempresa = arregloEmpresas[0].history.filter((element: any) => element.proyecto == this.TareasLLegando.proyecto)
            this.dataempresa = this.dataempresa[0].tareas
            let arreglo = arregloEmpresas.forEach((element: any) => {
                let tareas = element.history
                this.tarea = tareas
            })
        }, error => {
            console.log(error);
        })
    }
    encontrarUsuario() {
        let user: any = localStorage.getItem('usuario')
        user = JSON.parse(user)
        this._ServiceUsuario.getContacto(user).subscribe(data => {
            this.user = data
            this.user1 = data.tareas
        }, error => {
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
                this._ServiceUsuario.getContacto(this.user._id).subscribe(data => {
                    this.nuevoArreglo = data.tareas.filter((arregloViejo: any) => arregloViejo.id !== this.id)
                    let obj = {
                        tareas: this.nuevoArreglo
                    }
                    this._ServiceUsuario.putUser(obj, this.user._id).subscribe(data => {
                        this.user1 = data.tareas
                    }, error => {
                        console.log(error)
                    })
                }, errprivate => {
                    console.log(errprivate)
                })
                const nuevoArreglo = this.dataempresa.filter((arregloViejo: any) => arregloViejo.id !== this.id)
                const obj1 = {
                    proyecto: this.TareasLLegando.proyecto,
                    tareas: nuevoArreglo
                }
                this.CitasGlobales = this.tarea.map((viejoArreglo: any) => viejoArreglo.proyecto == this.TareasLLegando.proyecto ? obj1 : viejoArreglo)
                let arreglo = {
                    history: this.CitasGlobales
                }
                this._Service.putEmpresas(arreglo, this.empresaID).subscribe(data => {
                    this.dataempresa = data.history.filter((data1: any) => data1.proyecto == this.TareasLLegando.proyecto)
                    this.dataempresa = this.dataempresa[0].tareas
                    console.log(data)
                }, error => {
                    console.log(error)
                })

                // this.id = null
                // this.popo = localStorage.getItem(this.nombre)
                // this.pepe = JSON.parse(this.popo)
                // Swal.fire(
                //     'Eliminado!',
                //     'Se ha eliminado correctamente.',
                //     'success'
                // )
            }
        })
    }
    enviarDatos() {
        const registrar = this.registrarseHTML?.nativeElement
        let citas = {
            proyecto: this.TareasLLegando.proyecto,
            documento: this.ControlCitas.get('documento')?.value,
            nombre: this.ControlCitas.get('nombre')?.value,
            tarea: this.ControlCitas.get('tarea')?.value,
            tipoD: this.ControlCitas.get('tipoD')?.value,
            comentario: this.ControlCitas.get('comentario')?.value,
            id: ''
        }
        if (this.id == null) {
            citas.id = this.generadoraID()
            let tareaUSer = {
                tareas: [...this.user.tareas, citas]
            }
            console.log(tareaUSer)
            this._ServiceUsuario.putUser(tareaUSer, this.user._id).subscribe(data => {
                this.user = data
                this.user1 = data.tareas
            }, error => {
                console.log(error)
            })
            const obj = {
                proyecto: this.TareasLLegando.proyecto,
                tareas: [...this.dataempresa, citas]
            }
            this.CitasGlobales = this.tarea.map((viejoArreglo: any) => viejoArreglo.proyecto == this.TareasLLegando.proyecto ? obj : viejoArreglo)
            let arreglo = {
                history: this.CitasGlobales
            }
            this._Service.putEmpresas(arreglo, this.empresaID).subscribe(data => {
                console.log(data)
                this.dataempresa = data.history.filter((data1: any) => data1.proyecto == this.TareasLLegando.proyecto)
                this.dataempresa = this.dataempresa[0].tareas
            }, error => {
                console.log(error)
            })
        } else {
            citas.id = this.id
            this._ServiceUsuario.getContacto(this.user._id).subscribe(data => {
                this.nuevoArreglo = data.tareas.map((viejoArreglo: any) => viejoArreglo.id === this.id ? citas : viejoArreglo)
                let obj = {
                    tareas: this.nuevoArreglo
                }
                this._ServiceUsuario.putUser(obj, this.user._id).subscribe(data => {
                    this.user1 = data.tareas
                }, error => {
                    console.log(error)
                })
            }, errprivate => {
                console.log(errprivate)
            })
            const nuevoArreglo = this.dataempresa.map((viejoArreglo: any) => viejoArreglo.id === this.id ? citas : viejoArreglo)
            const obj1 = {
                proyecto: this.TareasLLegando.proyecto,
                tareas: nuevoArreglo
            }
            this.CitasGlobales = this.tarea.map((viejoArreglo: any) => viejoArreglo.proyecto == this.TareasLLegando.proyecto ? obj1 : viejoArreglo)
            let arreglo = {
                history: this.CitasGlobales
            }
            this._Service.putEmpresas(arreglo, this.empresaID).subscribe(data => {
                this.dataempresa = data.history.filter((data1: any) => data1.proyecto == this.TareasLLegando.proyecto)
                this.dataempresa = this.dataempresa[0].tareas
                console.log(data)
            }, error => {
                console.log(error)
            })
            setTimeout(() => {
                this.id = null
            }, 1000)
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Se ha editado correctamente',
                showConfirmButton: false,
                timer: 1500
            })
            this.renderer2.setAttribute(registrar, 'value', 'Registrarse')
        }
        this.ControlCitas.reset()
    }

}
