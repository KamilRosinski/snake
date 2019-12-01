import {Message} from "../../messages/message";

export interface MessagesState {
    messages: Message[];
}

export interface AppState {
    messages: MessagesState,
}

const initialMessagesState: MessagesState = {
    messages: []
};

const initialAppState: AppState = {
    messages: initialMessagesState
};

export const initializeState: () => AppState = () => {
    return initialAppState;
};