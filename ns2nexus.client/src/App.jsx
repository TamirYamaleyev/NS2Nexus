import './App.css';
import { BrowserRouter } from "react-router-dom";
import Layout from './Layout/Layout'
import Router from './Router/Router';
import ThemeProvider from './Providers/ThemeProvider';

function App() {
    return (
        <BrowserRouter>
            <ThemeProvider >
                <Layout>
                    <Router />
                </Layout>
            </ThemeProvider>
        </BrowserRouter>
    );
}

export default App;