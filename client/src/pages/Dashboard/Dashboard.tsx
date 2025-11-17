import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Dashboard.css';
import { useVotes } from '../../hooks/useVotes';
import { useEffect, useState, type FormEvent } from 'react';
import type { CreateVoteInput } from '../../types';
import Loading from '../../components/Loading/Loading';
import Button from '../../components/Button/Button';
import Card from '../../components/Card/Card';
import Input from '../../components/Input/Input';
import { formatDate, formatScore } from '../../utils/helpers';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { votes, loading, error, fetchMyVotes, createVote, deleteVote } = useVotes();

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<CreateVoteInput>({
    type: 'positive',
    label: '',
    score: 1,
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchMyVotes();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await createVote(formData);
      setShowForm(false);
      setFormData({ type: 'positive', label: '', score: 1 });
    } catch (error: any) {
      // Error handled by the hook
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this vote?')) {
      try {
        await deleteVote(id);
      } catch (error) {
        // Error handled by the hook
      }
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (loading && votes.length === 0) {
    return <Loading fullScreen />;
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div>
          <h1>Dashboard</h1>
          <p>Welcome back, {user?.username}</p>
        </div>
        <div className="header-actions">
          <Button variant="secondary" onClick={() => navigate('/stats')}>
            View Stats
          </Button>
          <Button variant="danger" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </div>

      <div className="dashboard-content">
        <Card>
          <div className="vote-header">
            <h2>My Votes</h2>
            <Button onClick={() => setShowForm(!showForm)}>
              {showForm ? 'Cancel' : '+ Add Vote'}
            </Button>
          </div>

          {showForm && (
            <form onSubmit={handleSubmit} className="vote-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        type: e.target.value as 'positive' | 'negative',
                      });
                    }}
                    className="select-input"
                  >
                    <option value="positive">Positive</option>
                    <option value="negative">Negative</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Score</label>
                  <input
                    type="number"
                    min={1}
                    max={5}
                    value={formData.score}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        score: Number(e.target.value) || 1,
                      })
                    }
                    className="number-input"
                  />
                </div>
              </div>

              <Input
                label="Label (Optional)"
                type="text"
                placeholder="Study, Exercise, Game"
                value={formData.label}
                onChange={(e) => {
                  setFormData({ ...formData, label: e.target.value });
                }}
                fullWidth
              />
              <Button type="submit" loading={submitting} fullWidth>
                Confirm
              </Button>
            </form>
          )}

          {error && <div className="error-message">{error}</div>}

          {votes.length === 0 ? (
            <div className="empty-state">
              <p>No votes yet. Create your first vote!</p>
            </div>
          ) : (
            <div className="votes-list">
              {votes.map((vote) => (
                <div key={vote._id} className="vote-item">
                  <div className="vote-content">
                    <div className="vote-info">
                      <span className={`vote-badge vote-badge-${vote.type}`}>
                        {vote.type}
                      </span>
                      {vote.label && (
                        <span className="vote-label">{vote.label}</span>
                      )}
                    </div>

                    <div className="vote-details">
                      <span className={`vote-score vote-score-${vote.type}`}>
                        {formatScore(vote.score)}
                      </span>
                      <span className="vote-date">
                        {formatDate(vote.timestamp)}
                      </span>
                    </div>
                  </div>

                  <Button
                    variant="danger"
                    size="small"
                    onClick={() => handleDelete(vote._id)}
                  >
                    Delete
                  </Button>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}

export default Dashboard;