<script>
    import HttpHandler from "../http/http";
    import Table from '../components/table.svelte';
    
    let httpHandler = new HttpHandler();
    let headers = ["Name", "Email", "Role"];
    
</script>

<Table 
    type={'user'} 
    {headers} 
    body={httpHandler.getAll('users', 0, 10)} 
    endpoint={'users'} 
/>