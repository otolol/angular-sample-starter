import { NgModule, OpaqueToken } from '@angular/core';
import { BrowserModule } from "@angular/platform-browser";

import { AppComponent } from './app.component';

// import * from "sb.theme.singular";


@NgModule({
    imports: [
        BrowserModule.withServerTransition({
            appId: 'uni'
        })
    ],
    
    exports: [],
    declarations: [AppComponent],
    bootstrap: [AppComponent],
})
export class AppModule { }
