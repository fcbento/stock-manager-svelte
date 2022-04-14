<script lang="ts">
  import DataTable, {
    Head,
    Body,
    Row,
    Cell,
    Pagination,
  } from "@smui/data-table";
  import Checkbox from "@smui/checkbox";
  import { onMount } from "svelte";
  import { tableColumns } from "../utils/table-columns";
  import Select, { Option } from "@smui/select";
  import IconButton from "@smui/icon-button";
  import { Label } from "@smui/common";
	import { createEventDispatcher } from 'svelte';

  export let tableDataSource;
  export let headers;
  export let columns;
  export let showCheckbox;
	export let value = {};

  let selected = [];
  let rowsPerPage = 10;
  let currentPage = 0;
  let end = 0;
  let start;

	const dispatch = createEventDispatcher();
  const submit = () => dispatch('submit');
  
  onMount(async () => {
    start = tableDataSource.number * rowsPerPage;
    end = Math.min(start + rowsPerPage, tableDataSource.totalElements);
  });

  const paginate = (type) => {
    getPagedType(type);
    emitPaginationValues(rowsPerPage);
    setStartEndAfterChanges();
  };

  const eventChange = (rowsPerPage) => {
    emitPaginationValues(rowsPerPage);
    setStartEndAfterChanges();
  };

  const emitPaginationValues = (rowsPerPage = 10) => {
    value = {rowsPerPage, page: currentPage};
    submit();
  }

  const setStartEndAfterChanges = () => {
    start = currentPage * rowsPerPage;
    end = Math.min(start + rowsPerPage, tableDataSource.totalElements);
  }

  const getPagedType = (type) => {
    const types = {
      first: () => (currentPage = 0),
      prev: () => currentPage--,
      next: () => currentPage++,
      last: () => (currentPage = tableDataSource.totalPages - 1),
    };

    return types[type]();
  };

</script>

<!-- svelte-ignore missing-declaration -->
<DataTable style="max-width: 100%; margin-top: 90px">
  <Head>
    <Row>
      {#if showCheckbox}
        <Cell checkbox>
          <Checkbox />
        </Cell>
      {/if}

      {#each headers as header}
        <Cell>{header}</Cell>
      {/each}
    </Row>
  </Head>

  <Body>
    {#each tableDataSource?.content as item}
      <Row>
        {#if showCheckbox}
          <Cell checkbox>
            <Checkbox bind:group={selected} value={item} valueKey={item.id} />
          </Cell>
        {/if}

        {#each columns as column}
          <Cell>
            {tableColumns(item, column)}
          </Cell>
        {/each}
      </Row>
    {/each}
  </Body>

  <Pagination slot="paginate">
    <svelte:fragment slot="rowsPerPage">
      <Label>Rows Per Page</Label>
      <Select variant="outlined" bind:value={rowsPerPage} noLabel>
        <Option value={10} on:click={() => eventChange(10)}>10</Option>
        <Option value={25} on:click={() => eventChange(25)}>25</Option>
        <Option value={100} on:click={() => eventChange(100)}>100</Option>
      </Select>
    </svelte:fragment>

    <svelte:fragment slot="total">
      {start + 1}-{end} of {tableDataSource?.totalElements}
    </svelte:fragment>

    <IconButton
      class="material-icons"
      action="first-page"
      title="First page"
      on:click={() => paginate("first")}
      disabled={tableDataSource?.first}>first_page</IconButton
    >

    <IconButton
      class="material-icons"
      action="prev-page"
      title="Prev page"
      on:click={() => paginate("prev")}
      disabled={tableDataSource?.first}>chevron_left</IconButton
    >

    <IconButton
      class="material-icons"
      action="next-page"
      title="Next page"
      on:click={() => paginate("next")}
      disabled={tableDataSource?.last}>chevron_right</IconButton
    >

    <IconButton
      class="material-icons"
      action="last-page"
      title="Last page"
      on:click={() => paginate("last")}
      disabled={tableDataSource?.last}>last_page</IconButton
    >
  </Pagination>
</DataTable>

<pre class="status">Selected: {selected
    .map((option) => option.name)
    .join(", ")}</pre>
