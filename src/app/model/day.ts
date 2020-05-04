import { Todo } from './todo';

export class Day {
    number: string;
    month: string;
    year: string;
    weekDay: number;
    monthDay?: number
    todos: Todo[];
}