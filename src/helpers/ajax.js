//JQuery loaded by rails?? or another module?...
import { ajaxLogging } from '../../config';

function generateMethod (type) {
	return (url, headers, data) => {
		return new Promise( (success, error) => {
			$.ajax({
				url,
				type,
				headers,
				data,
				success: function () {
					if(ajaxLogging) console.log(arguments, arguments[2].getResponseHeader('access-token'));
					success(arguments);
				},
				error: function(e) {
					if(ajaxLogging) console.log(arguments, e.getResponseHeader('access-token'));
					error(e);
				}
			})
		})	
	}
}

export const ajax = {
	post: generateMethod('POST'),

	put: generateMethod('PUT'),
	
	get: generateMethod('GET'),

	delete: generateMethod('DELETE'),	
};

export default ajax;

