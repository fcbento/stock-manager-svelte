<script>
    import HttpHandler from "../http/http";
    import Table from '../components/table.svelte';

    let httpHandler = new HttpHandler();
    let headers = ["Name", "Created At"];
    
</script>

<Table 
    type={'category'} 
    {headers} 
    body={httpHandler.getAll('categories', 0, 10)} 
    endpoint={'categories'} 
/>