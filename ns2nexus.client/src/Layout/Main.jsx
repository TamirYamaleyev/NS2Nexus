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
                    backgroundColor: theme.palette.mode === 'dark' ? "#2D1D3D" : "#2D1D3D",
                    color: theme.palette.text.primary
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
