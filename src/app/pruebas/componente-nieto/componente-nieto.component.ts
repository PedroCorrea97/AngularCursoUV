import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
    selector: 'app-componente-nieto',
    templateUrl: './componente-nieto.component.html',
    styleUrls: ['./componente-nieto.component.scss'],
    standalone: true,
    imports: [MatFormFieldModule, MatInputModule]
})
export class ComponenteNietoComponent {

}
