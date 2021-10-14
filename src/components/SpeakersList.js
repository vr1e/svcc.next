import ReactPlaceholder from 'react-placeholder';
import { data } from '../../SpeakerData';
import useRequestDelay, { REQUEST_STATUS } from '../hooks/useRequestDelay';
import Speaker from './Speaker';
import { SpeakerFilterContext } from '../contexts/SpeakerFilterContext';
import { useContext } from 'react';

export default function SpeakersList() {
	const {
		data: speakersData,
		requestStatus,
		error,
		updateRecord
	} = useRequestDelay(2000, data);

	const { searchQuery, eventYear } = useContext(SpeakerFilterContext);

	if (requestStatus === REQUEST_STATUS.FAILURE)
		return (
			<div className='text-danger'>
				ERROR: <b>loading Speaker Data Failed {error}</b>
			</div>
		);

	// if (isLoading === true) return <div>Loading...</div>;

	return (
		<div className='container speakers-list'>
			<ReactPlaceholder
				type='media'
				rows={15}
				className='speakers-list-placeholder'
				ready={requestStatus === REQUEST_STATUS.SUCCESS}>
				<div className='row'>
					{speakersData
						.filter((speaker) => {
							return (
								speaker.first.toLowerCase().includes(searchQuery.toLowerCase()) ||
								speaker.last.toLowerCase().includes(searchQuery.toLowerCase())
							);
						})
						.filter((speaker) => {
							return speaker.sessions.find((session) => {
								return session.eventYear === eventYear;
							});
						})
						.map((speaker) => (
							<Speaker
								key={speaker.id}
								speaker={speaker}
								onFavoriteToggle={(doneCallback) => {
									updateRecord(
										{ ...speaker, favorite: !speaker.favorite },
										doneCallback
									);
								}}
							/>
						))}
				</div>
			</ReactPlaceholder>
		</div>
	);
}
