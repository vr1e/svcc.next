import SpeakersList from './SpeakersList';
import SpeakersToolbar from './SpeakersToolbar';
import { SpeakerFilterProvider } from '../contexts/SpeakerFilterContext';

export default function Speakers() {
	return (
		<SpeakerFilterProvider startingShowSessions={false}>
			<SpeakersToolbar />
			<SpeakersList />
		</SpeakerFilterProvider>
	);
}
