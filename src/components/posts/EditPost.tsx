import React, {useState} from "react";
import {Button, Grid, Input} from "@mui/material";


const EditablePostName = ({
                              name: initialName,
                              onUpdate,
                              onCancel,
                              isLoading = false,
                          }: {
    name: string
    onUpdate: (name: string) => void
    onCancel: () => void
    isLoading?: boolean
}) => {
    const [name, setName] = useState(initialName)

    const handleChange = ({
                              target: {value},
                          }: React.ChangeEvent<HTMLInputElement>) => setName(value)

    const handleUpdate = () => onUpdate(name)
    const handleCancel = () => onCancel()

    return (
        <Grid container spacing={4}>
            <Grid item xs={6}>
                <Input
                    type="text"
                    onChange={handleChange}
                    value={name}
                    disabled={isLoading}
                />
            </Grid>
            <Grid item xs={3}>
                <Button color="primary" onClick={handleUpdate}>
                    Update
                </Button>
            </Grid>
            <Button color="primary" onClick={handleCancel} disabled={isLoading}/>
        </Grid>
    )
}

export default EditablePostName;