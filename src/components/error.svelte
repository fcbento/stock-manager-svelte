<script>
    import { onMount, onDestroy } from "svelte";
    export let message;
    export let timeout;

    let hide = true;

    onMount(async () => {
        hideErrorMessage();
    });

    const hideErrorMessage = () => {
        setTimeout(() => {
            hide = false;
        }, timeout);
    }
</script>

{#if hide}
    <div class="alert alert-danger">
        {message}
    </div>
{/if}

