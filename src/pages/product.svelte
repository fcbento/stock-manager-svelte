<script>
    import Table from '../components/data-table.svelte';
    import {fetchProducts, products} from '../stores/products';

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
	
    let pagination = {};

    const fetchProductsPaginated = () => {
        fetchProducts(pagination.rowsPerPage, pagination.page);
	}
    
</script>

<Table
    headers={headers}
    columns={columns}
    tableDataSource={($products)}
    endpoint={'products'}
    showCheckbox={true}
    bind:value={pagination} 
    on:submit={fetchProductsPaginated}
/>