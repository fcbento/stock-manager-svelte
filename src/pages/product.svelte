<script>
    //import Table from "../components/table.svelte";
    import HttpHandler from "../http/http";
    import Table from '../components/data-table.svelte';
    const httpHandler = new HttpHandler();
    //create model
    const headers = ["Name", "Price", "Quantity", "Image URL", "Category", "Created At", "Total"];
    //create model
    const columns = [
        {
            name: 'name',
        },
        {
            name: 'price',
            isCurrency: true
        },
        {
            name: 'quantity'
        },
        {
            name: 'image',
            isImage: true
        },
     
        {
            name: 'category',
            isObject: true
        },
        {
            name: 'createdAt',
            isDate: true
        },
        {
            name: 'total',
            isTotal: true,
            fieldToCalcX: 'price',
            fieldToCalcY: 'quantity',
            calc: (x, y) => x * y
        }
    ]
    
</script>

<Table
    headers={headers}
    columns={columns}
    tableDataSource={httpHandler.getAll('products', 0, 10)}
    showCheckbox={true}
/>