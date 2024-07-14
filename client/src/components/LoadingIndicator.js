import CircularProgress from '@mui/material/CircularProgress';

function LoadingIndecator() {
  return (
    <div className='flex justify-center items-center h-96'>
      <CircularProgress />
    </div>
  )
}

export default LoadingIndecator