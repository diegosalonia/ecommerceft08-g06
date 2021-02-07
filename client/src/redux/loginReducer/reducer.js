import { LOGIN, LOGOUT }  from '../constants';

const initialState = {
	user_role: 'Guest',
	id: 0,
	first_name: null,
	email: null
};

export default function userReducer(state = initialState, action) {
	switch (action.type) {
		
		case LOGIN:	
			return {
				...state,
				user_role: action.payload.user_role,
				id: action.payload.id,
				first_name: action.payload.first_name,
				email: action.payload.email
			};
		case LOGOUT:
			return {
				...state,
				user_rol: 'Guest',
				id: 0,
				first_name: null,
				email: null
			};
		default:
			return state;
	}
}