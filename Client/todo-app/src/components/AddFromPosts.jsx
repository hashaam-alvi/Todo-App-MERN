import { useState } from "react";
import AddNewTodo from "./AddNewTodo";


export default function AddFromPosts({ openAddModal , refresh }) {

  const addFromPosts = async () => {
    const res = await fetch("http://localhost:8081/posts");
    const posts = await res.json();

    const requests = posts.slice(0, 5).map(post => 
        fetch("http://localhost:8081/todos", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(post),
        })
    );

    await Promise.all(requests);
    
    refresh();
  };


  return (
    <>
      <button className="open-btn" onClick={() => openAddModal(true)}>
        + Add New Task
      </button>

      {/* {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-x" onClick={() => setIsModalOpen(false)}>×</button>
            
            <AddNewTodo 
              refresh={refresh}
              closeModal={() => setIsModalOpen(false)} 
            />
          </div>
        </div>
      )} */}

      <button onClick={addFromPosts}>Add 5 From Posts</button>
    </>
  );
}
