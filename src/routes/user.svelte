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
            name: "lastName",
            displayName: "Last name",
            type: "text",
        },
        {
            name: "email",
            displayName: "Email",
            type: "email",
        }
    ];

    let headers = ["Name", "Last name", "Email"];
    
</script>

<FormTable
    {fields}
    {headers}
    endpoint={'users'}
    colSize={'col-4'}
    type={'user'}
    body={httpHandler.getAll('users', 0, 10)}
/>
