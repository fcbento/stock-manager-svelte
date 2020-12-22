<script>
    import FormTable from "../components/form-table.svelte";
    import { getAll } from "../http/http";

    let fields = [
        {
            name: "name",
            displayName: "Name",
            type: "text",
        }
    ];

    let headers = ["Name"];
    
</script>

<FormTable
    {fields}
    {headers}
    endpoint={'category'}
    colSize={'col-4'}
    type={'category'}
    body={getAll('categories', 0, 10)}
    getEndpoint={'categories'} />
