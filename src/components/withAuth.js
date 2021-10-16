import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

export default function withAuth(Component) {
	return function (props) {
		const { loggedInUser, setLoggedInUser } = useContext(AuthContext);

		return (
			<Component
				loggedInUser={loggedInUser}
				setLoggedInUser={setLoggedInUser}
				{...props}
			/>
		);
	};
}
