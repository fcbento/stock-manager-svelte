<script>
    import Form from "../components/form.svelte";
    import Table from "../components/table.svelte";
    import { getAll } from "../http/http";
    
    let endpoint = "category";

    let fields = [
        {
            name: "name",
            displayName: "Name",
            type: "text",
        }
    ];

    let headers = ['Name'];

</script>

<Form {fields} {endpoint} />

<Table 
    type={'category'} 
    {headers} 
    body={getAll('categories')}
/>
