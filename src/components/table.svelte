<script>
    export let type;
    export let body;
    export let headers;
</script>

{#await body}
    <p>...loading</p>
{:then response}
    <table class="table table-striped">
        
        <thead>
            {#each headers as item}
                <th>{item}</th>
            {/each}
        </thead>
       
        <tbody>
            {#each response as item}
                <tr>
                 
                    <td>{item.name}</td>

                    {#if type == 'user'}
                        <td>{item.lastName}</td>
                        <td>{item.email}</td>
                    {/if}
                    <td>
                        <button class="btn btn-danger btn-sm">Delete</button>
                        <button class="btn btn-info btn-sm">Edit</button>
                    </td>
                </tr>
            {/each}
        </tbody>

    </table>
{:catch error}
    <p style="color: red">{error.message}</p>
{/await}
