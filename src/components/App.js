import Header from './Header';
import Layout from './Layout';
import Speakers from './Speakers';

export default function App() {
	return (
		<Layout startingTheme='light'>
			<Header />
			<Speakers />
		</Layout>
	);
}
