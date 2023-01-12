import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

const CreateServerForm = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user)

    return (<h1>Create server form</h1>)

}

export default CreateServerForm;
