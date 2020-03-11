import {Component, OnInit} from '@angular/core';
import {Message} from './model/message.model';
import {SortOrder} from './model/sort-order';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {map} from 'rxjs/operators';
import {AppState} from '../store/app.state';
import {selectAllMessages} from '../store/app.selectors';
import {clearMessages} from '../store/app.actions';

@Component({
    selector: 'app-messages',
    templateUrl: './messages.component.html',
    styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

    messages$: Observable<Message[]>;
    hasMessages$: Observable<boolean>;
    sortOrder: SortOrder = SortOrder.DESCENDING;

    constructor(private readonly _store: Store<AppState>) {
    }

    ngOnInit(): void {
        this.messages$ = this._store.select(selectAllMessages);
        this.hasMessages$ = this.messages$.pipe(map((messages: Message[]) => messages.length > 0));
    }

    clearMessages(): void {
        this._store.dispatch(clearMessages());
    }

    toggleSortOrder(): void {
        this.sortOrder *= -1;
    }

    get arrowIcon(): string {
        return this.sortOrder === SortOrder.ASCENDING ? 'arrow_upward' : 'arrow_downward';
    }

}
