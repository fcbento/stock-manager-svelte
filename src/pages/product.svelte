<script>
    import Table from "../components/data-table.svelte";
    import { fetchProducts, products } from "../stores/products";
    import LayoutGrid, { Cell } from "@smui/layout-grid";
    import Accordion, { Panel, Header, Content } from "@smui-extra/accordion";
    import IconButton, { Icon } from "@smui/icon-button";

    //create model
    const headers = [
        "Name",
        "Price",
        "Quantity",
        "Image URL",
        "Category",
        "Created At",
        "Total",
    ];
    //create model
    const columns = [
        {
            name: "name",
        },
        {
            name: "price",
            isCurrency: true,
        },
        {
            name: "quantity",
        },
        {
            name: "image",
            isImage: true,
        },

        {
            name: "category",
            isObject: true,
        },
        {
            name: "createdAt",
            isDate: true,
        },
        {
            name: "total",
            isTotal: true,
            fieldToCalcX: "price",
            fieldToCalcY: "quantity",
            calc: (x, y) => x * y,
        },
    ];

    let productsList = false;
    let addProduct = false;

    let pagination = {};

    const fetchProductsPaginated = () => {
        fetchProducts(pagination.rowsPerPage, pagination.page);
    };
</script>

<LayoutGrid>
    <Cell span={12}>
        <div class="accordion-container">
            <Accordion>

                <Panel bind:open={productsList}>
                    <Header>
                        Products List
                        <span slot="description"> Total: {$products.totalElements}</span>
                        <IconButton slot="icon" toggle pressed={productsList}>
                            <Icon class="material-icons" on>expand_less</Icon>
                            <Icon class="material-icons">expand_more</Icon>
                        </IconButton>
                    </Header>
                    <Content>
                        <Table
                            {headers}
                            {columns}
                            tableDataSource={$products}
                            endpoint={"products"}
                            showCheckbox={true}
                            bind:value={pagination}
                            on:submit={fetchProductsPaginated}
                        />
                    </Content>
                </Panel>

                <Panel bind:open={addProduct}>
                    <Header>
                        Add Product
                        <IconButton slot="icon" toggle pressed={addProduct}>
                            <Icon class="material-icons" on>expand_less</Icon>
                            <Icon class="material-icons">expand_more</Icon>
                        </IconButton>
                    </Header>
                    <Content>
                        add new product
                    </Content>
                </Panel>
            </Accordion>
        </div>
    </Cell>
</LayoutGrid>
