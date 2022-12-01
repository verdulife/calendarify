import { writable } from 'svelte/store';
import { PageSizes } from 'pdf-lib';

export const options = writable({
	docSize: PageSizes.A4,
	crop_marks: false
});

export const queue = writable({
	message: 'Start adding images or PDF',
	active: false
});
