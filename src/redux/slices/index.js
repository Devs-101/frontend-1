import { usersSlice } from './users'
import { eventsSlice } from './events'
import { modalsSlice } from './modals'
import { speakersSlice } from './speakers'

export const rootReducer = {
  users: usersSlice.reducer,
  events: eventsSlice.reducer,
  modals: modalsSlice.reducer,
  speakers: speakersSlice.reducer
}
