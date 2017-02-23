import { Routes, RouterModule } from '@angular/router';

import { DiceComponent } from './dice/dice.component';

const ROUTES: Routes = [
    {
        path: '',
        redirectTo: 'dice',
        pathMatch: 'full'
    },
    {
        path: 'dice',
        component: DiceComponent
    }
];

export const Routing = RouterModule.forRoot(ROUTES);