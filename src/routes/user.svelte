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
            name: "email",
            displayName: "Email",
            type: "email",
        },
        {
            name: "password",
            displayName: "Password",
            type: "password",
        },
        {
            name: "role",
            displayName: "Role",
            type: "number",
        }
    ];

    let headers = ["Name", "Email", "Role"];
    
</script>

<FormTable
    {fields}
    {headers}
    endpoint={'users'}
    colSize={'col-4'}
    type={'user'}
    body={httpHandler.getAll('users', 0, 10)}
/>
