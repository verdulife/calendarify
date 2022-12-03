import { writable } from 'svelte/store';

export const options = writable({
	docWidth: 297,
	docHeight: 420,
	orientation: "p",
	crop_marks: false,
	starts_monday: true
});

export const queue = writable({
	message: 'Start adding images or PDF',
	active: false
});
