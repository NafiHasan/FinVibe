import NavigationBar from "./NavigationBar";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/MakePost.css";
import axios from "axios";
import { useState } from "react";
import { useRef } from "react";

function MakePost() {
  const location = useLocation();
  const navigate = useNavigate();
  const username = location.state.username;

  return (
    <div>
      <NavigationBar username={username} />
      <MakePostBody username={username} navigate={navigate} />
    </div>
  );
}

function MakePostBody({ username, navigate }) {
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");

  const [selectedImages, setSelectedImages] = useState([]);

  const onSelectFile = (event) => {
    const selectedFiles = event.target.files;
    const selectedFilesArray = Array.from(selectedFiles);

    const imagesArray = selectedFilesArray.map((file) => {
      return URL.createObjectURL(file);
    });

    setSelectedImages((previousImages) => previousImages.concat(imagesArray));

    // FOR BUG IN CHROME
    event.target.value = "";
  };

  function deleteHandler(image) {
    setSelectedImages(selectedImages.filter((e) => e !== image));
    URL.revokeObjectURL(image);
  }

  function addTagI() {}

  async function createPost() {
    const post = {
      post_id: 0,
      username,
      content,
      tags: tags,
      image: image || null,
      comment_count: 0,
      upvote_count: 0,
      downvote_count: 0,
      upvoted_by: [],
      downvoted_by: [],
    };
    // Print post info
    console.log("Post info:", post);

    try {
      await axios.post("http://localhost:8000/create_post", post);
      navigate("/community", { state: { username } });
    } catch (error) {
      console.error("Error creating post:", error);
    }
  }

  const inputRef = useRef();

  function handleImageCLick() {
    inputRef.current.click();
  }

  const [tagName, setTagName] = useState("");
  const [tags, setTags] = useState([]);
  const tag = tags;

  const [graphName, setGraphName] = useState("");
  const [graphs, setGraphs] = useState([]);
  const graph = graphs;

  const addTag = () => {
    if (tagName.trim() !== "") {
      setTags([...tags, tagName]);
      setTagName("");
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div className="makePostBody">
      <div className="left">
        <textarea
          type="text"
          placeholder="Post content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="postTextBox"
        />
      </div>

      <div className="right">
        <div>
          {/* <input type="file" multiple /> */}
          {selectedImages.length > 0 &&
            (selectedImages.length > 5 ? (
              <p className="error">Limit is 5 images</p>
            ) : (
              <div />
            ))}

          <div className="images">
            {selectedImages &&
              selectedImages.map((image, index) => {
                return (
                  <div key={image} className="imagediv">
                    <div style={{ display: "flex", flexDirection: "row" }}>
                      <button
                        onClick={() => deleteHandler(image)}
                        className="delete-btn"
                      >
                        X
                      </button>

                      <img
                        src={image}
                        height="200"
                        alt="upload"
                        className="image"
                      />
                    </div>
                  </div>
                );
              })}
          </div>

          <div>
            <button onClick={handleImageCLick} className="addImageButton">
              Add Image
            </button>
            <input
              type="file"
              name="images"
              onChange={onSelectFile}
              multiple
              accept="image/png , image/jpeg, image/webp"
              ref={inputRef}
              hidden
            />
          </div>
        </div>

        <div>
          <div>
            <div>
              <input
                type="text"
                placeholder="Enter Tag Name"
                className="tagInputBox"
                value={tagName}
                onChange={(e) => setTagName(e.target.value)}
              />
              <button className="addTagButton" onClick={addTag}>
                Add
              </button>
            </div>
            <div className="tagsContainer">
              {tags.map((tag, index) => (
                <div
                  key={index}
                  className="tag"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <button className="tagTextButton">{tag}</button>
                  <button
                    className="removeTagButton"
                    onClick={() => removeTag(tag)}
                  >
                    x
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <button onClick={createPost} className="makePostButton">
          Post
        </button>
      </div>
    </div>
  );
}

export default MakePost;
