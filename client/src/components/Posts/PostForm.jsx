import React, { useState } from "react";
import { useAddPost } from "../../redux/actions/postAction";

const PostForm = () => {
  const [text, setText] = useState("");
  const addPost = useAddPost();
  return (
    <div className="post-form">
      <div className="bg-primary p">
        <h3>What's in your mind...</h3>
      </div>
      <form
        className="form my-1"
        onSubmit={(e) => {
          e.preventDefault();
          addPost({ text });
          setText("");
        }}
      >
        <textarea
          style={{ resize: "none" }}
          name="text"
          cols="30"
          rows="5"
          placeholder="Create a post"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        ></textarea>
        <input type="submit" className="btn btn-dark my-1" value="Submit" />
      </form>
    </div>
  );
};

export default PostForm;
