<script>
	import { onMount } from 'svelte';
	import { jsPDF } from 'jspdf';
	import { getCalendarData, currentYear } from '$lib/scripts/getCalendarData';

	const yearData = getCalendarData(currentYear, 'es-Es');
	let src;

	async function createPdf() {
		console.log(yearData);

		const doc = new jsPDF({
			orientation: 'p',
			unit: 'mm',
			format: [210, 297]
		});

		doc
			.setFontSize(30)
			.text(
				'esto es un texto ligeramente largo para hacer que se tenga de saltar la linea',
				10,
				10,
				{
					maxWidth: 210
				}
			);

		const blob = doc.output('bloburi');
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
