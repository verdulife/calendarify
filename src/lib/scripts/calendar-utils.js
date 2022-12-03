import { options } from '$lib/stores';
import { santoral } from '$lib/santoral';

export const yearMonths = 12;
export const weekDays = 7;
export const currentYear = new Date().getFullYear();

export function getLastMonthDay(month, year) {
	const nextMonth = new Date(`${month + 1}/1/${year}`);
	const lastDay = new Date(nextMonth - 1).getDate();

	return lastDay || 31;
}

export function getWeekdays(language) {
	const startDay = new Date('11/27/2022');
	let weekdays = [];
	let startOnMonday;

	options.subscribe((value) => {
		const { starts_monday } = value;
		startOnMonday = starts_monday;
	});

	for (let w = 0; w < weekDays + 1; w++) {
		startDay.setDate(startDay.getDate() + (w === 0 ? 0 : 1));
		const weekday = new Intl.DateTimeFormat(language, { weekday: 'long' }).format(startDay);
		weekdays = [...weekdays, weekday];
	}

	startOnMonday ? weekdays.shift() : weekdays.pop();
	return weekdays;
}

export function getCalendarData(year, language) {
	let yearData = [];

	for (let m = 1; m <= yearMonths; m++) {
		const currentMonth = new Date(`${m}/1/${year}`);
		const lastMonthDay = getLastMonthDay(m, year);

		let monthData = {
			name: new Intl.DateTimeFormat(language, { month: 'long' }).format(currentMonth),
			number: new Intl.DateTimeFormat(language, { month: 'numeric' }).format(currentMonth),
			days: []
		};

		for (let d = 1; d <= lastMonthDay; d++) {
			const currentDay = new Date(`${m}/${d}/${year}`);
			const weekdayName = new Intl.DateTimeFormat(language, { weekday: 'long' }).format(currentDay);

			const dayData = {
				santoral: santoral[m - 1][d - 1],
				fullDate: new Intl.DateTimeFormat(language, { dateStyle: 'full' }).format(currentDay),
				number: new Intl.DateTimeFormat(language, { day: 'numeric' }).format(currentDay),
				weekday: {
					number: getWeekdays(language).indexOf(weekdayName),
					name: new Intl.DateTimeFormat(language, { weekday: 'long' }).format(currentDay)
				},
				month: {
					number: new Intl.DateTimeFormat(language, { month: 'numeric' }).format(currentDay),
					name: new Intl.DateTimeFormat(language, { month: 'long' }).format(currentDay)
				},
				year: new Intl.DateTimeFormat(language, { year: 'numeric' }).format(currentDay)
			};

			monthData.days = [...monthData.days, dayData];
		}

		yearData = [...yearData, monthData];
	}

	return yearData;
}
