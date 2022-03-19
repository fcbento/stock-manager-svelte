<script>
    import Table from "../components/table.svelte";
    import HttpHandler from "../http/http";

    let httpHandler = new HttpHandler();
    let headers = ["Name", "Price", "Quantity", "Image URL", "Category", "Created At", "Total"];
    
</script>

<Table 
    type={'product'} 
    {headers} 
    body={httpHandler.getAll('products', 0, 10)} 
    endpoint={'products'} 
/>