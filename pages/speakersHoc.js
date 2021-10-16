import withData from '../src/components/withData';

function Speakers({ speakers }) {
	return (
		<div>
			{speakers.map(({ imageSrc, name }) => {
				return <img src={`images/${imageSrc}.jpg`} alt={name} key={imageSrc} />;
			})}
		</div>
	);
}

export default withData(2)(Speakers);
