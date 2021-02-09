import { LOGIN, LOGOUT, ADD_NEW_ADDRESS }  from '../constants';

const initialState = {
	user_role: 'Guest',
	id: 0,
	first_name: null,
	email: null,
	shipping_address: undefined
};

export default function userReducer(state = initialState, action) {
	switch (action.type) {
		
		case LOGIN:	
			return {
				...state,
				user_role: action.payload.user_role,
				id: action.payload.id,
				first_name: action.payload.first_name,
				email: action.payload.email,
				shipping_address: action.payload.shipping_address
			};
		case LOGOUT:
			return {
				...state,
				user_rol: 'Guest',
				id: 0,
				first_name: null,
				email: null
			};
		case ADD_NEW_ADDRESS:
			return {
				...state,
				shipping_address: action.address
			};
		default:
			return state;
	}
}