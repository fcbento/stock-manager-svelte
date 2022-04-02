<script>
    import HttpHandler from "../http/http";
    import Table from '../components/table.svelte';
    
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
    editable={true}
    {columns}
    type={'user'} 
    {headers} 
    body={httpHandler.getAll('users', 0, 10)} 
    endpoint={'users'} 
/>