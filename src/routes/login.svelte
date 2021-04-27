<script>
    import Form from '../components/form.svelte';

    let fields = [
        {
            name: "email",
            displayName: "Email",
            type: "text",
        },
        {
            name: "password",
            displayName: "Password",
            type: "password",
        },
    ];

</script>

<Form {fields} endpoint={"login"}/>
