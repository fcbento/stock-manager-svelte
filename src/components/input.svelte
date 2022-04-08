<script>
  export let value;
  export let isEdit = false;
  import Textfield from "@smui/textfield";

  let focused = false;
  let dirty = false;
  let invalid = false;
  $: disabled = focused || !value || !dirty || invalid;
  function typeAction(node) {
    node.type = value.type;
  }

  value.field = "";
</script>

{#if !isEdit}
    <Textfield
      type={value.name}
      bind:dirty
      bind:invalid
      updateInvalid
      bind:value={value.field}
      label={value.displayName}
      style="min-width: 450px;"
      input$autocomplete="email"
      on:focus={() => (focused = true)}
      on:blur={() => (focused = false)}
      withTrailingIcon={!disabled}
    />
  <!-- <input
      placeholder={value.displayName}
      class="form-control"
      use:typeAction
      bind:value={value.field} /> -->
{/if}

{#if isEdit}
  <input class="form-control" use:typeAction bind:value />
{/if}
