import React, { useState } from 'react';
import axios from 'axios';



function FeedbackForm() {
  const baseUrl = process.env.REACT_APP_API_URL;
     const [text, setText] = useState('');
  const [category, setCategory] = useState('Work Environment');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
       await axios.post(`${baseUrl}/feedback`, { text, category });
      setText('');
      setCategory('Work Environment');
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000); 
    } catch (err) {
      console.error('Submission error:', err);
    }
  };
  return (
    <div className="container mt-5">
      <div className="card shadow-sm">
        <div className="card-body">
          <h3 className="card-title text-center mb-4 text-primary">Submit Feedback</h3>

          {submitted && (
            <div className="alert alert-success" role="alert">
              Feedback submitted successfully!
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label fw-bold">Your Feedback</label>
              <textarea
                className="form-control"
                required
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows={4}
                placeholder="Write your feedback here..."
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">Category</label>
              <select
                className="form-select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option>Work Environment</option>
                <option>Leadership</option>
                <option>Growth</option>
                <option>Others</option>
              </select>
            </div>

            <button type="submit" className="btn btn-primary w-100">
              Submit Feedback
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default FeedbackForm;