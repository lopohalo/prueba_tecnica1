import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpresasService } from 'src/app/services/empresas.service'


@Component({
    selector: 'app-empresas',
    templateUrl: './empresas.component.html',
    styleUrls: ['./empresas.component.css']
})
export class EmpresasComponent implements OnInit {
    EmpresaUsuario: any
    constructor(private _Service: EmpresasService,private router: Router,private idRoute: ActivatedRoute) { }
    ngOnInit(): void {
        this.obtenerEmpresa()
    }
    obtenerEmpresa() {
        let empresa: any = localStorage.getItem('Empresa')
        empresa = JSON.parse(empresa)
        console.log(empresa)
        this._Service.getEmpresas().subscribe(data => {
            const arregloEmpresas = data.filter((element: any) => element.name == empresa[0])
            this.EmpresaUsuario = arregloEmpresas
            console.log(this.EmpresaUsuario)
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

}
