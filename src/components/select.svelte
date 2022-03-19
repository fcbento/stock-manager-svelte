<script>
    export let response;

    export let onChange = () => {
        if ("function" === typeof onChange) {
            onChange(selected);
        }
    };

    let selected;
</script>

<select class="form-control" bind:value={selected} on:blur={onChange}>
    <option value="Select">Select...</option>
    {#each response as res}
        <option value={res.categoryId}>
            {res.name}
        </option>
    {/each}
</select>
