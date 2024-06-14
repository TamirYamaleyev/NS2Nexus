//import { Container } from "@mui/material";
//import { Navigate } from "react-router-dom";
//import useForm from "../Forms/Hooks/useForm";
//import ROUTES from "../Router/routesModel";
//import UserForm from "Components/UserForm";
//import initialSignupForm from "Helpers/InitialForms/initialSignupForm";
//import useUsers from "Hooks/useUsers";
//import signupSchema from "Models/signupSchema";
//import { useUser } from "Providers/UserProvider";

//export default function SignupPage() {
//    const { handleSignup } = useUsers();

//    const { value, ...rest } = useForm(
//        initialSignupForm,
//        signupSchema,
//        handleSignup
//    );

//    const { user } = useUser();

//    if (user) return <Navigate replace to={ROUTES.CARDS} />;

//    return (
//        <Container
//            sx={{
//                paddingTop: 8,
//                display: "flex",
//                justifyContent: "center",
//                alignItems: "center",
//            }}
//        >
//            <UserForm
//                onSubmit={rest.onSubmit}
//                onReset={rest.handleReset}
//                onFormChange={rest.validateForm}
//                title="SignUp"
//                errors={value.errors}
//                data={value.data}
//                onInputChange={rest.handleChange}
//                setData={rest.setData}
//            />
//        </Container>
//    );
//}
