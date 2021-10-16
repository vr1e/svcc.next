import { createContext, useState } from 'react';

const AuthContext = createContext();

function AuthProvider({ children, initialLoggedInUser }) {
	const [loggedInUser, setLoggedInUser] = useState(initialLoggedInUser);
	return (
		<AuthContext.Provider value={{ loggedInUser, setLoggedInUser }}>
			{children}
		</AuthContext.Provider>
	);
}

export { AuthContext, AuthProvider };
