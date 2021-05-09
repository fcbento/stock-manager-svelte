<script>
    import Pagination from "../components/pagination.svelte";
    import Modal from "../components/modal.svelte";
    import Button from "../components/button.svelte";
    import HttpHandler from "../http/http";
    import { onMount } from "svelte";

    export let type;
    export let body;
    export let headers;
    export let endpoint;

    let httpHandler = new HttpHandler();
    let modalBody;
    let modalIsOpen = false;
    let data = [];
    let size = 0;
    let response;

    onMount(async () => {
        const res = await body.then((result) => result);
        response = res;
      
        size = res.totalElements;
        data = res.content;
    });

    const moneyFormat = (item) => {
        if (item) {
            return item.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
            });
        }else{
            return '-'
        }
    };

    let deleteItem = (item) => {

        switch (getCurrentUrl()) {
            case "product":
                httpHandler.remove(item.productId, endpoint);
                break;
            case "category":
                httpHandler.remove(item.categoryId, endpoint);
                break;
            case "user":
                httpHandler.remove({ userId: item.userId }, endpoint);
                break;
            case "supplier":
                httpHandler.remove(item.id, endpoint);
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

    let getData = async (e) => {
        data = await e.then((result) => result.content);
    };

</script>

<h3>Total : {size}</h3>
<table class="table table-striped">
    <thead>
        {#each headers as item}
            <th>{item}</th>
        {/each}
    </thead>

    <tbody>
        {#each data as item}
            <tr>
                <td>{item.name}</td>

                {#if type == "user"}
                    <td>{item.email}</td>
                    <td>{item.role === 1 ? 'ADMIN' : 'CLIENT'}</td>
                {/if}

                {#if type == "product"}
                    <td>{moneyFormat(item.price)}</td>
                    <td>{item.quantity}</td>
                    <td>{item.image ? 'YES' : 'NO'}</td>
                    <td>{item.category.name}</td>
                    <td>{moneyFormat(item.price * item.quantity)}</td>
                {/if}

                {#if type == "supplier"}
                    <td>{item.description}</td>
                    <td>{item.active ? 'Yes' : 'No'}</td>
                {/if}

                <td>
                    <Button
                        type={"modalDelete"}
                        name={"Delete"}
                        onDelete={() => deleteItem(item)}
                        modalActionType={"delete"}
                    />

                    <Button
                        type={"modalOpen"}
                        name={"Edit"}
                        onEdit={() => openModal(item)}
                        modalActionType={"edit"}
                    />
                </td>
            </tr>
        {/each}
        {#if response}
            <Pagination
                data={response}
                {type}
                {endpoint}
                bind:getData
            />
        {/if}
    </tbody>
</table>

{#if modalIsOpen}
    <Modal
        title={getCurrentUrl()}
        body={modalBody}
        modalSize={"modal-xl"}
        modalPosition={"right"}
        endpoint={endpoint}
    />
{/if}
