<script>
    import Login from "./login.svelte";
    import LayoutGrid, { Cell } from "@smui/layout-grid";
</script>

<LayoutGrid fixedColumnWidth>
    <Cell span={2}/>
    <Cell span={7} style="margin-top: 300px"> 
        <Login />
    </Cell>
</LayoutGrid>