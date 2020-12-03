import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import handleThunk, { SliceErrorBase, SliceLoadingBase } from '@velialiev/redux-toolkit-handle-thunk'
import ApartmentsService, { Apartment } from './ApartmentsService'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { RootState } from '../../app/rootReducer'
import delay from '../../utils/delay'

interface State {
  loading: SliceLoading
  error: SliceError
  apartments: Apartment[]
}

const initialState: State = {
  loading: {},
  error: {},
  apartments: [],
}

export const apartmentSelectors = {
  getApartments: (state: RootState) => state.apartments.apartments,
  getLoading: (state: RootState) => state.apartments.loading,
  getError: (state: RootState) => state.apartments.error,
}

const thunks = {
  getApartments: createAsyncThunk(
    'apartments/getApartments',
    async (_, thunkAPI) => {
      // todo: remove fake delay after testing
      await delay(800)

      const { apartments: { apartments } } = thunkAPI.getState() as RootState

      if (apartments.length) {
        return apartments
      }

      const { response } = await ApartmentsService.get()
      return response
    },
  ),
  likeApartment: createAsyncThunk(
    'apartments/likeApartment',
    async (id: number) => {
      await ApartmentsService.like(id)
      return { id }
    },
  ),
}

export const {
  getApartments,
  likeApartment,
} = thunks

const apartmentsSlice = createSlice({
  name: 'apartments',
  initialState,
  reducers: {},
  extraReducers: builder => {
    handleThunk(
      builder,
      getApartments,
      (state, payload) => {
        state.apartments = payload
      },
    )

    handleThunk(
      builder,
      likeApartment,
      (state, payload) => {
        const likedApartment = state.apartments.find(apartment => apartment.id === payload.id)

        if (!likedApartment) {
          return
        }

        likedApartment.isLiked = !likedApartment.isLiked
      },
    )
  },
})

type ThunkNamesUnion = keyof typeof thunks
type SliceLoading = SliceLoadingBase<ThunkNamesUnion>
type SliceError = SliceErrorBase<ThunkNamesUnion>

const persistConfig = {
  key: 'apartments',
  storage,
  whitelist: ['apartments'],
}

export default persistReducer(persistConfig, apartmentsSlice.reducer)
