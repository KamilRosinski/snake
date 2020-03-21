import {Message} from '../models/message.model';
import {EntityState} from '@ngrx/entity';
import {Evolution} from '../models/evolution.model';

export interface AppState {
    messages: Message[],
    evolutions: EvolutionsState,
}

export interface EvolutionsState extends EntityState<Evolution> {
}
