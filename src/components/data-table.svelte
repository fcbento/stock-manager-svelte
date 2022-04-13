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

  export let tableDataSource;
  export let headers;
  export let columns;
  export let showCheckbox;

  let selected = [];
  let data = [];
  let result;
  let items = [];
  let rowsPerPage = 10;
  let currentPage = 0;

  $: start = currentPage * rowsPerPage;
  $: end = Math.min(start + rowsPerPage, items.length);
  $: slice = items.slice(start, end);
  $: lastPage = Math.max(Math.ceil(items.length / rowsPerPage) - 1, 0);

  onMount(async () => {
    const res = await tableDataSource.then((result) => result);
    console.log(res)
    result = res.totalElements;
    currentPage = res.page;
    data = res.content;
  });


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
    {#each data as item}
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
        <Option value={10}>10</Option>
        <Option value={25}>25</Option>
        <Option value={100}>100</Option>
      </Select>
    </svelte:fragment>
    <svelte:fragment slot="total">
      {start + 1}-{end} of {result}
    </svelte:fragment>

    <IconButton
      class="material-icons"
      action="first-page"
      title="First page"
      on:click={() => (currentPage = 0)}
      disabled={currentPage === 0}>first_page</IconButton
    >
    <IconButton
      class="material-icons"
      action="prev-page"
      title="Prev page"
      on:click={() => currentPage--}
      disabled={currentPage === 0}>chevron_left</IconButton
    >
    <IconButton
      class="material-icons"
      action="next-page"
      title="Next page"
      on:click={() => currentPage++}
      disabled={currentPage === lastPage}>chevron_right</IconButton
    >
    <IconButton
      class="material-icons"
      action="last-page"
      title="Last page"
      on:click={() => (currentPage = lastPage)}
      disabled={currentPage === lastPage}>last_page</IconButton
    >
  </Pagination>
</DataTable>

<pre class="status">Selected: {selected
    .map((option) => option.name)
    .join(", ")}</pre>
