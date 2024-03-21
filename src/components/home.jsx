import React, { useEffect, useState } from "react";
import styles from "./home.module.css";
import axios from "axios";
import config from "../config.json";
import FeedCard from "./feedCard";
import Form from "./Form";
const Home = ({ user, onLogout }) => {
  const [blogs, setBlogs] = useState([]);
  const [clickedAdd, setClickedAdd] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  // const [newTitle,setNewTitle] = useState("")

  const token = localStorage.getItem("token");
  const fetchBlogPosts = async () => {
    try {
      const response = await axios.get(`${config.API_URL}/blogs/blogposts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBlogs(response.data);
    } catch (error) {
      console.error("Error fetching blog posts:", error);
    }
  };
  useEffect(() => {
    fetchBlogPosts();
  }, []);
  const handleAddClick = () => {
    setClickedAdd(!clickedAdd);
    console.log("clicked", clickedAdd);
  };
  const handleCloseForm = () => {
    setClickedAdd(false);
  };
  const handleSubmit =async()=>{
    if (!newTitle || !newContent) {
      alert("Please enter both title and content.");
      return;
    }

    try {
      const response = await axios.post(
        `${config.API_URL}/blogs/blogposts`,
        { title: newTitle, content: newContent },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update blogs with newly added one
      setBlogs([...blogs, response.data]);
      
      // Close the form
      handleCloseForm();
    } catch (error) {
      console.error("Error adding blog post:", error);
    }

  }

  return (
    <div className={styles.top}>
      <div className={styles.parent}>
        <div className={styles.header}>
          <h2>Blogs!</h2>
          <button className={styles.btn} onClick={onLogout}>
            Logout
          </button>
        </div>
        <div className={styles.feedHead}>
          {blogs.length > 0 ? (
            blogs.map((item) => {
              return (
                <FeedCard
                  title={item.title}
                  content={item.content}
                  key={item._id}
                  id = {item._id}
                  fetchBlogPosts = {fetchBlogPosts}
                />
              );
            })
          ) : (
            <p>no blogs to display add blogs!</p>
          )}
        </div>
      </div>
      <div onClick={handleAddClick}  className={styles.addbtn}>
        <p style={{ fontSize: "22px", padding: "0px", fontWeight: "500" }}>
          + <br /> Add New Blog
        </p>
      </div>
      {/* <button  className={styles.addbtn}>Add New Blog</button> */}
      {clickedAdd ? (
        <div className={styles.formInHome}>
          <Form newTitle={newTitle} newContent={newContent} setNewTitle={setNewTitle} setNewContent={setNewContent} />
          <p className={styles.closebtn}onClick={handleCloseForm}>X</p>
          <button className={styles.submitbtn}onClick={handleSubmit}>ADD</button>

      </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Home;
