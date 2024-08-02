import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CostoCompraLecheComponent } from './components/costo-compra-leche/costo-compra-leche.component';
import { ProduccionFormComponent } from './components/produccion/produccion.component';
import { InformsComponent } from './components/informs/informs.component';

const routes: Routes = [
    { path: 'costo-compra-leche', component: CostoCompraLecheComponent },
    { path: 'produccion', component: ProduccionFormComponent },
    { path: 'informs', component: InformsComponent },
    { path: '', redirectTo: '/costo-compra-leche', pathMatch: 'full' } // Redirige a una ruta por defecto
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
