<script>
    import Input from "./input.svelte";
    import Label from "./label.svelte";
    import Select from './select.svelte';
    import Button from './button.svelte';

    import { create, getAll } from "../http/http";
    
    export let fields;
    export let endpoint;
    export let colSize;

    let selected;

    let save = () => {
        create(toObject(fields), endpoint);
    };

    const toObject = (arr) => {

        let obj = arr.reduce((o, key) => ({ ...o, [key.name]: key.field }), {});

        if (obj && obj.hasOwnProperty("category")) {
            obj.category = {
                categoryId: selected,
            };
        }

        return obj;
    };

    const handleChange = (e) => {
        selected = e.target.value;
    };

</script>

<div class="{colSize} card p-4">
    {#each fields as field}
        <div class="form-group">
            <Label name={field.displayName}></Label>

            {#if field.name !== 'category'}
                <Input value={field} />
            {/if}

            {#if field.name === 'category'}
                {#await getAll('categories', 0, 80)}
                    <p>...loading</p>
                {:then response}
                    <Select onChange={handleChange} response={response.content}/>
                {:catch error}
                    <p style="color: red">{error.message}</p>
                {/await}
            {/if}
        </div>
    {/each}
    
    <Button type={'default'} name={'Submit'} bind:handleClick={save}/>
</div>
