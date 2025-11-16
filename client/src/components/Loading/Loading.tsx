import './Loading.css'

interface LoadingProps {
    size?: 'small' | 'medium' | 'large';
    fullScreen?: boolean;
}

const Loading = ({ size = 'medium', fullScreen = false }: LoadingProps) => {
  if (fullScreen){
    return (
      <div className='loading-fullscreen'>
        <div className={`loading-spinner loading-${size}`}></div>
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <div className={`loading-spinner loading-${size}`}></div>
  )

}

export default Loading;
