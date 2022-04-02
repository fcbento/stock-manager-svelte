<script>
    import HttpHandler from "../http/http";
    import Table from "../components/table.svelte";

    const httpHandler = new HttpHandler();

    //create model
    const headers = ["", "Name", "Created At"];

    //create model
    const columns = [
        {
            name: "name"
        },
        { 
            name: "createdAt",
            isDate: true
        }
    ];
</script>

<Table
    showCheckbox={true}
    {columns}
    type={"category"}
    {headers}
    body={httpHandler.getAll("categories", 0, 10)}
    endpoint={"categories"}
/>
