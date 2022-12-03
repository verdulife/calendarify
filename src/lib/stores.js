import { writable } from 'svelte/store';

export const options = writable({
	docWidth: 148,
	docHeight: 210,
	orientation: "p",
	crop_marks: false,
	starts_monday: true
});

export const queue = writable({
	message: 'Start adding images or PDF',
	active: false
});
