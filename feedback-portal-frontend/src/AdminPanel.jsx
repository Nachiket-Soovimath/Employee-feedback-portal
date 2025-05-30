import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AdminPanel() {
     const [feedbacks, setFeedbacks] = useState([]);
  const [filter, setFilter] = useState('');

  const fetchFeedbacks = async () => {
    const url = filter ? `https://employee-feedback-portal.vercel.app/feedback?category=${filter}` : `http://localhost:5000/feedback`;
    const res = await axios.get(url);
    setFeedbacks(res.data);
  };

  useEffect(() => { fetchFeedbacks(); }, [filter]);

  const markReviewed = async (id) => {
    await axios.patch(`https://employee-feedback-portal.vercel.app/feedback/${id}/reviewed`);
    fetchFeedbacks();
  };

  const deleteFeedback = async (id) => {
    await axios.delete(`https://employee-feedback-portal.vercel.app/feedback/${id}`);
    fetchFeedbacks();
  };
  return (
    <div>
     <div className="container mt-5">
  <h3 className="mb-4 text-center text-primary">Admin Feedback Dashboard</h3>

  <div className="mb-3">
    <label className="form-label fw-bold">Filter by Category</label>
    <select onChange={(e) => setFilter(e.target.value)} className="form-select">
      <option value="">All Categories</option>
      <option>Work Environment</option>
      <option>Leadership</option>
      <option>Growth</option>
      <option>Others</option>
    </select>
  </div>

  <table className="table table-striped table-hover">
    <thead className="table-dark">
      <tr>
        <th>Text</th>
        <th>Category</th>
        <th>Submitted At</th>
        <th>Reviewed</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {feedbacks.map(f => (
        <tr key={f._id}>
          <td>{f.text}</td>
          <td>{f.category}</td>
          <td>{new Date(f.submittedAt).toLocaleString()}</td>
          <td>{f.isReviewed ? '✅' : '❌'}</td>
          <td>
            {!f.isReviewed && (
              <button
                className="btn btn-success btn-sm me-1"
                onClick={() => markReviewed(f._id)}
              >
                Mark Reviewed
              </button>
            )}
            <button
              className="btn btn-danger btn-sm"
              onClick={() => deleteFeedback(f._id)}
            >
              Delete
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

      </div>
  )
}

export default AdminPanel;