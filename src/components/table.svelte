<script>
    import { remove } from "../http/http";
    import Modal from '../components/modal.svelte';

    export let type;
    export let body;
    export let headers;

    let length;
    let modalIsOpen = false;
    let modalBody;

    const moneyFormat = (item) => {
        return item.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
        });
    };

    const deleteItem = (item) => {
        switch (getCurrentUrl()) {
            case "product":
                remove({ productId: item.productId }, getCurrentUrl());
                break;
            case "category":
                remove({ categoryId: item.categoryId }, getCurrentUrl());
                break;
            case "user":
                remove({ userId: item.userId }, getCurrentUrl());
                break;
        }
        window.location.reload();
    };

    const openModal = (item) => {
        modalBody = item;
        modalIsOpen = true;
    };

    const getCurrentUrl = () => {
        return window.location.pathname.split("/")[2];
    };

    const getResponse = (res) => {
        length = res.length;
        return res;
    };

</script>

{#await body}
    <p>...loading</p>
{:then response}
    <h3>Total : {length}</h3>
    <table class="table table-striped">
        <thead>
            {#each headers as item}
                <th>{item}</th>
            {/each}
        </thead>

        <tbody>
            {#each getResponse(response) as item}
                <tr>
                    <td>{item.name}</td>

                    {#if type == 'user'}
                        <td>{item.lastName}</td>
                        <td>{item.email}</td>
                    {/if}

                    {#if type == 'product'}
                        <td>{moneyFormat(item.price)}</td>
                        <td>{item.quantity}</td>
                        <td>{item.category.name}</td>
                        <td>{moneyFormat(item.price * item.quantity)}</td>
                    {/if}

                    <td>
                        <button
                            class="btn btn-danger btn-sm"
                            on:click={deleteItem(item)}>Delete</button>
                        <button
                            class="btn btn-info btn-sm"
                            on:click={openModal(item)}
                            data-toggle="modal"
                            data-target="#editModal">Edit</button>
                    </td>
                </tr>
            {/each}
        </tbody>
    </table>

    {#if modalIsOpen}
        <Modal title={getCurrentUrl()} body={modalBody}/>
    {/if}


{:catch error}
    <p style="color: red">{error.message}</p>
{/await}
