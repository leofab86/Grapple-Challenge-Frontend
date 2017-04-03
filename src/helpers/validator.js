

const validator = {
	loginForm: (form, type) => {
		var isValid = true;

		//---------------Backend is taking care of validation for now...-----------------

		// if (type === 'signup') {
		// 	if (form.password_confirmation !== form.password) {
		// 		form.errors.password_confirmation = 'Passwords do not match.';
		// 		isValid = false;
		// 	}					
		// }

		// if (form.email.length < 3) {
		// 	form.errors.email = 'Username must be at least 3 characters.';
		// 	isValid = false;
		// }		

		// if (form.password.length < 3) {
		// 	form.errors.password = 'Password must be at least 3 characters.';
		// 	isValid = false;
		// }

		// if (!isValid) return form.errors;

		return isValid;
	},
	
	method: () => {
		
	},

	method2: () => {
		
	}	
};

export default validator;