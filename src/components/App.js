import { AuthProvider } from '../contexts/AuthContext';
import Header from './Header';
import Layout from './Layout';
import Speakers from './Speakers';

export default function App() {
	return (
		<AuthProvider initialLoggedInUser='Ronald'>
			<Layout startingTheme='light'>
				<Header />
				<Speakers />
			</Layout>
		</AuthProvider>
	);
}
