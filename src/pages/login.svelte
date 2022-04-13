<script>
    import Card, { Content, Actions } from "@smui/card";
    import Button, { Label } from "@smui/button";
    import Textfield from "@smui/textfield";
    import HttpHandler from "../http/http";
    import Error from "../components/error.svelte";
    import Icon from "@smui/textfield/icon";

    const http = new HttpHandler();
    const endpoint = "login";
    const timeout = 2000;
    const errorMessage = "Something went wrong. Please verify entered values";

    let error = false;
    let email = "";
    let password = "";

    const loginUser = () => {
        http.create({ email, password }, endpoint).then((data) => {
            data.status === 200 ? (error = false) : (error = true);
            handleError();
        });
    };

    const forgotPassword = () => {
        console.log("forgotPassword");
    };

    const handleError = () => {
        setTimeout(() => {
            error = false;
        }, timeout);
    };
</script>

<Card>
    <Content>
        <Textfield
            type="email"
            label="Email"
            bind:value={email}
            style="min-width: 100%;"
        >
            <Icon class="material-icons" slot="leadingIcon">email</Icon>
        </Textfield>
        <br />

        <Textfield
            type="password"
            label="Password"
            bind:value={password}
            style="min-width: 100%;"
        >
            <Icon class="material-icons" slot="leadingIcon">lock</Icon>
        </Textfield>
    </Content>

    <Actions>
        <Button on:click={loginUser}>
            <Label>Login</Label>
        </Button>

        <Button on:click={forgotPassword}>
            <Label>Forgot Password</Label>
        </Button>
    </Actions>
</Card>

{#if error}
    <Error message={errorMessage} {timeout} />
{/if}
