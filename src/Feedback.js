import styles from "./Feedback.module.css";
import { useEffect } from "react";
import React, { useState } from "react";
import { useParams } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router-dom';

const Feedback = () => {
  const location = useLocation();
  const { userId } = useParams();
  const userObject = location.state ? location.state.userObject : null;
  const navigate = useNavigate();

    useEffect(() => {
        document.title = "NurtureHub | Feedback";
        console.log('userObject:', userObject);
      }, []); 
    
      const [feedbackData, setFeedbackData] = useState({
        caregiverId: userId,
        recipientId: userObject.recipientId,
        rating: 0,
        feedback: "",
        firstname: userObject.firstname,
        lastname: userObject.lastname,
      });

      const handleChange = (event) => {
        const { name, value } = event.target;
        setFeedbackData({
          ...feedbackData,
          [name]: value,
        });
      };

      const submitFeedback = async () => {
        try {
          const response = await fetch("http://localhost:8080/feedback/insertFeedback", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(feedbackData),
          });
    
          if (response.ok) {
            console.log("Feedback submitted successfully!");
            // Optionally reset the form or handle success
            navigate(-1);
          } else {
            console.error("Error submitting feedback:", response.statusText);
            // Handle errors, e.g., display an error message
          }
        } catch (error) {
          console.error("Error submitting feedback:", error.message);
          // Handle errors, e.g., display an error message
        }
      };
      const handleFeedbackSubmit = (event) => {
        event.preventDefault();
        submitFeedback();
      };
      
  return (
    <div className={styles.feedback}>
      <div className={styles.feedbackChild} />
      <div className={styles.feedbackItem} />
      <img className={styles.x1Icon} alt="" src="/x-1@2x.png" />
      <div className={styles.nurturehubParent}>
        <div className={styles.nurturehub}>NurtureHub</div>
        <img
          className={styles.nurturehublogo2Icon}
          alt=""
          src="/nurturehublogo-2@2x.png"
        />
      </div>
      <div className={styles.feedbackInner} />
      <div className={styles.rectangleDiv} />
      <div className={styles.feedbackChild1} />
      <div className={styles.feedback1}>Feedback</div>
      <form onSubmit={handleFeedbackSubmit}>
          <input
            className={styles.feedbackChild2}
            type="number"
            name="rating"
            placeholder="Enter your Rating: (1-5)"
            value={feedbackData.rating}
            onChange={handleChange}
          />
        <br />
        <label>
          Feedback:
          <textarea
            className={styles.rectangleInput}
            name="feedback"
            placeholder=" Enter your feedback: "
            value={feedbackData.feedback}
            onChange={handleChange}
          />
        </label>
        <br />
        <button className={styles.buttonWrapper} type="submit">Submit Feedback</button>
      </form>
    </div>
  );
};

export default Feedback;
