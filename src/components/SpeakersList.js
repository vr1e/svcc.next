import { useContext } from 'react';
import ReactPlaceholder from 'react-placeholder';
import { data } from '../../SpeakerData';
import { SpeakerFilterContext } from '../contexts/SpeakerFilterContext';
import useRequestRest, { REQUEST_STATUS } from '../hooks/useRequestRest';
import Speaker from './Speaker';
import SpeakerAdd from './SpeakerAdd';

export default function SpeakersList() {
	const {
		data: speakersData,
		requestStatus,
		error,
		insertRecord,
		updateRecord,
		deleteRecord,
	} = useRequestRest();

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
				<SpeakerAdd eventYear={eventYear} insertRecord={insertRecord} />
				<div className='row'>
					{speakersData
						.filter(speaker => {
							return (
								speaker.first
									.toLowerCase()
									.includes(searchQuery.toLowerCase()) ||
								speaker.last.toLowerCase().includes(searchQuery.toLowerCase())
							);
						})
						.filter(speaker => {
							return speaker.sessions.find(session => {
								return session.eventYear === eventYear;
							});
						})
						.map(speaker => (
							<Speaker
								key={speaker.id}
								speaker={speaker}
								insertRecord={insertRecord}
								updateRecord={updateRecord}
								deleteRecord={deleteRecord}
							/>
						))}
				</div>
			</ReactPlaceholder>
		</div>
	);
}
