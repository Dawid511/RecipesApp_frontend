import React, {FC} from "react";
import {useForm} from "@mantine/form";
import {Button, Container, Divider, Paper, PasswordInput, TextInput, Title} from "@mantine/core";
import {useNavigate} from "react-router-dom";
import {login} from "./api/login";
import {registerErrorNotification} from "./notifications";
import {register} from "./api/register";

type LoginFormType = {
    email: string;
    password: string;
}

type RegisterFormType = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export const LoginPage: FC = () => {
    const navigate = useNavigate();
    const form = useForm<LoginFormType>({
        initialValues: {
            email: '',
            password: '',
        },
    });

    const form2 = useForm<RegisterFormType>({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
        },
    });

    const handleSubmit = async (data: LoginFormType) => {
        try {
            await login(data.email, data.password);
            navigate('/recipe');
        } catch (error) {
            registerErrorNotification();
        }
    }

    const handleSubmitRegistration = async (data: RegisterFormType) => {
        try {
            await register(data.firstName, data.lastName, data.email, data.password);
            navigate('/login');
        } catch (error) {
            registerErrorNotification();
        }
    }

    return (
        <Container size="lg" style={{paddingTop: '5vh', height: "100vh"}}>
            <Paper withBorder shadow="md" p="xl" radius="md"
                   style={{
                       height: 'auto',
                       display: 'flex',
                       flexDirection: 'column',
                       justifyContent: 'top'
                   }}>
                <div style={{
                    display: 'flex',
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}>
                    <form onSubmit={form.onSubmit(handleSubmit)} style={{flex: 1, padding: '20px'}}>
                        <Title order={3}>Logowanie</Title>
                        <TextInput required label="adres e-mail" placeholder="Twój e-mail"
                                   style={{marginBottom: '1rem'}} {...form.getInputProps('email')} />
                        {/*<TextInput required label="Hasło" placeholder="Twoje hasło"*/}
                        {/*           style={{marginBottom: '1rem'}} {...form.getInputProps('password')} />*/}
                        <PasswordInput required label="Hasło" placeholder="podaj hasło"
                                       style={{marginBottom: '1rem'}} {...form.getInputProps('password')} />
                        <Button fullWidth type="submit">Zaloguj się</Button>

                    </form>
                    <Divider orientation="vertical" size="lg"
                             style={{height: 'auto', padding: '10px'}}/>

                    <form onSubmit={form2.onSubmit(handleSubmitRegistration)} style={{flex: 1}}>
                        <Title order={3}>Zarejestruj się</Title>
                        <TextInput required label="Imię" placeholder="podaj imię"
                                   style={{marginBottom: '1rem'}} {...form2.getInputProps('firstName')} />
                        <TextInput required label="Nazwisko" placeholder="podaj nazwisko"
                                   style={{marginBottom: '1rem'}} {...form2.getInputProps('lastName')} />
                        <PasswordInput required label="Hasło" placeholder="podaj hasło"
                                       style={{marginBottom: '1rem'}} {...form2.getInputProps('password')} />
                        <TextInput required label="Adres e-mail" placeholder="podaj email"
                                   style={{marginBottom: '1rem'}} {...form2.getInputProps('email')} />
                        <Button fullWidth type="submit">Zarejestruj się</Button>
                    </form>
                </div>
            </Paper>
        </Container>
    );
}
