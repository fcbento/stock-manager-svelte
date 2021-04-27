<script>
    import FormTable from "../components/form-table.svelte";
    import HttpHandler from "../http/http";
    
    let httpHandler = new HttpHandler();

    let fields = [
        {
            name: "name",
            displayName: "Name",
            type: "text",
        }
    ];

    let headers = ["Name"];
    
</script>

<FormTable
    {fields}
    {headers}
    endpoint={'categories'}
    colSize={'col-4'}
    type={'category'}
    body={httpHandler.getAll('categories', 0, 10)}
/>
