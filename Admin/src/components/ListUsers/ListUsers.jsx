import React from 'react'
import 'ListUsers.css'

const ListUsers = () => {

    const remove_user = async (id)=>{
        await fetch('http://localhost:4000/removeuser',{
            method:'POST',
            headers:{
                Accept:'application/json',
                'Content-Type':'application/json',
            },
            body:JSON.stringify({id:id})
        })
        await fetchInfo();
    }

    const [allUsers, setAllUsers] = useState([]);

    const fetchInfo = async () => {
        const response = await fetch('http://localhost:4000/allusers');
        const data = await response.json();
        setAllQuestions(data);
    }

    useEffect(() => {
        fetchInfo();
    }, []); // Corrected to empty dependency array

    return (
        <div className='list-question'>
            <h2>All Questions</h2>
            <div className="listquestion-format-main">
                <p>username</p>
                <p>email</p>
                <p>password</p>
                <p>Remove</p>
            </div>
            <div className="listquestion-allquestions">
                <hr />
                {allUsers.map((user, index) => {
                    return (
                        <div key={index} className="listquestion-format-main listquestion-format">
                            <p>{user.username}</p>
                            <p>{user.email}</p>
                            <p>{user.password}</p>
                            <img onClick={() => { remove_user(user.id) }} src={cross_icon} alt="Remove question" className="listquestion-remove-icon" />
                            </div>
                    );
                })}
            </div>
        </div>
    );
}

export default ListUsers
