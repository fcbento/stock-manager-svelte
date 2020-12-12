<script>
    export let fields;
    export let endpoint;

    import Input from "./input.svelte";
    import {create} from '../http/http';

    function cadastrar() {
        create(toObject(fields), endpoint);
        //check it later
        window.location.reload();
        //check
    }

    function toObject(arr) {
        let object = {};
        object = arr.reduce((o, key) => ({ ...o, [key.name]: key.field }), {});
        return object;
    }
</script>

<style>
</style>

<div class="card p-4">
    
    {#each fields as field}
        <div class="form-group">
            <label for="exampleInputEmail1">{field.displayName}</label>
           
            {#if field.name !== 'category'}
                 <Input value={field} />
            {/if}
           

            {#if field.name === 'category'}
                <select
                    class="form-control"
                    placeholder="Enter {field.displayName}"
                    bind:value={field.field} />
            {/if}

        </div>
    {/each}

    <button class="btn btn-primary" on:click={cadastrar}>Submit</button>

</div>
