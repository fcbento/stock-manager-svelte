<script>
    export let value;

    function typeAction(node){
        node.type = value.type;
    }
    
</script>

<input 
    placeholder="{value.displayName}"
    class="form-control" 
    use:typeAction 
    bind:value={value.field}>