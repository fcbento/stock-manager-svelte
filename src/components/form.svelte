<script>
    import Input from "./input.svelte";
    import Label from "./label.svelte";
    import Select from "./select.svelte";
    import Button from "./button.svelte";
    import Error from "./error.svelte";

    import HttpHandler from "../http/http";

    export let fields;
    export let endpoint;
    export let colSize;

    let selected;
    let active;
    let showError = false;
    let httpHandler = new HttpHandler();

    let save = () => {
        const o = toObject(fields);

        if (o) {
            httpHandler.create(o, endpoint).then((data) => {
                if (data.status === 201) {
                    showError = false;
                    window.location.reload();
                } else {
                    showError = true;
                }
            });
        }
    };

    const toObject = (arr) => {
        let obj = arr.reduce((o, key) => ({ ...o, [key.name]: key.field }), {});

        if (obj && obj.hasOwnProperty("category") && selected) {
            obj.category = {
                categoryId: selected,
            };
        }

        if (obj && obj.hasOwnProperty("description")) {
            obj.active = active;
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
        <Error
            message={"Problem when trying to save. Please verify entered values."}
        />
    {/if}

    {#each fields as field}
        <div class="form-group">
            <Label name={field.displayName} />

            {#if field.name !== "category" && field.name !== "active"}
                <Input value={field} />
            {/if}

            {#if field.name === "category"}
                {#await httpHandler.getAll("categories", 0, 80)}
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

            {#if field.name === "active"}
                <select name="active" id="active" bind:value={active}>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                </select>
            {/if}
        </div>
    {/each}

    <Button type={"default"} name={"Submit"} bind:handleClick={save} />
</div>
