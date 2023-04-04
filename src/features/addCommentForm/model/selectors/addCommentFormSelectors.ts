import { StateSchema } from 'app/providers/StoreProvider';

// проинициализируется пустой строкой только тогда года null или undefined (используем ??)
export const getAddCommentFormText = (state: StateSchema) => state.addCommentForm?.text ?? '';
export const getAddCommentFormError = (state: StateSchema) => state.addCommentForm?.error;
