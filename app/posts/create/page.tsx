export default function CreatePost() {
  return (
    <div>
      <h1>Create Post</h1>

      <form>
        <div>
          <label htmlFor="title">Title</label>
          <input type="text" id="title" />
        </div>
        <div>
          <label htmlFor="content">Content</label>
          <textarea id="content" />
        </div>
        <div>
          <label htmlFor="tags">Tags</label>
          <input type="text" id="tags" />
        </div>
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
}
