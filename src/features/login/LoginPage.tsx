import React, {FC, useState} from "react";
import {useForm} from "@mantine/form";
import {Button, Container, Divider, Notification, Paper, PasswordInput, TextInput, Title} from "@mantine/core";
import {useNavigate} from "react-router-dom";
import {login} from "./api/login";
import {registerErrorNotification} from "./notifications";
import {register} from "./api/register";
import {RecipeFormValues} from "../../types/RecipeFormValues";
import {createRecipe} from "../recipe/api/create-recipe";

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
    const [successNotification, setSuccessNotification] = useState(false);
    const [errorNotification, setErrorNotification] = useState(false);
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

    const handleNotificationClose = () => {
        setErrorNotification(false);
        setSuccessNotification(false);
    };

    const handleSubmit = async (data: LoginFormType) => {
        try {
            await login(data.email, data.password);
            navigate('/recipe');
        } catch (error) {
            setErrorNotification(true);
        }
    }

    const handleSubmitRegistration = async (data: RegisterFormType) => {
        try {
            await register(data.firstName, data.lastName, data.email, data.password);
            setSuccessNotification(true);
        } catch (error) {
            setErrorNotification(true);
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
                        <TextInput data-cy="authform-email" required label="adres e-mail" placeholder="Twój e-mail"
                                   style={{marginBottom: '1rem'}} {...form.getInputProps('email')} />z
                        <PasswordInput data-cy="authform-password" required label="Hasło" placeholder="podaj hasło"
                                       style={{marginBottom: '1rem'}} {...form.getInputProps('password')} />
                        <Button data-cy="authform-submit" fullWidth color="dark" type="submit">Zaloguj się</Button>

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
                        <Button fullWidth  color="dark" type="submit">Zarejestruj się</Button>
                    </form>

                </div>
            </Paper>
            {successNotification && (
                <Notification color="green" title="Sukces" onClose={handleNotificationClose} >
                    Rejestracja przebiegła pomyślnie
                </Notification>
            )}
            {errorNotification && (
                <Notification color="red" title="Error" onClose={handleNotificationClose} >
                    Niepoprawne dane
                </Notification>
            )}
        </Container>
    );
}
