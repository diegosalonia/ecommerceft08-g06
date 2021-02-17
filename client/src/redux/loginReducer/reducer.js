import { LOGIN, LOGOUT, ADD_NEW_ADDRESS }  from '../constants';

const initialState = {
	user_role: 'Guest',
	id: 0,
	first_name: null,
	email: null,
	shipping_address: undefined,
	address: undefined,
	userComplete: {}
};

//id: req.user[0].dataValues.id, email: req.user[0].dataValues.email, user_role:req.user[0].dataValues.user_role

export default function userReducer(state = initialState, action) {
	switch (action.type) {
		case LOGIN:
			return {
				...state,
				user_role: action.payload.user.user_role,
				id: action.payload.user.id,
				first_name: action.payload.user.first_name,
				email: action.payload.user.email,
				shipping_address: action.payload.user.shipping_address,
				address: action.payload.user.address_line1,
				userComplete: action.payload
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