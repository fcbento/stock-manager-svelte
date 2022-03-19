<script>
    import HttpHandler from "../http/http";
    import Table from '../components/table.svelte';
    
    let httpHandler = new HttpHandler();
    let headers = ["Name", "Description", "Active"];
    
</script>

<Table 
    type={'supplier'} 
    {headers} 
    body={httpHandler.getAll('suppliers', 0, 10)} 
    endpoint={'suppliers'} 
/>