<!-- <script>
    export let type;
    export let name;
    export let modalActionType;
    export let handleClick = () => console.log("testing");
    import Button, { Label } from '@smui/button';

    export let onDelete = (e) => {
        if ("function" === typeof onDelete) {
            onDelete(e);
        }
    };

    export let onEdit = (e) => {
        if ("function" === typeof onEdit) {
            onEdit(e);
        }
    };

</script>

{#if type === 'default'}
    <Button 
        style="width: 50%" 
        on:click={handleClick} 
        variant="unelevated">
        <Label>{name}</Label>
    </Button>
{/if}

<!-- {#if type === 'link'}
    <button
        style="width: 50%"
        class="btn btn-link"
        on:click={handleClick}>
        {name}
    </button>
{/if}

{#if modalActionType === "edit" && type !== "modalOpen"}
    <button
        class="btn btn-info"
        on:click={() => onEdit()}>
        {name}
    </button>
{/if}

{#if modalActionType === "delete"}
    <button
        class="btn btn-danger btn-sm"
        on:click={() => onDelete()}>
        {name}
    </button>
{/if}


{#if type === "closeModal"}
    <button 
        type="button" 
        class="close" 
        data-dismiss="modal" 
        aria-label="Close">
        <span aria-hidden="true">&times;</span>
    </button>
{/if}

{#if type === "modalOpen"}
    <button 
        class="btn btn-link btn-sm"
        on:click={() => onEdit()}
        data-toggle="modal"
        data-target="#editModal">{name}
    </button>
{/if} --> -->
