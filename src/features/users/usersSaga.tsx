import { call, put, takeLatest, all } from "redux-saga/effects";
import { 
  fetchUsersRequest, fetchUsersSuccess, fetchUsersFailure,
  addUserRequest, addUserSuccess, addUserFailure,
  deleteUserRequest, deleteUserSuccess, deleteUserFailure,
  updateUserRequest, updateUserSuccess, updateUserFailure,
  type User
} from "./usersSlice";

import { fetchUsersApi, addUserApi, deleteUserApi, updateUserApi } from "./usersApi";

// Fetch Users
function* fetchUsersSaga(): Generator<any, void, User[]> {
  try {
    const users = yield call(fetchUsersApi);
    yield put(fetchUsersSuccess(users));
  } catch (err: any) {
    yield put(fetchUsersFailure(err.message));
  }
}

// Add User
function* addUserSaga(
  action: ReturnType<typeof addUserRequest>
): Generator<any, void, User> {
  try {
    const user = yield call(addUserApi, action.payload);
    yield put(addUserSuccess(user));
  } catch (err: any) {
    yield put(addUserFailure(err.message));
  }
}

// Delete User
function* deleteUserSaga(
  action: ReturnType<typeof deleteUserRequest>
): Generator<any, void, number> {
  try {
    const id = yield call(deleteUserApi, action.payload);
    yield put(deleteUserSuccess(id));
  } catch (err: any) {
    yield put(deleteUserFailure(err.message));
  }
}

// Update User
function* updateUserSaga(
  action: ReturnType<typeof updateUserRequest>
): Generator<any, void, User> {
  try {
    const updatedUser = yield call(updateUserApi, action.payload);
    yield put(updateUserSuccess(updatedUser));
  } catch (err: any) {
    yield put(updateUserFailure(err.message));
  }
}

export default function* rootSaga() {
  yield all([
    takeLatest(fetchUsersRequest.type, fetchUsersSaga),
    takeLatest(addUserRequest.type, addUserSaga),
    takeLatest(deleteUserRequest.type, deleteUserSaga),
    takeLatest(updateUserRequest.type, updateUserSaga),
  ]);
}
