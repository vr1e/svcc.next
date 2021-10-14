import { useEffect, useState } from 'react';
import axios from 'axios';

export const REQUEST_STATUS = {
	LOADING: 'loading',
	SUCCESS: 'success',
	FAILURE: 'failure',
};

const restUrl = 'api/speakers';

export default function useRequestRest() {
	const [data, setData] = useState([]);
	const [requestStatus, setRequestStatus] = useState(REQUEST_STATUS.LOADING);
	const [error, setError] = useState('');

	const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

	useEffect(() => {
		async function delayFunc() {
			try {
				const result = await axios.get(restUrl);
				// throw 'Had error!';
				setRequestStatus(REQUEST_STATUS.SUCCESS);
				setData(result.data);
			} catch (e) {
				setRequestStatus(REQUEST_STATUS.FAILURE);
				setError(e);
			}
		}
		delayFunc();
	}, []);

	function updateRecord(record, doneCallback) {
		const originalRecords = [...data];
		const newRecords = data.map(rec => {
			return rec.id === record.id ? record : rec;
		});

		async function delayFunction() {
			try {
				setData(newRecords);
				await axios.put(`${restUrl}/${record.id}`, record);

				if (doneCallback) {
					doneCallback();
				}
			} catch (error) {
				console.log('error thrown inside delayFunction', error);
				if (doneCallback) {
					doneCallback();
				}
				setData(originalRecords);
			}
		}

		delayFunction();
	}

	function insertRecord(record, doneCallback) {
		const originalRecords = [...data];
		const newRecords = [record, ...data];

		async function delayFunction() {
			try {
				setData(newRecords);
				await axios.post(`${restUrl}/99999`, record);

				if (doneCallback) {
					doneCallback();
				}
			} catch (error) {
				console.log('error thrown inside delayFunction', error);
				if (doneCallback) {
					doneCallback();
				}
				setData(originalRecords);
			}
		}

		delayFunction();
	}

	function deleteRecord(record, doneCallback) {
		const originalRecords = [...data];
		const newRecords = data.filter(rec => rec.id != record.id);

		async function delayFunction() {
			try {
				setData(newRecords);
				await axios.delete(`${restUrl}/${record.id}`, record);

				if (doneCallback) {
					doneCallback();
				}
			} catch (error) {
				console.log('error thrown inside delayFunction', error);
				if (doneCallback) {
					doneCallback();
				}
				setData(originalRecords);
			}
		}

		delayFunction();
	}

	return {
		data,
		requestStatus,
		error,
		insertRecord,
		updateRecord,
		deleteRecord,
	};
}
