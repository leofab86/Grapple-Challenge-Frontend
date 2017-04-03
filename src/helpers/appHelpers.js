import toastr from 'toastr';


export function toastrMsg (type, msg) {
	if(type !== 'success' && type !== 'error') throw new Error(`Incorrect toastr type '${type}', expecting 'success' or 'error'`);
	toastr.options.positionClass = 'toast-top-center';
	toastr[type](msg)
}

export function errorHandler (e) {
	console.error(e);
	const response = e.responseJSON;
	const errors = (response) ? response.error || response.errors.full_messages || response.errors : null;
	if(!errors) throw new Error(`Not reading response or response has no error`);
	if (Array.isArray(errors)) { errors.map( value => toastrMsg('error', value) ) }
	else toastrMsg('error', errors)	
}