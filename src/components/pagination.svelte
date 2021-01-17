<script>
    import { getAll, remove } from "../http/http";
    import Modal from "../components/modal.svelte";
    import Button from "../components/button.svelte";

    export let data;
    export let type;
    export let getEndpoint;

    let currentPage = data.number;
    let modalIsOpen = false;
    let modalBody;
    let pages = [];
    let clickedPage;
    
    const paginateForward = () => {
        if (!data.last) {
            currentPage++;
            clickedPage = currentPage;
            getItems(currentPage);
        }
    };

    const paginateBackward = () => {
       if (!data.first) {
            currentPage--;
            clickedPage = currentPage;
            getItems(currentPage);
        }
    };

    const paginateWithTotalPage = (page) => {
        clickedPage = page;
        getItems(page);
    };

    const moneyFormat = (item) => {
        return item.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
        });
    };

    let deleteItem = (item) => {
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

    //put inside a function
    for (let i = 0; i < data.totalPages; i++) {
        pages.push(i);
    }

</script>

{#if data}
    {#each data.content as item}
        <tr>
            <td>{item.name}</td>

            {#if type == "user"}
                <td>{item.lastName}</td>
                <td>{item.email}</td>
            {/if}

            {#if type == "product"}
                <td>{moneyFormat(item.price)}</td>
                <td>{item.quantity}</td>
                <td>{item.category.name}</td>
                <td>{moneyFormat(item.price * item.quantity)}</td>
            {/if}

            <td>
                <Button 
                    type={'modalDelete'} 
                    name={'Delete'} 
                    onDelete={() => deleteItem(item)} 
                    modalActionType={'delete'}
                />

                <Button 
                    type={'modalOpen'} 
                    name={'Edit'} 
                    onEdit={() => openModal(item)} 
                    modalActionType={'edit'}
                />
            </td>
        </tr>
    {/each}

    <div>
        {#if modalIsOpen}
            <Modal title={getCurrentUrl()} body={modalBody} modalSize={'modal-xl'} modalPosition={'right'}/>
        {/if}

        {#if !data.first}
            <button on:click={paginateBackward}>{"<"}</button>
        {/if}

        {#each pages as page}
            <button
                style="background: {page === clickedPage ? 'black' : ''}"
                class="btn btn-primary btn-sm btn-paginate"
                on:click={() => paginateWithTotalPage(page)}>
                {page + 1}
            </button>
        {/each}

        {#if !data.last}
            <button on:click={paginateForward}> {">"} </button>
        {/if}
    </div>
{/if}

<style>
    .btn-paginate{
        margin: 3px;
    }
</style>
