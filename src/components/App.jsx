import axios from "axios";
import { useEffect, useState } from "react";
import './css/app.css';
const App = () => {

    const [data, setData] = useState([]);
    const [item, setItem] = useState('');
    const [newItemAdded, setNewItemAdded] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:3000/item/list-items')
            .then(response => setData(response.data))
            .catch(err => console.error(err));
    }, [newItemAdded]); // Add newItemAdded as a dependency for useEffect

    const handleSubmit = async e => {
        e.preventDefault();
        const listItem = { todo: item };
        if (listItem.todo === '') {
            alert('cannot insert empty list item');
        }
        else {
            await axios.post('http://localhost:3000/item/list-items', listItem);
            setItem(''); // Clear input field
            setNewItemAdded(!newItemAdded); // Toggle newItemAdded state to trigger re-render
        }

    }

    const handleDelete = async e => {
        const deleItemId = e.target.value;
        await axios.delete(`http://localhost:3000/item/list-items/${deleItemId}`);
        setNewItemAdded(!newItemAdded);

    }

    return (
        <div className="container">
            <h1>Welcome to your todo-list!</h1>
            {data.map(items => {
                return <div key={items._id} className="list-item">
                    <p className="todo">{items.todo}</p>
                    <button className="delete" value={items._id} onClick={handleDelete}>X</button>
                </div>
            })}
            <form onSubmit={handleSubmit}>
                <input type="text" value={item} onChange={event => setItem(event.target.value)} placeholder="New Item" />
                <button type="submit">+</button>
            </form>

        </div>
    );

}

export default App;