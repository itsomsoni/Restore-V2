import { AppBar, Badge, Box, IconButton, List, ListItem, Toolbar, Typography } from "@mui/material";
import { DarkMode, LightMode, ShoppingCart } from "@mui/icons-material";
import { NavLink } from "react-router-dom";

const midLinks = [
    { title: 'Catalog', path: '/catalog' },
    { title: 'About', path: '/about' },
    { title: 'Contact', path: '/contact' },
]

const rightLinks = [
    { title: 'Login', path: '/login' },
    { title: 'Register', path: '/register' }
]

const mavStyles = {
    color: 'inherit', typography: 'p', textDecoration: 'none'
    , '&:hover':
    {
        color: 'grey.500'
    }
    , '&.active':
    {
        color: '#baecff'
    }
};

type Props = {
    darkMode?: boolean,
    toggleDarkMode?: () => void,
}

export default function NavBar({ darkMode, toggleDarkMode }: Props) {

    return (
        <AppBar position="fixed">
            <Toolbar sx={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center'

            }}>
                <Box>
                    <Typography component={NavLink} to="/" variant="h6" color="inherit"
                        sx={{ textDecoration: 'none' }}>
                        Re-store
                    </Typography>
                </Box>
                <List sx={{ display: 'flex', ml: '20px' }}>
                    {
                        midLinks.map(({ title, path }) =>
                        (
                            <ListItem
                                component={NavLink}
                                to={path}
                                key={path}
                                sx={mavStyles}>
                                {title}
                            </ListItem>
                        ))
                    }
                </List>
                <Box display='flex' alignItems='center'>
                    <IconButton size="large" color="inherit">
                        <Badge badgeContent={4} color="secondary">
                            <ShoppingCart />
                        </Badge>
                    </IconButton>
                    <List sx={{ display: 'flex', ml: '20px' }}>
                        {
                            rightLinks.map(({ title, path }) =>
                            (
                                <ListItem
                                    component={NavLink}
                                    to={path}
                                    key={path}
                                    sx={mavStyles}>
                                    {title}
                                </ListItem>
                            ))
                        }
                    </List>
                    <IconButton color="inherit" onClick={toggleDarkMode}>
                        {darkMode ? <DarkMode /> : <LightMode sx={{ color: 'yellow' }} />}
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar>
    )
}