import { useDispatch } from 'react-redux'
import { AppDispatch } from '../app/store'

const useAppDispatch = () => {
  return useDispatch<AppDispatch>()
}

export default useAppDispatch
