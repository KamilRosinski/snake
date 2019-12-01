import {AppState, MessagesState} from "../state/app.state";
import {createSelector} from "@ngrx/store";

export const selectMessages = (state) => {
    return state.snake.messages;
};

export const selectAllMessages = createSelector(selectMessages, (state: MessagesState) => state.messages);