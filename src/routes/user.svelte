<script>
    import Form from '../components/form.svelte';
    import Table from "../components/table.svelte";
    import { getAll } from "../http/http";

    let fields = [
        {
            name: 'name',
            displayName: 'Name',
            type: 'text'
        },
        {
            name: 'lastName',
            displayName: 'Last name',
            type: 'text'
        },
        {
            name: 'email',
            displayName: 'Email',
            type: 'email'
        }
    ]

    let headers = ['Name', 'Last name', 'Email'];
</script>

<Form {fields} endpoint={'user'} />

<Table 
    type={'user'} 
    {headers} 
    body={getAll('users')}
/>