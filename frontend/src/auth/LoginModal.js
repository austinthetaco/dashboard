import React,{useState, useContext} from 'react';
import Modal from 'react-modal';
import {RootContext} from '../RootContext';
import axios from 'axios';


const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  };

export default (props) => {
    Modal.setAppElement('#root')
    const { user, setAuthUser } = useContext(RootContext);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null); 

    const handleCloseRequest = () => {
        resetForm();
        props.changeModalState(false);
    }

    const resetForm = () => {
        setName('');
        setEmail('');
        setPassword('');
        setError('');
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if(!error){
            switch (props.formToShow) {
                case "register":
                    axios.post('http://127.0.0.1:9000/register', {name, email, password}).then(response => {setAuthUser(response.data)}, error => {setError(JSON.stringify(error))})
                    resetForm();
                    break;
                case "login":
                    axios.post('http://127.0.0.1:9000/login', {email, password}).then(response => {setAuthUser(response.data)}, error => {setError(JSON.stringify(error))})
                    resetForm();
                
                    break;
                default:
                    break;
            }
            
        }
    }
    const handleFormChange = () => {
        setError(null);
    }
    
    return (
        <Modal 
        isOpen={props.isOpen} 
        onRequestClose={handleCloseRequest} 
        style={customStyles}>
            {!!user ? "user here": 
            <form onSubmit={handleSubmit} onChange={handleFormChange}>
                {props.formToShow === "register" ? 
                <input type="text" name="name" value={name} onChange={e => setName(e.target.value)}/> : null
                }
                
                <input type="text" name="email" value={email} onChange={e => setEmail(e.target.value)}/>
                <input type="password" name="password" value={password} onChange={e => setPassword(e.target.value)}/>
                {error}
                <button type="submit" value="submit">doathing</button>
            </form>
            }
            Hello
        </Modal>
    )
}