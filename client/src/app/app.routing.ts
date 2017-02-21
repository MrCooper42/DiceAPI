import { Routes, RouterModule } from '@angular/router';

import { PostsComponent } from './posts/posts.component';
import { DiceComponent } from './dice/dice.component';

const ROUTES: Routes = [
    {
        path: '',
        redirectTo: 'dice',
        pathMatch: 'full'
    },
    {
        path: 'posts',
        component: PostsComponent
    },
    {
        path: 'dice',
        component: DiceComponent
    }
];

export const Routing = RouterModule.forRoot(ROUTES);