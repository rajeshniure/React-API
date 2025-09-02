import { call, put, takeLatest, all } from "redux-saga/effects";
import { fetchUsersApi } from "./usersApi";
import {
  fetchUsersRequest,
  fetchUsersSuccess,
  fetchUsersFailure,
} from "./usersSlice";

function* fetchUsersSaga(): Generator<any, void, any> {
  try {
    const users = yield call(fetchUsersApi);
    yield put(fetchUsersSuccess(users));
  } catch (error: any) {
    yield put(fetchUsersFailure(error.message));
  }
}

export default function* rootSaga() {
  yield all([takeLatest(fetchUsersRequest.type, fetchUsersSaga)]);
}
