<script>
    import Input from "../components/input.svelte";
    import Label from "../components/label.svelte";
    import Select from "../components/select.svelte";
    import Button from "../components/button.svelte";

    import { getAll, update } from "../http/http";

    export let body;
    export let title;
    export let modalSize;
    export let modalPosition;

    let selected;

    let saveChanges = () => {
        switch (title) {
            case "product":
                update(productReq(body), title);
                break;
            case "category":
                update(body, title);
                break;
            case "user":
                update(body, title);
                break;
        }
        window.location.reload();
    };

    const productReq = (body) => {
        return {
            productId: body.productId,
            name: body.name,
            price: parseInt(body.price),
            quantity: parseInt(body.quantity),
            category: {
                categoryId: selected,
            },
        };
    };

    const handleChange = (e) => {
        selected = e.target.value;
    };

    const handlePosition = () => {
        if (modalPosition === "right" && modalSize !== "modal-lg") {
            return "left: 820px; bottom: 20px;";
        }

        if (modalPosition === "right" && modalSize === "modal-lg") {
            return "left: 670px; bottom: 20px;";
        }
    };
</script>

<div class="modal fade" id="editModal">
    <div class="modal-dialog {modalSize}" style={handlePosition()}>
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title"> {title.toUpperCase()}</h5>
                <Button type={"closeModal"} />
            </div>

            <div class="modal-body">

                <!-- Category -->
                {#if title === "category"}
                    <div class="form-group">
                        <Label name={"Name"} />
                        <Input bind:value={body.name} isEdit={true} />
                    </div>
                {/if}

                <!-- Product -->
                {#if title === "product"}
                    <form>
                        <div class="form-group">
                            <Label name={"Name"} />
                            <Input bind:value={body.name} isEdit={true} />

                            <Label name={"Price"} />
                            <Input bind:value={body.price} isEdit={true} />

                            <Label name={"Quantity"} />
                            <Input bind:value={body.quantity} isEdit={true} />

                            {#await getAll("categories")}
                                <p>...loading</p>
                            {:then response}
                                <Label name={"Category"} />
                                <Select
                                    onChange={handleChange}
                                    response={response.content}
                                />
                            {:catch error}
                                <p style="color: red">{error.message}</p>
                            {/await}
                        </div>
                    </form>
                {/if}

                {#if title === "user"}
                    <form>
                        <div class="form-group">
                            <Label name={"Name"} />
                            <Input bind:value={body.name} isEdit={true} />

                            <Label name={"Last name"} />
                            <Input bind:value={body.lastName} isEdit={true} />

                            <Label name={"Email"} />
                            <Input bind:value={body.email} isEdit={true} />
                        </div>
                    </form>
                {/if}
            </div>

            <div class="modal-footer">
                <Button
                    type={"default"}
                    name={"Save changes"}
                    bind:handleClick={saveChanges}
                />
            </div>
        </div>
    </div>
</div>
