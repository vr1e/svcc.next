import { useState } from 'react';
import { data } from '../../SpeakerData';
import Speaker from './Speaker';

export default function SpeakersList({ showSessions }) {
	const [speakersData, setSpeakersData] = useState(data);

	function onFavoriteToggle(id) {
		const speakersRecPrevious = speakersData.find(rec => {
			return rec.id === id;
		});

		const speakersRecUpdated = {
			...speakersRecPrevious,
			favorite: !speakersRecPrevious.favorite,
		};

		const speakersDataNew = speakersData.map(rec => {
			return rec.id === id ? speakersRecUpdated : rec;
		});

		setSpeakersData(speakersDataNew);
	}

	return (
		<div className='container speakers-list'>
			<div className='row'>
				{speakersData.map(speaker => (
					<Speaker
						key={speaker.id}
						speaker={speaker}
						showSessions={showSessions}
						onFavoriteToggle={() => {
							onFavoriteToggle(speaker.id);
						}}
					/>
				))}
			</div>
		</div>
	);
}
