import {Outlet} from "react-router-dom";
import {Header} from "./Header";
import {AppShell, Burger, Group} from "@mantine/core";
import {useDisclosure} from "@mantine/hooks";
import {AppNavbar} from "./AppNavbar";
import {Footer} from "./Footer";

export const Layout = () => {
    const [opened, {toggle}] = useDisclosure();
    return (
        <div>
            <AppShell
                header={{height: 140}}
                footer={{height: 50 }}
                navbar={{width: 300, breakpoint: 'sm', collapsed: {mobile: !opened}}}
                padding="md"
            >

                <AppShell.Header>
                    <Group h="100%" px="md">
                        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm"/>
                        <Header/>
                    </Group>
                </AppShell.Header>
                <AppShell.Navbar p="md">
                    <AppNavbar/>
                </AppShell.Navbar>
                <AppShell.Main>
                    <Outlet/>
                </AppShell.Main>
            </AppShell>
            <Footer />
        </div>
    )
}
