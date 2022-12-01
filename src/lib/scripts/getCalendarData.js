export function getCalendarData(year, language) {
	const startDate = new Date(`01/01/${year}`);
	const longYear = new Date(`02/29/${year}`).getDate() === 29;
	const yearDays = longYear ? 366 : 365;
	let yearData = [];

	for (let d = 0; d < yearDays; d++) {
		startDate.setDate(startDate.getDate() + (d === 0 ? 0 : 1));

		const dayData = {
			fullDate: new Intl.DateTimeFormat(language, { dateStyle: 'full' }).format(startDate),
			day: new Intl.DateTimeFormat(language, { day: 'numeric' }).format(startDate),
			weekday: new Intl.DateTimeFormat(language, { weekday: 'long' }).format(startDate),
			month_number: new Intl.DateTimeFormat(language, { month: 'numeric' }).format(startDate),
			month_text: new Intl.DateTimeFormat(language, { month: 'long' }).format(startDate),
			year: new Intl.DateTimeFormat(language, { year: 'numeric' }).format(startDate)
		};

		yearData = [...yearData, dayData];
	}

	return yearData;
}

export const currentYear = new Date().getFullYear();
