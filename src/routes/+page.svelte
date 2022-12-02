<script>
	import { onMount } from 'svelte';
	import { jsPDF } from 'jspdf';
	import { getCalendarData, currentYear, getWeekdays } from '$lib/scripts/calendar-utils';
	import { capitalize } from '$lib/scripts/text-utils';

	const yearData = getCalendarData(currentYear, 'es-Es');
	const weekdayList = getWeekdays('es-Es');
	let src;

	async function createPdf() {
		const pageWidth = 210;
		const pageHeight = 297;

		const doc = new jsPDF({
			orientation: 'p',
			unit: 'mm',
			format: [pageWidth, pageHeight],
			putOnlyUsedFonts: true
		});

		const margin = 10;
		const marginWidth = pageWidth - margin * 2;
		const marginHeight = pageHeight - margin * 2;

		doc.stroke().rect(margin, margin, marginWidth, marginHeight);

		const monthColLength = 3;
		const monthRowLength = 4;
		const monthWidth = marginWidth / monthColLength;
		const monthHeight = marginHeight / monthRowLength;
		const monthMargin = 5;
		const monthMarginWidth = monthWidth - monthMargin * 2;
		const monthMarginHeight = monthHeight - monthMargin * 2;

		let monthPosX, monthPosY, monthContentX, monthContentY;
		let monthIndex = 0;

		for (let mr = 0; mr < monthRowLength; mr++) {
			for (let mc = 0; mc < monthColLength; mc++) {
				monthPosX = margin + monthWidth * mc;
				monthPosY = margin + monthHeight * mr;
				monthContentX = monthPosX + monthMargin;
				monthContentY = monthPosY + monthMargin + 5;

				doc.stroke().rect(monthPosX, monthPosY, monthWidth, monthHeight);

				const { name, days } = yearData[monthIndex];

				doc
					.setFontSize(12)
					.text(capitalize(name), monthContentX + monthMarginWidth / 2, monthContentY - 3, {
						maxWidth: monthMarginWidth,
						align: 'center',
						baseline: 'bottom'
					});

				const dayColLength = 7;
				const dayRowLength = 7;
				const dayWidth = monthMarginWidth / dayColLength;
				const dayHeight = monthMarginHeight / dayRowLength;
				const dayMargin = 1;
				const dayMarginWidth = dayWidth - dayMargin * 2;
				const startWeekday = days[0].weekday.number;

				let dayPosX, dayPosY, dayContentX, dayContentY;
				let dayIndex = 0;

				for (let dr = 0; dr < dayRowLength; dr++) {
					for (let dc = 0; dc < dayColLength; dc++) {
						dayPosX = monthContentX + dayWidth * dc;
						dayPosY = monthContentY + dayHeight * dr;
						dayContentX = dayPosX + dayMargin;
						dayContentY = dayPosY + dayMargin;

						doc.stroke().rect(dayPosX, dayPosY, dayWidth, dayHeight);

						if (dr === 0) {
							const wd = weekdayList[dc].substring(0, 2);
							doc.setFontSize(8).text(capitalize(wd), dayContentX, dayContentY, {
								maxWidth: dayMarginWidth,
								baseline: 'top'
							});

							continue;
						}

						if (dr === 1 && dc < startWeekday) continue;

						if (days[dayIndex]) {
							doc.setFontSize(8).text(days[dayIndex].number, dayContentX, dayContentY, {
								maxWidth: dayMarginWidth,
								baseline: 'top'
							});
						} else {
							doc.setFontSize(8).text('', dayContentX, dayContentY, {
								maxWidth: dayMarginWidth,
								baseline: 'top'
							});
						}

						dayIndex++;
					}
				}

				monthIndex++;
			}
		}

		doc.setProperties({
			title: 'Calendarify™',
			subject: 'Calendarify™',
			author: 'Calendarify™',
			keywords: 'Calendarify™',
			creator: 'Calendarify™'
		});

		const blob = doc.output('bloburi', 'filename');
		src = blob + '#view=fit';
	}

	onMount(createPdf);
</script>

<iframe class="fill" {src} title="preview" />

<style lang="scss">
	iframe {
		background: #000;
	}
</style>
