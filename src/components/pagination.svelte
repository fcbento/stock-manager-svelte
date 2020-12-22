<script>
    import { getAll, remove } from "../http/http";
    import Modal from "../components/modal.svelte";

    export let data;
    export let type;
    export let getEndpoint;

    let currentPage = data.number;
    let modalIsOpen = false;
    let modalBody;

    const paginateForward = () => {
        if (!data.last) {
            currentPage++;
            getItems(currentPage);
        }
    };

    const paginateBackward = () => {
        if (!data.first) {
            currentPage--;
            getItems(currentPage);
        }
    };

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

    const getItems = (currentPage) => {
        getAll(getEndpoint, currentPage, 10).then((res) => {
            data = res;
        });
    };

</script>

{#if data}
    {#each data.content as item}
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
                    on:click={deleteItem(item)}>Delete
                </button>

                <button
                    class="btn btn-info btn-sm"
                    on:click={openModal(item)}
                    data-toggle="modal"
                    data-target="#editModal">Edit
                </button>
            </td>
        </tr>
    {/each}

    {#if modalIsOpen}
        <Modal title={getCurrentUrl()} body={modalBody} />
    {/if}

    <div>
        {#if !data.first}<button on:click={paginateBackward}>{'<'}</button>{/if}

        {#if !data.last}<button on:click={paginateForward}> {'>'} </button>{/if}
    </div>
{/if}
