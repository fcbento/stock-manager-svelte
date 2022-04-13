<script>
    import HttpHandler from "../http/http";
    //import Table from '../components/table.svelte';
    import Table from '../components/data-table.svelte';
    
    let httpHandler = new HttpHandler();
    let headers = ["Name", "Email", "Role"];
    let columns = [
        {
            name: 'name'
        },
        {
            name: 'email'
        },
        {
            name: 'role'
        }
    ]
    
</script>

<Table 
    headers={headers}
    columns={columns}
    tableDataSource={httpHandler.getAll('users', 0, 10)}
    showCheckbox={false}
/>