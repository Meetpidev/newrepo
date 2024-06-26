const videoReducer =(state= {
    data:null,
    currentIndex: parseInt(localStorage.getItem('currentVideoIndex'), 10) || 0,

},action ) => {

    switch(action.type){
        case 'POST_VIDEO':
            return {...state};

        case 'POST_LIKE':
            return {...state};

        case 'FETCH_ALL_VIDEOS':
            return {...state,data:action.payload};

        case 'SET_CURRENT_VIDEO_INDEX':
            return { ...state, currentIndex: action.payload };
            
        default:
            return state;
    }
}

export default videoReducer