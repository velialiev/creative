import Http from '../../app/Http'

class ApartmentsService {
  public static get() {
    return Http.get<Apartment[]>('entities.json')
  }

  public static like(id: number) {
    return Promise.resolve()
  }
}

export interface Apartment {
  type: ApartmentType.Flat,
  id: number,
  attributes: Attributes,
  relationships: Relationships
  isLiked: boolean
}

interface Attributes {
  title: string,
  rooms: number,
  address: Address,
  area: number,
  unit: Unit.SquareMeter
}

interface Address {
  city: string
  street: string
  house: string
  room: string
}

interface Relationships {
  type: RelationshipsType.Agent
  id: number
  attributes: RelationshipsAttributes
}

interface RelationshipsAttributes {
  first_name: string
  last_name: string
  middle_name: string
}

enum ApartmentType {
  Flat = 'flat'
}

enum Unit {
  SquareMeter = 'квм'
}

enum RelationshipsType {
  Agent = 'agent',
}

export default ApartmentsService
