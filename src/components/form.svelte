<script>
    export let fields;
    export let endpoint;
    export let colSize;

    import Input from "./input.svelte";
    import { create, getAll } from "../http/http";

    let selected;

    const save = () => {
        create(toObject(fields), endpoint);
        window.location.reload();
    };

    const toObject = (arr) => {
        let obj = {};
        obj = arr.reduce((o, key) => ({ ...o, [key.name]: key.field }), {});

        if (obj.hasOwnProperty("category")) {
            obj.category = {
                categoryId: selected,
            };
        }

        return obj;
    };
</script>

<style>
    
</style>

<div class="{colSize} card p-4">
    {#each fields as field}
        <div class="form-group">
            <label for="exampleInputEmail1">{field.displayName}</label>

            {#if field.name !== 'category'}
                <Input value={field} />
            {/if}

            {#if field.name === 'category'}
                {#await getAll('categories')}
                    <p>...loading</p>
                {:then response}
                    <select class="form-control" bind:value={selected}>
                        <option value="Select">Select...</option>
                        {#each response as res}
                            <option value={res.categoryId}>{res.name}</option>
                        {/each}
                    </select>
                {:catch error}
                    <p style="color: red">{error.message}</p>
                {/await}
            {/if}
        </div>
    {/each}

    <button class="btn btn-primary" on:click={save}>Submit</button>
</div>
