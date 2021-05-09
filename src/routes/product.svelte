<script>
    import Form from "../components/form.svelte";
    import Table from "../components/table.svelte";
    import HttpHandler from "../http/http";
    import FormTable from "../components/form-table.svelte";

    let httpHandler = new HttpHandler();

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
            name: "image",
            displayName: "Image URL",
            type: "text",
        },
        {
            name: "category",
            displayName: "Category",
            type: "text",
        }
    ];

    let headers = ["Name", "Price", "Quantity", "Image URL", "Category", "Total"];
    
</script>

<FormTable
    {fields}
    {headers}
    endpoint={'products'}
    colSize={'col-4'}
    type={'product'}
    body={httpHandler.getAll('products', 0, 10)}
 />
