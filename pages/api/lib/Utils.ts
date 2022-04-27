
export function generateRandomString(N=6) {
	// Returns an alphanumeric string of N characters
	let result           = '';
	const characters       = 'abcdefghijklmnopqrstuvwxyz_';
	const charactersLength = characters.length;
	for ( var i = 0; i < N; i++ ) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
 return result;
}
