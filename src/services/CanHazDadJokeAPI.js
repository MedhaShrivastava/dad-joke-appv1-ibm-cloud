import axios from 'axios'


//Returns Dad joke from icanhazdad joke API (in JSON format)
export async function getDadJoke(){

	return axios({
		method: 'get',
		url: `https://icanhazdadjoke.com/`,
		headers: {'Accept': 'application/json'}
	})
		.catch(function (error){
			if (error.response) {
		      // Server error response
		      return error.response
		    } else if (error.request) {
		      // No response from server
		      return error.request
		    } else {
		      // Some other error
		      return error.message
		    }
		})

}