<script>
    import { getAll } from "../http/http";
    import { onMount } from "svelte";

    export let data;
    export let getData;
    export let endpoint;

    let currentPage = data.number;
    let pages = [];
    let clickedPage = 0;

    onMount(() => {
        for (let i = 0; i < data.totalPages; i++) {
            pages.push(i);
        }
    });

    const paginate = (type, page) => {
      
        type == "forward"
            ? currentPage = currentPage + 1
            : currentPage = currentPage - 1;

        type == "paged" 
            ? currentPage = page
            : 0;

        clickedPage = currentPage;

        return getAll(endpoint, currentPage, 10).then((res) => {
            return (data = res);
        });
    };
</script>

<div class="paginated d-flex justify-content-center">
    <button
        class="btn btn-default"
        on:click={() => getData(paginate("backward", 0))}
        disabled={data.first}>{"<"}
    </button>

    {#each pages as page}
        <button
            style="background: {page === clickedPage ? 'black' : ''}"
            class="btn btn-primary btn-paginate"
            on:click={() => getData(paginate("paged", page))}
            disabled={clickedPage == page}>
            {page + 1}
        </button>
    {/each}

    <button
        class="btn btn-default"
        on:click={() => getData(paginate("forward", 0))}
        disabled={data.last}>
        {">"}
    </button>
</div>

<style>

    .paginated{
        margin: 20px;
    }

    .btn-paginate {
        margin: 4px;
        font-size: 15px;
        cursor: pointer;
    }

    .btn:focus {
        box-shadow: none;
    }

</style>
