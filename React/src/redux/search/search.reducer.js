const INITIAL_STATE = {
    searchString: ''
};

const searchReducer = (state= INITIAL_STATE,action) => {
    switch(action.type){
        case 'SET_SEARCHSTRING':
            return{
                ...state,
                searchString: action.payload
            }
        default:
            return state;
    }
}

export default searchReducer;