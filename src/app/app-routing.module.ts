import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CitasComponent } from './components/citas/citas.component';
import { EmpresasComponent } from './components/empresas/empresas.component';

import { RegistroComponent } from './components/registro/registro.component';

const routes: Routes = [
    { path: "", component: RegistroComponent },
    { path: "empresas", component: EmpresasComponent },
    { path: "citas", component: CitasComponent }

]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
