import { useState, useEffect } from 'react';
import { Github, Star, GitFork, ExternalLink } from 'lucide-react';
import './Footer.css';

interface GitHubRepo {
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  owner: {
    login: string;
    avatar_url: string;
    html_url: string;
  };
}

const Footer = () => {
  const [repoData, setRepoData] = useState<GitHubRepo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        const response = await fetch('https://api.github.com/repos/IkedaLab-Daniel/protocol-ice');
        if (response.ok) {
          const data = await response.json();
          setRepoData(data);
        }
      } catch (error) {
        console.error('Failed to fetch GitHub data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubData();
  }, []);

  return (
    <footer className="footer">
      <div className="footer-content">
        {loading ? (
          <div className="footer-loading">
            <Github size={24} className="spin" />
            <span>Loading repository info...</span>
          </div>
        ) : repoData ? (
          <div className="footer-github">
            <div className="footer-repo-info">
              <a 
                href={repoData.html_url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="footer-repo-link"
              >
                <Github size={24} />
                <div className="footer-repo-details">
                  <span className="footer-repo-name">
                    {repoData.owner.login}/{repoData.name}
                  </span>
                  {repoData.description && (
                    <span className="footer-repo-description">{repoData.description}</span>
                  )}
                </div>
                <ExternalLink size={16} />
              </a>
            </div>

            <div className="footer-stats">
              <a 
                href={`${repoData.html_url}/stargazers`}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-stat"
              >
                <Star size={16} />
                <span>{repoData.stargazers_count}</span>
              </a>
              <a 
                href={`${repoData.html_url}/network/members`}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-stat"
              >
                <GitFork size={16} />
                <span>{repoData.forks_count}</span>
              </a>
              {repoData.language && (
                <div className="footer-language">
                  <span className="language-dot"></span>
                  <span>{repoData.language}</span>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="footer-fallback">
            <Github size={24} />
            <a 
              href="https://github.com/IkedaLab-Daniel/protocol-ice" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              View on GitHub
            </a>
          </div>
        )}

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Protocol Ice. Built with ❤️</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
