import { createSelector } from 'reselect';

const selectSearch = state => state.search;

export const selectSearchString = createSelector(
    [selectSearch],
    search => search.searchString
)