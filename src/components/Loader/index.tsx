import React, { FC } from 'react'
import { Spin } from 'antd'
import classes from './style.module.scss'

const Loader: FC<Props> = ({ loading, children }) => {
  return (
    <>
      {loading ? (
        <div className={classes.centered}>
          <Spin />
        </div>
      ) : (
        children
      )}
    </>
  )
}

type Props = {
  loading: boolean | undefined
}

export default Loader
