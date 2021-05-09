<script>
    import FormTable from "../components/form-table.svelte";
    import HttpHandler from "../http/http";
    
    let httpHandler = new HttpHandler();

    let fields = [
        {
            name: "name",
            displayName: "Name",
            type: "text",
        },
        {
            name: "description",
            displayName: "Description",
            type: "text"
        },
        {
            name: "active",
            displayName: "Active",
            type: "text"
        },
        
    ];

    let headers = ["Name", "Description", "Active"];
    
</script>

<FormTable
    {fields}
    {headers}
    endpoint={'suppliers'}
    colSize={'col-4'}
    type={'supplier'}
    body={httpHandler.getAll('suppliers', 0, 10)}
/>
