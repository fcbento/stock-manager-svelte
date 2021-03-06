<script>
    import Input from "./input.svelte";
    import Label from "./label.svelte";
    import Select from "./select.svelte";
    import Button from "./button.svelte";

    import { create, getAll } from "../http/http";

    export let fields;
    export let endpoint;
    export let colSize;

    let selected;
    let showError = false;

    let save = () => {

        const o = toObject(fields);

        if (o) {

            if(!o){return};

            create(o, endpoint);
            showError = false;
            window.location.reload();
        }
    };

    const toObject = (arr) => {
        
        let obj = arr.reduce((o, key) => ({ ...o, [key.name]: key.field }), {});

        if (obj && obj.hasOwnProperty("category") && selected) {
            obj.category = {
                categoryId: selected,
            };
        }

        if (!isEmpty(obj)) {
            return obj;
        }
    };

    const handleChange = (e) => {
        selected = e.target.value;
    };

    const isEmpty = (obj) => {
        let notEmpty = false;

        Object.values(obj).filter((key) => {
            if (key == undefined || key == null || key == "") {
                notEmpty = true;
                showError = true;
            }
        });

        return notEmpty;
    };
</script>

<div class="{colSize} card p-4">

    {#if showError}
        <div class="alert alert-danger">
            Problem when trying to save. Please verify entered values.
        </div>
    {/if}

    {#each fields as field}
        <div class="form-group">
            <Label name={field.displayName} />

            {#if field.name !== "category"}
                <Input value={field} />
            {/if}

            {#if field.name === "category"}
                {#await getAll("categories", 0, 80)}
                    <p>...loading</p>
                {:then response}
                    <Select
                        onChange={handleChange}
                        response={response.content}
                    />
                {:catch error}
                    <p style="color: red">{error.message}</p>
                {/await}
            {/if}
        </div>
    {/each}

    <Button type={"default"} name={"Submit"} bind:handleClick={save} />
</div>
