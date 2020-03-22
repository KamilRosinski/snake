import {Pipe, PipeTransform} from '@angular/core';
import {Message} from '../models/message.model';
import {SortOrder} from '../models/messages.model';

@Pipe({
    name: 'reverseOrder'
})
export class ReverseOrderPipe implements PipeTransform {

    transform(messages: Message[], sortOrder: SortOrder): Message[] {
        return sortOrder === SortOrder.DESCENDING ? messages : [...messages].reverse();
    };

}
