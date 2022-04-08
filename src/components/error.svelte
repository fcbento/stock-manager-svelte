<script>
    import { onMount, onDestroy } from "svelte";
    export let message;
    export let timeout;

    let hide = true;
    onMount(async () => {
        console.log('hide', hide)
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

