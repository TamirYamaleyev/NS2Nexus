import React from "react";
import { func, object, string } from "prop-types";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Form from "../../Forms/Components/Form";
import Input from "../../Forms/Components/Input";
import ROUTES from "../../Router/routesModel";

const UserForm = ({
    onSubmit,
    onReset,
    onFormChange,
    title,
    errors,
    data,
    onInputChange,
    setData,
}) => {
    return (
        <Form
            onSubmit={onSubmit}
            onReset={onReset}
            onChange={onFormChange}
            styles={{ maxWidth: "800px" }}
            title={title}
            to={ROUTES.ROOT}
        >
            <Input
                name="email"
                label="email"
                type="email"
                error={errors.email}
                onChange={onInputChange}
                data={data}
                sm={6}
            />
            <Input
                name="password"
                label="password"
                type="password"
                error={errors.password}
                onChange={onInputChange}
                data={data}
                sm={6}
            />
            <Input
                name="steamId"
                label="Steam Id"
                error={errors.url}
                onChange={onInputChange}
                data={data}
                sm={6}
                required={false}
            />
        </Form>
    );
};

UserForm.propTypes = {
    onSubmit: func.isRequired,
    onReset: func.isRequired,
    onFormChange: func.isRequired,
    title: string.isRequired,
    errors: object.isRequired,
    data: object.isRequired,
    onInputChange: func.isRequired,
    setData: func.isRequired,
};

export default React.memo(UserForm);
