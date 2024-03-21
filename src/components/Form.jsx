import React from 'react'

import styles from './feedcard.module.css'
const Form = ({newContent,newTitle,setNewTitle,setNewContent}) => {
  const handleTitleChange = (event) => {
    setNewTitle(event.target.value);
  };

  const handleContentChange = (event) => {
    setNewContent(event.target.value);
  };
  return (
    <div className={styles.formhead}>
      <label className={styles.label} >Title:</label>
     <input
        className={styles.input}
        type="text"
        placeholder="Enter Title"
        value={newTitle}
        onChange={handleTitleChange}
      />
     <div style={{marginTop:"20px"}}>
     <label className={styles.label} >Content:</label>

<textarea
  placeholder="Enter Content"
  className={styles.input}
  value={newContent}
  onChange={handleContentChange}
></textarea>
     </div>
      
        
    </div>
  )
}

export default Form