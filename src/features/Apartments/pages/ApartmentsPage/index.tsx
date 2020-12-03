import React, { useEffect } from 'react'
import useAppDispatch from '../../../../hooks/useAppDispatch'
import { apartmentSelectors, getApartments, likeApartment } from '../../apartmentsSlice'
import { useSelector } from 'react-redux'
import ApartmentCard from '../../components/ApartmentCard'
import classes from './style.module.scss'
import Loader from '../../../../components/Loader'

const ApartmentsPage = () => {
  const dispatch = useAppDispatch()
  const apartments = useSelector(apartmentSelectors.getApartments)
  const loading = useSelector(apartmentSelectors.getLoading)

  useEffect(() => {
    dispatch(getApartments())
  }, [])

  return (
    <div className={classes.container}>
      <div className={classes.cardsWrap}>
        <Loader loading={loading.getApartments}>
          {apartments.map(apartment => (
            <ApartmentCard
              apartment={apartment}
              onLike={id => dispatch(likeApartment(id))}
            />
          ))}
        </Loader>
      </div>
    </div>
  )
}

export default ApartmentsPage
