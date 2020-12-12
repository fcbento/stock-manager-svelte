<script>
    import Form from '../components/form.svelte';
    
    let fields = [
        {
            name: 'name',
            displayName: 'Name',
            type: 'text'
        },
        {
            name: 'quantity',
            displayName: 'Quantity',
            type: 'number'
        },
        {
            name: 'price',
            displayName: 'Price',
            type: 'number'
        },
        {
            name: 'category',
            displayName: 'Category',
            type: 'text'
        }
    ]
</script>

<Form {fields}/>