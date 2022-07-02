import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistroComponent } from './components/registro/registro.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NavbarfijaComponent } from './components/navbarfija/navbarfija.component';
import { NavbarComponent} from './components/navbar/navbar.component';
import { EmpresasComponent } from './components/empresas/empresas.component';
import { CitasComponent } from './components/citas/citas.component';



@NgModule({
    declarations: [
        AppComponent,
        RegistroComponent,
        NavbarfijaComponent,
        NavbarComponent,
        EmpresasComponent,
        CitasComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        HttpClientModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
