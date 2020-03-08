import {Pipe, PipeTransform} from '@angular/core';
import {Message} from '../model/message.model';

@Pipe({
    name: 'reverseOrder'
})
export class ReverseOrderPipe implements PipeTransform {

    transform(messages: Message[], reverseOrder: boolean): Message[] {
        return reverseOrder ? [...messages].reverse() : messages;
    };

}
