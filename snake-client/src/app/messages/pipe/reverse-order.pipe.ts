import {Pipe, PipeTransform} from '@angular/core';
import {Message} from '../model/message.model';
import {SortOrder} from '../model/sort-order';

@Pipe({
    name: 'reverseOrder'
})
export class ReverseOrderPipe implements PipeTransform {

    transform(messages: Message[], sortOrder: SortOrder): Message[] {
        return sortOrder === SortOrder.DESCENDING ? messages : [...messages].reverse();
    };

}
