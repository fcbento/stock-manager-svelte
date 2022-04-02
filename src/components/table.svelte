<script>
    import Pagination from "../components/pagination.svelte";
    import Modal from "../components/modal.svelte";
    import Button from "../components/button.svelte";
    import HttpHandler from "../http/http";
    import { onMount } from "svelte";
    import { moneyFormat } from "../utils/money-format";
    import { dateFormat } from "../utils/date-format";

    export let type;
    export let body;
    export let headers;
    export let endpoint;
    export let columns;
    export let showCheckbox;
    export let editable;

    let httpHandler = new HttpHandler();
    let modalBody;
    let modalIsOpen = false;
    let data = [];
    let size = 0;
    let response;
    let selectedItems = [];

    onMount(async () => {
        const res = await body.then((result) => result);
        response = res;

        size = res.totalElements;
        data = res.content;
    });

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

    const getObjectProperty = (data, column) => {
        let value = "";

        if (column.isDate) {
            value = dateFormat(data[column.name]);
        } else if (column.isObject) {
            value = data[column.name].name;
        } else if (column.isTotal) {
            value = moneyFormat(
                column.calc(
                    data[column.fieldToCalcX],
                    data[column.fieldToCalcY]
                )
            );
        } else if (column.isCurrency) {
            value = moneyFormat(data[column.name]);
        } else {
            value = data[column.name];
        }

        return value;
    };

    const getCheckBoxValue = (event, item) => {
        if (event.target.checked) {
            selectedItems = addItemToArray(item);
        } else {
            selectedItems = removeItemToArray(selectedItems.indexOf(item));
        }
    };

    const addItemToArray = (item) => {
        return [...selectedItems, item];
    };

    const removeItemToArray = (index) => {
        if (index > -1) selectedItems.splice(index, 1);
        return selectedItems;
    };
</script>

<h3>Total : {size}</h3>
<table class="table col">
    <thead>
        {#each headers as item}
            <th>{item}</th>
        {/each}
    </thead>

    <tbody>
        {#if showCheckbox && selectedItems.length > 0}
            Delete {selectedItems.length}
        {/if}

        {#each data as item}
            <tr>
                {#if showCheckbox}
                    <td>
                        <input
                            type="checkbox"
                            on:click={getCheckBoxValue(event, item)}
                        />
                    </td>
                {/if}

                {#each columns as column}
                    <td>
                        {#if column.isImage}
                            <span class="material-icons"> image </span>
                        {:else if column.name === "name" && editable}
                            <Button
                                type={"modalOpen"}
                                name={getObjectProperty(item, column)}
                                onEdit={() => openModal(item)}
                                modalActionType={"edit"}
                            />
                        {:else}
                            {getObjectProperty(item, column)}
                        {/if}
                    </td>
                {/each}
                <!-- <td>
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
                </td> -->
            </tr>
        {/each}
        {#if response}
            <Pagination data={response} {type} {endpoint} bind:getData />
        {/if}
    </tbody>
</table>

{#if modalIsOpen}
    <Modal
        title={getCurrentUrl()}
        body={modalBody}
        modalSize={"modal-xl"}
        modalPosition={"right"}
        {endpoint}
    />
{/if}
