import React from 'react';
import { Link, withRouter } from 'react-router-dom';


export default withRouter((props) => {
    // const [mutate, { status, data, error }] = useMutation(axios.post);
    const triggerClick = () => {
        props.history.goBack()
    }

    return <><h2 onClick={triggerClick}>Movie Search</h2> <h2><Link to="/movies">Home</Link> </h2></>
})