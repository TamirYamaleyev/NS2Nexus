//import { Container } from "@mui/material";
//import PageHeader from "../Components/PageHeader";
//import useForm from "../Forms/Hooks/useForm";
//import initialLoginForm from "Helpers/InitialForms/initialLoginForm";
//import loginSchema from "Models/loginSchema";
//import ROUTES from "../Router/routesModel";

//import Form from "../Forms/Components/Form";
//import Input from "../Forms/Components/Input";
//import { useUser } from "Providers/UserProvider";
//import useUsers from "Hooks/useUsers";
//import { Navigate } from "react-router-dom";

//export default function LoginPage() {
//    const { user } = useUser();
//    const { handleLogin } = useUsers();

//    const { value, ...rest } = useForm(
//        initialLoginForm,
//        loginSchema,
//        handleLogin
//    );
//    if (user) return <Navigate replace to={ROUTES.CARDS} />;

//    return (
//        <Container>
//            <PageHeader
//                title="Login"
//            />
//            <Container
//                sx={{
//                    paddingTop: 0,
//                    display: "flex",
//                    justifyContent: "center",
//                    alignItems: "center",
//                }}
//            >
//                <Form
//                    title="login"
//                    styles={{ maxWidth: "450px" }}
//                    to={ROUTES.CARDS}
//                    onSubmit={rest.onSubmit}
//                    onReset={rest.handleReset}
//                    onChange={rest.validateForm}
//                >
//                    <Input
//                        label="email"
//                        name="email"
//                        type="email"
//                        error={value.errors.email}
//                        onChange={rest.handleChange}
//                        data={value.data}
//                    />
//                    <Input
//                        label="password"
//                        name="password"
//                        type="password"
//                        error={value.errors.password}
//                        onChange={rest.handleChange}
//                        data={value.data}
//                    />
//                </Form>
//            </Container>
//        </Container>
//    );
//}
