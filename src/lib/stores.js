import { writable } from 'svelte/store';

const currentYear = new Date().getFullYear();

export const options = writable({
	docWidth: 297,
	docHeight: 420,
	orientation: 'p',
	santoral: false,
	onePage: true,
	crop_marks: false,
	starts_monday: true,
	year: currentYear,
	boxed: false,
	monthsize: '10px',
	daysize: '8px',
	santoralsize: '6px'
});

export const queue = writable({
	message: 'Start adding images or PDF',
	active: false
});
