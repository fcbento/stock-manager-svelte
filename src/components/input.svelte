<script>
    export let value;
    export let isEdit = false;

    function typeAction(node) {
        node.type = value.type;
    }
</script>

{#if !isEdit}
    <input
        placeholder={value.displayName}
        class="form-control"
        use:typeAction
        bind:value={value.field} />
{/if}

{#if isEdit}
    <input
        class="form-control"
        use:typeAction
        bind:value={value} />
{/if}
