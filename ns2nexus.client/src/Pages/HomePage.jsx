import { useState } from "react";
import axios from "axios";

export default function HomePage() {
    const [loadingMessage, setLoadingMessage] = useState("");

    async function loadData() {
        try {
            setLoadingMessage("Loading data...");
            await axios.post(`https://localhost:7105/api/Data`);
            setLoadingMessage("Data loaded successfully!");
        } catch (error) {
            console.error("Error loading data:", error);
            setLoadingMessage("Failed to load data.");
        }
    }

    async function flushData() {
        try {
            setLoadingMessage("Flushing data...");
            await axios.delete(`https://localhost:7105/api/Data`);
            setLoadingMessage("Data flushed successfully!");
        } catch (error) {
            console.error("Error flushing data:", error);
            setLoadingMessage("Failed to flush data.");
        }
    }

    return (
        <>
            <h1>Home Page!</h1>

            <button onClick={flushData}>Flush Data</button>
            <br />
            <br />
            <button onClick={loadData}>Load Data</button>
            <br/>
            <br/>
            {`Flushing/Loading Status: ${loadingMessage}`}
        </>
    );
}
