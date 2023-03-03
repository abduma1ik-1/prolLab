import { createSlice } from '@reduxjs/toolkit'
import { useNavigate } from 'react-router-dom'
import { api, apiGalley, apiWithoutToken } from '../../api/axios_config'

const URL = 'api/v1/auth'

const initialState = {
  loading: false,
  error: false,
  data: null
}

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    setItem: (state, { payload }) => {
      state.loading = false;
      state.error = false;
      state.data = payload;
    },
    setIstaData: (state, { payload }) => {
      state.data = {
        ...state.data,
        instagram: payload
      };
    },
    setError: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
      state.data = null;
    },
    editItem: (state, { payload }) => {
      state.data = payload;
    }
  },
})

// export the actions
export const { setLoading, setItem, setIstaData, setError, editItem } = profileSlice.actions;


// // export the selector (".data" being same as in slices/index.js's "data: something")
// export const profileSelector = (state: { data: any }) => state.data;

// export the default reducer
export default profileSlice.reducer;


// fetch profile
export function fetchProfile() {
  setLoading()
  return async (dispatch) => {
    apiWithoutToken.get(`/${URL}/profile/`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${localStorage.getItem('token')}`
      }
    })
      .then((response) => {
        dispatch(setItem(response.data));
      })
      .catch((er) => {
        dispatch(setError(er));
        if (er.response.status === 401) {
          localStorage.removeItem('token')
        }
      });
  };
}

// edit profile
export function editProfile(data, setIsEdit) {
  return async (dispatch) => {
    api.patch(`${URL}/profile/`, data)
      .then((response) => {
        dispatch(editItem(response.data));
        setIsEdit(false)
      })
      .catch((er) => {
        dispatch(setError(er));
      });
  };
}


export function editProfileAvatar(data, setError) {
  return async (dispatch) => {
    apiGalley.patch(`${URL}/profile/`, data)
      .then((response) => {
        dispatch(editItem(response.data));
      })
      .catch((er) => {
        dispatch(setError(er));
      });
  };
}


// login to profile
export function loginProfile(data) {

  return async (dispatch) => {
    apiWithoutToken.post(`${URL}/login/`, data)
      .then((response) => {
        if (response.data.token) {
          dispatch(setItem(response.data));
          api.defaults.headers.common['Authorization'] = `Token ${response.data.token}`;
          localStorage.setItem('token', response.data.token)
          window.location('/')
        } else {
          dispatch(setError(response.data));
          console.log(response.data);
        }
      })
      .catch((er) => {
        dispatch(setError(er));
      });
  };
}


// logout from profile
export function logoutProfile() {
  return async (dispatch) => {
    api.post(`${URL}/logout/`)
      .then((response) => {
        dispatch(setItem(null));
        localStorage.removeItem('token')
      })
      .catch((er) => {
        localStorage.removeItem('token')
        dispatch(setError(er));
      });
  };
}


// login to profile
export function getAccessToken(data) {
  return async (dispatch) => {
    var formData = new FormData();
    formData.append('redirect_uri', data.redirect_uri)
    formData.append('code', data.code)
    formData.append('user_id', data.user_id)
    
    apiWithoutToken.post(`/instagram/make_access_token/`, formData)
      .then((response) => {
        dispatch(setIstaData(response.data));
        window.location.href = '/admin/profile'
      })
      .catch((er) => {
        dispatch(setError(er));
      });
  };
}
