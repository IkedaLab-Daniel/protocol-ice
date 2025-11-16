import type { ReactNode } from 'react'
import './Card.css'

interface CardProps {
    children: ReactNode;
    className?: string;
    onClick?: () => void;
    hover?: boolean;
}

const Card = ({ children, className = '', onClick, hover = false }: CardProps) => {
  const classes = [
    'card',
    hover && 'card-hover',
    onClick && 'card-clickable',
    className
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes} onClick={onClick}>
      {children}
    </div>
  )
}

export default Card