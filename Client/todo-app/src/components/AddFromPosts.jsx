function AddFromPosts({ refresh }) {

  const addFromPosts = async () => {

    const res = await fetch("http://localhost:8081/posts");
    const posts = await res.json();

    for (let post of posts.slice(0,5)) {

      await fetch("http://localhost:8081/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(post)
      });
    }

    refresh();
  };

  return (
    <button onClick={addFromPosts}>
      Add 5 From Posts
    </button>
  );
}

export default AddFromPosts;