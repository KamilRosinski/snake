import {Message} from '../../messages/message';
import {EntityState} from '@ngrx/entity';

export interface MessagesState extends EntityState<Message> {
}

export interface AppState {
    messages: MessagesState,
}
