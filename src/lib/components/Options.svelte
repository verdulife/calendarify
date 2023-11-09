<script>
	import { options } from '$lib/stores';
	let { docWidth, docHeight, orientation, santoral, boxed, year } = $options;

	function setOptions() {
		if ($options.docWidth !== docWidth) $options.docWidth = docWidth;
		if ($options.docHeight !== docHeight) $options.docHeight = docHeight;
		if ($options.orientation !== orientation) $options.orientation = orientation;
		if ($options.santoral !== santoral) $options.santoral = santoral;
		if ($options.boxed !== boxed) $options.boxed = boxed;
		if ($options.year !== year) $options.year = year;
	}
</script>

<section class="col">
	<label for="year" class="col xfill">
		<p>Year</p>
		<div class="row acenter xfill nowrap">
			<input id="year" type="number" bind:value={year} on:blur={setOptions} />
			<span>mm</span>
		</div>
	</label>

	<label for="docWidth" class="col xfill">
		<p>Width</p>
		<div class="row acenter xfill nowrap">
			<input id="docWidth" type="number" bind:value={docWidth} on:blur={setOptions} />
			<span>mm</span>
		</div>
	</label>

	<label for="docHeight" class="col xfill">
		<p>Height</p>
		<div class="row acenter xfill nowrap">
			<input id="docHeight" type="number" bind:value={docHeight} on:blur={setOptions} />
			<span>mm</span>
		</div>
	</label>

	<label for="orientation" class="col xfill">
		<p>Orientation</p>
		<select id="orientation" class="xfill" bind:value={orientation} on:change={setOptions}>
			<option value="p">Portrait</option>
			<option value="l">Landscape</option>
		</select>
	</label>

	<!-- <label for="santoral" class="col xfill">
		<p>Santoral</p>
		<select id="santoral" class="xfill" bind:value={santoral} on:change={setOptions}>
			<option value={true}>Yes</option>
			<option value={false}>No</option>
		</select>
	</label> -->

	<label for="boxed" class="col xfill">
		<p>Boxed</p>
		<select id="boxed" class="xfill" bind:value={boxed} on:change={setOptions}>
			<option value={true}>Yes</option>
			<option value={false}>No</option>
		</select>
	</label>
</section>

<style lang="scss">
	section {
		position: fixed;
		top: 50%;
		left: 0;
		transform: translateY(-50%);
		width: 250px;
		gap: 40px;
		background: rgba(#000, 0.8);
		backdrop-filter: blur(10px);
		border: 1px solid #666;
		border-radius: 1.5em;
		padding: 2em 1.5em;
		margin: 1em;
	}

	label {
		color: #fff;
		font-size: 10px;
		text-transform: uppercase;
		border-bottom: 1px solid #666;
	}

	span {
		padding-right: 10px;
	}

	input,
	select {
		color: #fff;
		padding-left: 10px;
		padding-right: 10px;
	}

	input {
		width: 170px;
	}

	select {
		appearance: none;
	}
</style>
