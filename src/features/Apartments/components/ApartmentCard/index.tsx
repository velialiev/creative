import React, { FC } from 'react'
import { Button, Card } from 'antd'
import { Apartment } from '../../ApartmentsService'
import { HeartOutlined } from '@ant-design/icons'

const ApartmentCard: FC<Props> = (props) => {
  const {
    apartment,
    onLike,
  } = props

  const {
    id,
    attributes: {
      title,
      rooms,
      address: {
        city,
        street,
        house,
        room,
      },
      area,
      unit,
    },
    relationships: {
      attributes: {
        first_name: ownerFirstName,
        last_name: ownerLastName,
        middle_name: ownerMiddleName,
      },
    },
    isLiked,
  } = apartment

  return (
    <Card title={title}>
      <p><b>Количество комнат:</b> {rooms}</p>
      <p><b>Адрес:</b> {city}, ул. {street} д. {house}, квартира {room}</p>
      <p><b>Площадь:</b> {area} {unit}</p>
      <p><b>Владелец:</b> {ownerLastName} {ownerFirstName} {ownerMiddleName}</p>
      <Button
        onClick={() => onLike(id)}
        danger={isLiked}
        shape="circle"
        icon={<HeartOutlined/>}
      />
    </Card>
  )
}

interface Props {
  apartment: Apartment
  onLike: (id: number) => void
}

export default ApartmentCard
