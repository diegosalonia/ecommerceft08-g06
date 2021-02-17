import { NEXT, PREV } from '../constants';


const initialState = {
    slideIndex: 0
  };
  
  const carouselReducer = (state = initialState, action) => {
    switch (action.type) {
        case NEXT:
            return {
                ...state,
                slideIndex: (state.slideIndex + 1) % slides.length
            };
    
        case PREV:
            return {
                ...state,
                slideIndex:
                state.slideIndex === 0 ? slides.length - 1 : state.slideIndex - 1
            };
    }
  };

  export default carouselReducer;