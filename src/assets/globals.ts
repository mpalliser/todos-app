import { Injectable } from "@angular/core";

Injectable()
export class Globals {

    readonly weekDays = [
        {position: 1, text: 'Lunes', shortText: 'Lun.'},
        {position: 2, text: 'Martes', shortText: 'Mar.'},
        {position: 3, text: 'Miercoles', shortText: 'Mie.'},
        {position: 4, text: 'Jueves', shortText: 'Jue.'},
        {position: 5, text: 'Viernes', shortText: 'Vie.'},
        {position: 6, text: 'Sabado', shortText: 'Sab.'},
        {position: 0, text: 'Domingo', shortText: 'Dom.'}
    ];

}