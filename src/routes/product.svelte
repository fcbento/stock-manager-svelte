<script>
    import Form from "../components/form.svelte";
    import Table from "../components/table.svelte";
    import { getAll } from "../http/http";
    import FormTable from "../components/form-table.svelte";

    let fields = [
        {
            name: "name",
            displayName: "Name",
            type: "text",
        },
        {
            name: "quantity",
            displayName: "Quantity",
            type: "number",
        },
        {
            name: "price",
            displayName: "Price",
            type: "number",
        },
        {
            name: "category",
            displayName: "Category",
            type: "text",
        }
    ];

    let headers = ["Name", "Price", "Quantity", "Category", "Total"];
    
</script>

<FormTable
    {fields}
    {headers}
    endpoint={'product'}
    colSize={'col-4'}
    type={'product'}
    body={getAll('products', 0, 10)}
    getEndpoint={'products'} />
