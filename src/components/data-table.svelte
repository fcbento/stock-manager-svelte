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
  import HttpHandler from "../http/http";

  export let tableDataSource;
  export let headers;
  export let columns;
  export let showCheckbox;
  export let endpoint;

  let httpHandler = new HttpHandler();

  let selected = [];
  let data = [];
  let result;
  let rowsPerPage = 10;
  let currentPage = 0;
  let end = 0;
  let start;

  onMount(async () => {
    const res = await tableDataSource.then((result) => result);
    console.log(res);
    result = res;
    currentPage = res.number;
    data = res.content;

    start = result.number * rowsPerPage;
    end = Math.min(start + rowsPerPage, result.totalElements);
  });

  const paginate = (type) => {

    switch (type) {

      case 'first':
        currentPage = 0;
        break;
      
        case 'prev':
        currentPage--;
        break;

      case 'next':
        currentPage++;
        break;

      case 'last':
        currentPage = result.totalPages;
        break;

      default:
        break;
    }

    return httpHandler.getAll(endpoint, currentPage, 10).then((res) => {
      data = res.content;
      result = res;

      start = result.number * rowsPerPage;
      end = Math.min(start + rowsPerPage, result.totalElements);
    });
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
      {start + 1}-{end} of {result?.totalElements}
    </svelte:fragment>

    <IconButton
      class="material-icons"
      action="first-page"
      title="First page"
      on:click={() => paginate('first')}
      disabled={result?.first}>first_page</IconButton
    >

    <IconButton
      class="material-icons"
      action="prev-page"
      title="Prev page"
      on:click={() => paginate('prev')}
      disabled={result?.first}>chevron_left</IconButton
    >

    <IconButton
      class="material-icons"
      action="next-page"
      title="Next page"
      on:click={() => paginate('next')}
      disabled={result?.last}>chevron_right</IconButton
    >

    <IconButton
      class="material-icons"
      action="last-page"
      title="Last page"
      on:click={() =>paginate('last')}
      disabled={result?.last}>last_page</IconButton
    >
  </Pagination>
</DataTable>

<pre class="status">Selected: {selected
    .map((option) => option.name)
    .join(", ")}</pre>
