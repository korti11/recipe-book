import { Routes, RouterModule } from "@angular/router";
import { RecipeComponent } from './recipe/recipe.component';

const APP_ROUTES: Routes = [
    { path: '', redirectTo: '/recipes', pathMatch: 'full' },
    { path: 'recipes', component: RecipeComponent }
]

export const Routing = RouterModule.forRoot(APP_ROUTES);