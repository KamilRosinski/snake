import {Pipe, PipeTransform} from '@angular/core';
import {Message} from '../message';

@Pipe({
    name: 'ReverseOrder'
})
export class ReverseOrderPipe implements PipeTransform {

    transform(messages: Message[], reverseOrder: boolean): Message[] {
        return reverseOrder ? [...messages].reverse() : messages;
    };

}
