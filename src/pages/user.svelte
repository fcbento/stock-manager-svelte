<script>
    import LayoutGrid, {Cell} from "@smui/layout-grid";
    import Table from "../components/data-table.svelte";
    import { fetchUsers, users } from "../stores/users";
    let headers = ["Name", "Email", "Role"];
    let columns = [
        {
            name: "name",
        },
        {
            name: "email",
        },
        {
            name: "role",
        },
    ];

    let pagination = {};

    const fetchUsersPaginated = () => {
        fetchUsers(pagination.rowsPerPage, pagination.page);
    };
</script>

<LayoutGrid>
    <Cell span={12}>
        <Table
            {headers}
            {columns}
            tableDataSource={$users}
            showCheckbox={true}
            bind:value={pagination}
            on:submit={fetchUsersPaginated}
        />
    </Cell>
</LayoutGrid>
