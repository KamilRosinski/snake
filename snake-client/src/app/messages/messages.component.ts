import {Component, OnDestroy, OnInit} from '@angular/core';
import {Message} from './model/message.model';
import {SortOrder} from './model/sort-order';
import {Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import {AppState} from '../store/state/app.state';
import {selectAllMessages} from '../store/selectors/snake.selectors';
import {clearMessages} from '../store/actions/snake.actions';

@Component({
    selector: 'app-messages',
    templateUrl: './messages.component.html',
    styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit, OnDestroy {

    private readonly _subscription: Subscription = new Subscription();

    private _messages: Message[] = [];
    private _sortOrder: SortOrder = SortOrder.DESCENDING;

    constructor(private readonly _store: Store<AppState>) {
    }

    ngOnInit(): void {
        this._subscription.add(this._store.select(selectAllMessages).subscribe((messages: Message[]) => {
            this._messages = messages;
        }));
    }

    ngOnDestroy(): void {
        this._subscription.unsubscribe();
    }

    clearMessages(): void {
        this._store.dispatch(clearMessages());
    }

    toggleSortOrder(): void {
        this._sortOrder *= -1;
    }

    hasMessages(): boolean {
        return this._messages && this._messages.length > 0;
    }

    isSortedAscending(): boolean {
        return this._sortOrder === SortOrder.ASCENDING;
    }

    get messages(): Message[] {
        return this._messages;
    }

}
