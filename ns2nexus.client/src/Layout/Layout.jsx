import { node } from "prop-types";
import Main from "./Main";

export default function Layout({ children }) {
    return (
        <>
                <Main>{children}</Main>
        </>
    );
}

Layout.propTypes = {
    children: node.isRequired,
};
