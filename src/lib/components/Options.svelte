<script>
	import { options } from '$lib/stores';
	let { docWidth, docHeight, orientation } = $options;

	function setOptions() {
		if ($options.docWidth !== docWidth) $options.docWidth = docWidth;
		if ($options.docHeight !== docHeight) $options.docHeight = docHeight;
		if ($options.orientation !== orientation) $options.orientation = orientation;
	}
</script>

<section class="row fcenter nowrap">
	<label for="docWidth" class="row acenter nowrap">
    <p>Width</p>
		<input id="docWidth" type="number" bind:value={docWidth} on:blur={setOptions} />
    <span>mm</span>
	</label>
  
	<label for="docHeight" class="row acenter nowrap">
    <p>Height</p>
		<input id="docHeight" type="number" bind:value={docHeight} on:blur={setOptions} />
    <span>mm</span>
	</label>

	<select bind:value={orientation} on:change={setOptions}>
		<option value="p">Portrait</option>
		<option value="l">Landscape</option>
	</select>
</section>

<style lang="scss">
	section {
		position: fixed;
		bottom: 40px;
		left: 50%;
		transform: translateX(-50%);
    gap: 40px;
		background: rgba(#000, 0.8);
		backdrop-filter: blur(10px);
		border: 1px solid #666;
		border-radius: 1.5em;
		padding: 12px;
    padding-left: 24px;
	}
  
  label {
    width: 150px;
    color: #fff;
    font-size: 10px;
    text-transform: uppercase;
    border-bottom: 1px solid #666;
  }

  input, select {
    color: #fff;
  }
  
  input {
    width: 80px;
    padding-left: 10px;
    padding-right: 10px;
  }
  
  select {
    appearance: none;
    background: rgba(#000, 0.4);
    border: 1px solid #666;
    border-radius: 1em;
  }
</style>
