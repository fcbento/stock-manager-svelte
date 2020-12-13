<script>
    import Input from "../components/input.svelte";
    import { getAll, update } from "../http/http";

    export let body;
    export let title;

    let selected;

    const saveChanges = () => {
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
</script>

<div
    class="modal fade"
    id="editModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalCenterTitle"
    aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">
                    {title.toUpperCase()}
                </h5>
                <button
                    type="button"
                    class="close"
                    data-dismiss="modal"
                    aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>

            <div class="modal-body">
                <!-- Category -->
                {#if title === 'category'}
                    <form>
                        <div class="form-group">
                            <label
                                for="recipient-name"
                                class="col-form-label">Name
                            </label>
                            <Input bind:value={body.name} isEdit={true} />
                        </div>
                    </form>
                {/if}

                <!-- Product -->
                {#if title === 'product'}
                    <form>
                        <div class="form-group">
                            <label
                                for="recipient-name"
                                class="col-form-label">Name
                            </label>
                            <Input bind:value={body.name} isEdit={true} />
                            <label
                                for="recipient-name"
                                class="col-form-label">Price
                            </label>
                            <Input bind:value={body.price} isEdit={true} />
                            <label
                                for="recipient-name"
                                class="col-form-label">Quantity
                            </label>
                            <Input bind:value={body.quantity} isEdit={true} />
                            {#await getAll('categories')}
                                <p>...loading</p>
                            {:then response}
                                <label
                                    for="recipient-name"
                                    class="col-form-label">Category
                                </label>
                                <select
                                    class="form-control"
                                    bind:value={selected}>
                                    <option value="Select">Select...</option>
                                    {#each response as res}
                                        <option value={res.categoryId}>
                                            {res.name}
                                        </option>
                                    {/each}
                                </select>
                            {:catch error}
                                <p style="color: red">{error.message}</p>
                            {/await}
                        </div>
                    </form>
                {/if}

                {#if title === 'user'}
                    <form>
                        <div class="form-group">
                            <label
                                for="recipient-name"
                                class="col-form-label">Name
                            </label>
                            <Input bind:value={body.name} isEdit={true} />
                            <label
                                for="recipient-name"
                                class="col-form-label">Last name
                            </label>
                            <Input bind:value={body.lastName} isEdit={true} />
                            <label
                                for="recipient-name"
                                class="col-form-label">Email
                            </label>
                            <Input bind:value={body.email} isEdit={true} />
                        </div>
                    </form>
                {/if}
            </div>

            <div class="modal-footer">
                <button
                    type="button"
                    class="btn btn-secondary"
                    data-dismiss="modal">Close</button>
                <button
                    type="button"
                    class="btn btn-primary"
                    on:click={saveChanges}>Save changes</button>
            </div>
        </div>
    </div>
</div>
