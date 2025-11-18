import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { StatsQueryParams } from "../../types";
import { useStats } from "../../hooks/useVotes";
import Loading from "../../components/Loading/Loading";
import { calculatePercentage, formatDateShort, formatScore } from "../../utils/helpers";
import Button from "../../components/Button/Button";
import Card from "../../components/Card/Card";
import { TrendingUp, ThumbsUp, ThumbsDown, Vote } from "lucide-react";
import ThemeToggle from "../../components/ThemeToggle/ThemeToggle";
import protocol_ice from '../../assets/protocol-ice.png'
import './Stats.css'

const Stats = () => {
  const navigate = useNavigate()
  const [period, setPeriod] = useState<StatsQueryParams['period']>('today');
  const { stats, loading, error } = useStats({ period })

  const handlePeriodChange = (newPeriod: StatsQueryParams['period']) => {
    setPeriod(newPeriod)
  }

  if (loading) return <Loading fullScreen />

  if (error) {
    return (
      <div className="stats-container">
        <div className="error-message">{error}</div>
      </div>
    )
  }

  const positivePercentage = stats
    ? calculatePercentage(stats.positiveCount, stats.totalVotes)
    : 0;

  const negativePercentage = stats
    ? calculatePercentage(stats.negativeCount, stats.totalVotes)
    : 0;

  return (
    <div className="stats-container page-container">
      <div className="stats-header">
        <div>
          <div className="icon-logo">
            <img src={protocol_ice} alt="" />
            <h1>Statistics</h1>
          </div>
          <p>Your voting insights and analytics</p>
        </div>
        <div className="stats-header-actions">
          <ThemeToggle />
          <Button variant="secondary" onClick={() => navigate('/dashboard')}>
            Back to Dashboard
          </Button>
        </div>
      </div>

      <div className="period-selector">
        <button
          className={`period-btn ${period === 'today' ? 'active' : ''}`}
          onClick={() => handlePeriodChange('today')}
        >
          Today
        </button>
        <button
          className={`period-btn ${period === 'week' ? 'active' : ''}`}
          onClick={() => handlePeriodChange('week')}
        >
          Week
        </button>
        <button
          className={`period-btn ${period === 'month' ? 'active' : ''}`}
          onClick={() => handlePeriodChange('month')}
        >
          Month
        </button>
        <button
          className={`period-btn ${period === 'all' ? 'active' : ''}`}
          onClick={() => handlePeriodChange('all')}
        >
          All Time
        </button>
      </div>

      {stats && (
        <>
          <div className="stats-grid">
            <Card className="stat-card">
              <div className="stat-icon stat-icon-total">
                <TrendingUp size={32} />
              </div>
              <div className="stat-content">
                <h3>Total Score</h3>
                <p className={`stat-value ${stats.totalScore >= 0 ? 'positive' : 'negative'}`}>
                  {formatScore(stats.totalScore)}
                </p>
              </div>
            </Card>

            <Card className="stat-card">
              <div className="stat-icon stat-icon-positive">
                <ThumbsUp size={32} />
              </div>
              <div className="stat-content">
                <h3>Positive Votes</h3>
                <p className="stat-value">{stats.positiveCount}</p>
                <span className="stat-percentage">{positivePercentage}%</span>
              </div>
            </Card>

            <Card className="stat-card">
              <div className="stat-icon stat-icon-negative">
                <ThumbsDown size={32} />
              </div>
              <div className="stat-content">
                <h3>Negative Votes</h3>
                <p className="stat-value">{stats.negativeCount}</p>
                <span className="stat-percentage">{negativePercentage}%</span>
              </div>
            </Card>

            <Card className="stat-card">
              <div className="stat-icon stat-icon-votes">
                <Vote size={32} />
              </div>
              <div className="stat-content">
                <h3>Total Votes</h3>
                <p className="stat-value">{stats.totalVotes}</p>
              </div>
            </Card>
          </div>

          {Object.keys(stats.labelCounts).length > 0 && (
            <Card className="labels-card">
              <h2>Most Common Labels</h2>
              <div className="labels-grid">
                {Object.entries(stats.labelCounts)
                  .sort(([, a], [, b]) => b - a)
                  .slice(0, 10)
                  .map(([label, count]) => (
                    <div key={label} className="label-item">
                      <span className="label-name">{label}</span>
                      <span className="label-count">{count}</span>
                    </div>
                  ))}
              </div>
            </Card>
          )}

          {stats.dailyBreakdown.length > 0 && (
            <Card className="breakdown-card">
              <h2>Daily Breakdown</h2>
              <div className="breakdown-list">
                {stats.dailyBreakdown.map((day) => (
                  <div key={day.date} className="breakdown-item">
                    <div className="breakdown-date">
                      {formatDateShort(day.date)}
                    </div>
                    <div className="breakdown-stats">
                      <div className="breakdown-stat positive">
                        <span className="breakdown-label">+</span>
                        <span className="breakdown-value">{day.positive}</span>
                      </div>
                      <div className="breakdown-stat negative">
                        <span className="breakdown-label">-</span>
                        <span className="breakdown-value">{day.negative}</span>
                      </div>
                      <div className="breakdown-stat total">
                        <span className="breakdown-label">Total:</span>
                        <span className={`breakdown-value ${day.total >= 0 ? 'positive' : 'negative'}`}>
                          {formatScore(day.total)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {stats.totalVotes === 0 && (
            <Card>
              <div className="empty-state">
                <p>No data available for this period.</p>
                <Button onClick={() => navigate('/dashboard')}>
                  Create Your First Vote
                </Button>
              </div>
            </Card>
          )}
        </>
      )}
    </div>
  )
}

export default Stats;