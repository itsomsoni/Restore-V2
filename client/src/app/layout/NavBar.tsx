import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import DarkMode from "@mui/icons-material/DarkMode";
import LightMode from "@mui/icons-material/LightMode";

type Props = {
    darkMode?: boolean,
    onToggleDarkMode?: () => void,
}

export default function NavBar({ darkMode, onToggleDarkMode }: Props) {

    return (
        <AppBar position="fixed">
            <Toolbar>
                <Typography variant="h6" color="inherit">
                    Re-store
                </Typography>
                <IconButton sx={{ ml: 'auto' }} color="inherit" onClick={onToggleDarkMode}>
                    {darkMode ? <DarkMode /> : <LightMode sx={{ color: 'yellow' }} />}
                </IconButton>
            </Toolbar>

        </AppBar>
    )
}