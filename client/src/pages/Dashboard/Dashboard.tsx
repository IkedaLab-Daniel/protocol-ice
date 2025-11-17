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
import { Menu, X, ChevronUp, ChevronDown, Trash2 } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { votes, loading, error, fetchMyVotes, createVote, deleteVote } = useVotes();

  const [showModal, setShowModal] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [formData, setFormData] = useState<CreateVoteInput>({
    type: 'positive',
    label: '',
    score: 1,
  });
  const [submitting, setSubmitting] = useState(false);
  const [celebration, setCelebration] = useState<'positive' | 'negative' | null>(null);

  const openModal = (voteType: 'positive' | 'negative') => {
    setFormData({ type: voteType, label: '', score: 1 });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setFormData({ type: 'positive', label: '', score: 1 });
  };

  useEffect(() => {
    fetchMyVotes();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await createVote(formData);
      const voteType = formData.type;
      closeModal();
      
      // Trigger celebration animation
      setCelebration(voteType);
      setTimeout(() => setCelebration(null), 3000);
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
        <div className="header-left">
          <h1>Dashboard</h1>
          <p>Welcome back, {user?.username}</p>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="mobile-menu-toggle"
          onClick={() => setShowMobileMenu(!showMobileMenu)}
          aria-label="Toggle menu"
        >
          {showMobileMenu ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop & Mobile Menu */}
        <div className={`header-actions ${showMobileMenu ? 'show' : ''}`}>
          <Button
            variant="secondary"
            onClick={() => {
              navigate('/stats');
              setShowMobileMenu(false);
            }}
          >
            View Stats
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              handleLogout();
              setShowMobileMenu(false);
            }}
          >
            Logout
          </Button>
        </div>
      </div>

      {/* Vote Action Buttons */}
      <div className="vote-actions">
        <button
          className="vote-action-btn vote-action-positive"
          onClick={() => openModal('positive')}
        >
          <ChevronUp size={48} strokeWidth={2.5} />
          <span>Positive</span>
        </button>

        <button
          className="vote-action-btn vote-action-negative"
          onClick={() => openModal('negative')}
        >
          <ChevronDown size={48} strokeWidth={2.5} />
          <span>Negative</span>
        </button>
      </div>

      {/* Vote Form Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>
                Add {formData.type === 'positive' ? 'Positive' : 'Negative'} Vote
              </h3>
              <button className="modal-close" onClick={closeModal}>
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="vote-form">
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

              <div className="modal-actions">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={closeModal}
                  disabled={submitting}
                >
                  Cancel
                </Button>
                <Button type="submit" loading={submitting}>
                  Confirm
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Celebration Animation */}
      {celebration && (
        <div className={`celebration-overlay celebration-${celebration}`}>
          <div className="celebration-content">
            {celebration === 'positive' ? (
              <>
                <div className="celebration-icon">🎉</div>
                <h2 className="celebration-text">Awesome!</h2>
                <p className="celebration-subtext">Keep up the great work!</p>
              </>
            ) : (
              <>
                <div className="celebration-icon">💪</div>
                <h2 className="celebration-text">Noted!</h2>
                <p className="celebration-subtext">Tomorrow is a new day!</p>
              </>
            )}
          </div>
          <div className="confetti-container">
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="confetti"
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 0.5}s`,
                  animationDuration: `${2 + Math.random() * 1}s`,
                  backgroundColor: celebration === 'positive'
                    ? ['#10b981', '#34d399', '#6ee7b7', '#fbbf24', '#f59e0b'][Math.floor(Math.random() * 5)]
                    : ['#ef4444', '#f87171', '#fca5a5', '#a855f7', '#c084fc'][Math.floor(Math.random() * 5)]
                }}
              />
            ))}
          </div>
        </div>
      )}

      <div className="dashboard-content">
        <Card>
          <div className="votes-header">
            <h2>My Votes</h2>
          </div>

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

                  <button
                    className="delete-icon-btn"
                    onClick={() => handleDelete(vote._id)}
                    aria-label="Delete vote"
                  >
                    <Trash2 size={20} />
                  </button>
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