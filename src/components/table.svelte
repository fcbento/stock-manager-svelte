<script>
    import Pagination from "../components/pagination.svelte";

    export let type;
    export let body;
    export let headers;
    export let endpoint;
    export let getEndpoint;

    let length;

    const getResponse = (res) => {
        length = res.totalElements;
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
            <Pagination data={getResponse(response)} {type} {endpoint} {getEndpoint}/>
        </tbody>
    </table>

{:catch error}
    <p style="color: red">{error.message}</p>
{/await}
