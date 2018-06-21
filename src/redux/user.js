// 用 Ducks 结构， 把相关的代码放在一个独立的 module 文件中
// 对外暴露 types、reducer、action creators

// Actions
export const types = {
  LOGIN: 'user/LOGIN',
  LOGOUT: 'user/LOGOUT'
}

const initialState = {
  isLogined: false
}
// Reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case types.LOGIN: 
      return {
        ...state,
        isLogined: true
      }
    case types.LOGOUT:
      return {
        ...state,
        isLogined: false
      }
    default: return state;
  }
}

// Action Creators
export const actions = {
  login: () => {
    return dispatch => {
      dispatch({type: types.LOGIN})
    }
  },
  logout: () => {
    return dispatch => {
      dispatch({type: types.LOGOUT})
    }
  }
}