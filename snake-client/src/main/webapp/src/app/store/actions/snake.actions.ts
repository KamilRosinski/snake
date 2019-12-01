import {createAction, props} from "@ngrx/store";
import {Message} from "../../messages/message";

export const sendMessage = createAction('[messages] Send new message', props<{ payload: Message }>());
export const clearMessages = createAction('[messages] Clear all messages');