<script>
    import Input from "../components/input.svelte";
    import Label from "../components/label.svelte";
    import Select from "../components/select.svelte";
    import Button from "../components/button.svelte";
    import Error from "./error.svelte"

    import HttpHandler from "../http/http";

    export let body;
    export let title;
    export let modalSize;
    export let modalPosition;
    export let endpoint;

    let httpHandler = new HttpHandler();
    let selected;
    let showError;

    let saveChanges = () => {
        switch (title) {
            case "product":

                if (!isEmpty(productReq(body))) {
                    httpHandler.update(productReq(body), endpoint);
                    window.location.reload();
                }
          
                break;
            case "category":
                httpHandler.update(body, endpoint);
                window.location.reload();
                break;
            case "user":
                httpHandler.update(body, endpoint);
                window.location.reload();
                break;
        }

    };

    const isEmpty = (obj) => {
    
        let notEmpty = false;
        
        if (obj) {
            Object.values(obj).filter((key) => {
                if (key == undefined || key == null || key == "") {
                    notEmpty = true;
                    showError = true;
                }
            });
        }else{
            notEmpty = true;
            showError = true;
        }

        return notEmpty;
    };

    const productReq = (body) => {
        if (selected) {
            return {
                productId: body.productId,
                name: body.name,
                price: parseInt(body.price),
                quantity: parseInt(body.quantity),
                category: {
                    categoryId: selected,
                },
            };
        }
    };

    const handleChange = (e) => {
        selected = e.target.value;
    };

    const handlePosition = () => {
        if (modalPosition === "right" && modalSize !== "modal-lg") {
            return "left: 714px; bottom: 21px;";
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
                <h5 class="modal-title">{title.toUpperCase()}</h5>
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

                            {#await httpHandler.getAll("categories")}
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
                <button on:click="{saveChanges}" class="btn btn-primary">Save changes</button>
            </div>

            {#if showError}
                <Error message={'Problem when trying to edit data. Please verify entered values.'} />
            {/if}
        </div>
    </div>
</div>
