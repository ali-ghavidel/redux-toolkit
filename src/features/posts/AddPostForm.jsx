import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { postAdded } from './postsSlice';
import { selectAllUsers } from '../users/usersSlice';
const AddPostForm = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [userId, setUserId] = useState('');

    const canSave = title && content && userId;
    const users = useSelector(selectAllUsers);
    const dispatch = useDispatch();
    const SavePostHandler = () => {
        if( title && content && userId){
            dispatch(postAdded(title,content,userId))
            setTitle('');
            setContent('');
            setUserId('');
        }
    }
  return (
    <section>
        <h2>Add a New Post</h2>
        <form>
            <label htmlFor="postTitle">Post Title:</label>
            <input type="text" name="postTitle" id="postTitle" value={title} onChange={(e)=>setTitle(e.target.value)} />
            <label htmlFor='author'>Author</label>
            <select name='author' id='author' value={userId} onChange={(e)=>setUserId(e.target.value)}>
                <option value=''>choose an Author</option>
                {
                    users.map( user => (
                        <option
                            key={user.id}
                            value={user.id}
                        >
                            {user.name}
                        </option>
                    ))
                }
            </select>
            <label htmlFor="postContent">Content:</label>
            <textarea id='postContent' name='postContent' value={content} onChange={(e)=>setContent(e.target.value)}/>
            <button type='button' onClick={SavePostHandler} disabled={!canSave}>Save Post</button>
        </form>
    </section>
  )
}

export default AddPostForm