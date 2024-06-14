import axios from "axios";
export default function HomePage() {

    async function loadData()
    {
        await axios.post(`https://localhost:7105/api/Data`);
    }
    async function flushData()
    {
        await axios.delete(`https://localhost:7105/api/Data`)
    }

    return (
        <>
            <h1>Home Page!</h1>

            <button
                onClick={flushData}
            >
                Flush Data
            </button>
            <br/>
            <br/>
            <button
                onClick={loadData}
            >
                Load Data
            </button>
        </>
    );
}
