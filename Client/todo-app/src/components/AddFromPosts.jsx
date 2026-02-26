import {BASE_URL} from "./config"


export default function AddFromPosts({ openAddModal , refresh }) {

  const addFromPosts = async () => {
    const res = await fetch(`${BASE_URL}/posts`);
    const posts = await res.json();

    const requests = posts.slice(0, 5).map(post => 
        fetch(`${BASE_URL}/todos`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(post),
        })
    );

    await Promise.all(requests);
    
    refresh();
  };


  return (
    <div className="addTaskButtons">
      <button className="open-btn" onClick={() => openAddModal(true)}>
        Add Todo
      </button>

      <button onClick={addFromPosts}>Get Todos</button>
    </div>
  );
}
