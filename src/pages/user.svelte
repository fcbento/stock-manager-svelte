<script>
    import { onMount } from 'svelte';

    import Table from '../components/data-table.svelte';
    import {fetchUsers, users} from '../stores/users';
    let headers = ["Name", "Email", "Role"];
    let columns = [
        {
            name: 'name'
        },
        {
            name: 'email'
        },
        {
            name: 'role'
        }
    ]
    	
    onMount(async () => {
        console.log('mounted')
        //fetchUsers();
    });

    let pagination = {};

    const fetchUsersPaginated = () => {
        fetchUsers(pagination.rowsPerPage, pagination.page);
	}

  
</script>

<Table
    headers={headers}
    columns={columns}
    tableDataSource={($users)}
    showCheckbox={true}
    bind:value={pagination} 
    on:submit={fetchUsersPaginated}
/>