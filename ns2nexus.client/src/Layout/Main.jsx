import { Box } from "@mui/material";
import { node } from "prop-types";
import { useTheme } from "../Providers/ThemeProvider";

export default function Main({ children }) {
    const { theme } = useTheme();
    return (
        <>
            <Box
                sx={{
                    minHeight: "100vh",
                    backgroundColor: theme.palette.mode === 'dark' ? "#2e1b40" : "#1c0b2e",
                    color: '#FFFFFF'
                }}
            >
                {children}
            </Box>
        </>
    );
}

Main.propTypes = {
    children: node.isRequired,
};
