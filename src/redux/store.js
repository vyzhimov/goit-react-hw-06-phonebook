import { configureStore, createAction, createReducer } from '@reduxjs/toolkit';

const initialState = {
  contacts: [],
};

const addContact = createAction('ADDCONTACT');

const reducer = createReducer(initialState, {
  [addContact]: (state, action) => ({state.contacts.push(action.payload)})
});

export const store = configureStore({ reducer });
