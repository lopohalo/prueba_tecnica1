import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpresasService } from 'src/app/services/empresas.service'
import Swal from 'sweetalert2'

@Component({
    selector: 'app-empresas',
    templateUrl: './empresas.component.html',
    styleUrls: ['./empresas.component.css']
})
export class EmpresasComponent implements OnInit {
    usuario1: any
    nombre1: any
    VerComentarios: any = []
    comentarios: any
    empresa1: any
    tareasProyectos: any = []
    tareas: any
    EmpresaUsuario: any
    TareasGlobales: any
    formularioComentario: FormGroup
    constructor(private _Service: EmpresasService, private router: Router, private idRoute: ActivatedRoute, fb: FormBuilder) {
        this.formularioComentario = fb.group({
            comentarios: ['', Validators.required]
        })
    }

    ngOnInit(): void {
        localStorage.setItem('proyecto1', '')
        localStorage.setItem('proyecto2', '')
        let usuario :any = localStorage.getItem('usuario')
        this.usuario1 = JSON.parse(usuario)
        if (localStorage.getItem('control-tareas') ){
            let arregloGlobal12: any = localStorage.getItem('control-tareas')
            let arregloGlobal123: any = JSON.parse(arregloGlobal12)
            this.TareasGlobales = arregloGlobal123
        } else {
            localStorage.setItem('control-tareas', '[]')
            let arregloGlobal12: any = localStorage.getItem('control-tareas')
            let arregloGlobal123: any = JSON.parse(arregloGlobal12)
            this.TareasGlobales = arregloGlobal123
        }
        this.obtenerEmpresa()
    }
    generadoraID() {

        let random = Math.random().toString(36).substring(2);
        let fecha = Date.now().toString(36)
        return random + fecha;
    }
    agregar() {
        console.log(this.comentarios)
        let nombre :any = localStorage.getItem('Nombre')
        this.nombre1 = JSON.parse(nombre)
        let usuario :any = localStorage.getItem('usuario')
        this.usuario1 = JSON.parse(usuario)
        let citas = {
            comentarios: this.formularioComentario.get('comentarios')?.value,
            nombre: this.nombre1[0],
            id: this.generadoraID(),
            idEmpresa: this.comentarios[0].id,
            usuario: this.usuario1
        }
        let arregloGlobal: any = localStorage.getItem('control-tareas')
        let arregloGlobal1: any = JSON.parse(arregloGlobal)
        if (arregloGlobal == null) {
            this.TareasGlobales = []
        } else {
            this.TareasGlobales = arregloGlobal1
        }
        this.TareasGlobales.push(citas)
        localStorage.setItem('control-tareas', JSON.stringify(this.TareasGlobales))
        let arregloGlobal12: any = localStorage.getItem('control-tareas')
        let arregloGlobal123: any = JSON.parse(arregloGlobal12)
        this.TareasGlobales = arregloGlobal123
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Se ha comentado correctamente',
            showConfirmButton: false,
            timer: 1500
        })
        this.formularioComentario.reset()
    }


    obtenerEmpresa() {
        let empresa: any = localStorage.getItem('Empresa')
        empresa = JSON.parse(empresa)
        this.empresa1 = empresa[0]
        this._Service.getEmpresas().subscribe(data => {
            const arregloEmpresas = data.filter((element: any) => element.name == empresa[0])
            this.EmpresaUsuario = arregloEmpresas
            this.tareas = this.EmpresaUsuario[0].history
            console.log(this.tareas)
            localStorage.setItem('idEmpresa', JSON.stringify(this.EmpresaUsuario[0]._id))
        }, error => {
            console.log(error);
        })
    }
    proyecto1(tarea: any) {
        localStorage.setItem('proyecto1', JSON.stringify(tarea))
        localStorage.removeItem('proyecto2')
        this.router.navigate(['/citas'])
    }
    proyecto2(tarea: any) {
        localStorage.setItem('proyecto2', JSON.stringify(tarea))
        localStorage.removeItem('proyecto1')
        this.router.navigate(['/citas'])
    }
    seguimiento(proyecto: any) {
        console.log(proyecto)
        console.log(this.EmpresaUsuario[0].history)
        const arreglo = this.EmpresaUsuario[0].history.filter((element: any) => element.proyecto === proyecto)
        this.tareasProyectos = arreglo[0].tareas
        console.log(this.tareasProyectos)
    }
    Trayendoobjeto(obj: any) {
        this.comentarios = [obj]
        console.log(this.comentarios)
    }
    ver(obj: any) {
        const nuevoArreglo = this.TareasGlobales.filter((element: any) => element.idEmpresa == obj.id)
        this.VerComentarios = nuevoArreglo
    }
    eliminar(obj: any){
        const nuevoArreglo = this.TareasGlobales.filter((element: any) => element.id !== obj.id)
        localStorage.setItem('control-tareas', JSON.stringify(nuevoArreglo))
        let arregloGlobal12: any = localStorage.getItem('control-tareas')
        let arregloGlobal123: any = JSON.parse(arregloGlobal12)
        this.TareasGlobales = arregloGlobal123
        const nuevoArreglo2 = this.TareasGlobales.filter((element: any) => element.idEmpresa == obj.id)
        this.VerComentarios = nuevoArreglo
    }

}
