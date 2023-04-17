import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { State, AppDispatch, Offer, AuthData, UserData, Comment } from 'types';
import { loadOffers, setIsOffersLoaded, changeAuthorizationStatus, loadOffer, loadNearbyOffers, loadOfferComments } from './action';
import { APIRoute, AuthorizationStatus } from 'const';
import { dropToken, saveToken } from 'services';

export const fetchOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffers',
  async (_arg, { dispatch, extra: api }) => {
    dispatch(setIsOffersLoaded(true));
    const { data } = await api.get<Offer[]>(APIRoute.Offers);
    dispatch(setIsOffersLoaded(false));
    dispatch(loadOffers(data));
  },
);

export const fetchOffer = createAsyncThunk<void, Offer['id'], {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffer',
  async (id, { dispatch, extra: api }) => {
    dispatch(setIsOffersLoaded(true));
    const [offerData, nearbyOffers, offerComments] = await Promise.all([
      api.get<Offer>(APIRoute.Offer.replace(/id/, `${id}`)),
      api.get<Offer[]>(APIRoute.NearbyOffers.replace(/id/, `${id}`)),
      api.get<Comment[]>(APIRoute.OfferComments.replace(/id/, `${id}`))
    ]);
    dispatch(setIsOffersLoaded(false));
    dispatch(loadOffer(offerData.data));
    dispatch(loadNearbyOffers(nearbyOffers.data));
    dispatch(loadOfferComments(offerComments.data));
  }
);

export const checkAuth = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchLogin',
  async (_arg, { dispatch, extra: api }) => {
    try {
      await api.get<AuthorizationStatus>(APIRoute.Login);
      dispatch(changeAuthorizationStatus(AuthorizationStatus.Auth));
    } catch {
      dispatch(changeAuthorizationStatus(AuthorizationStatus.NoAuth));
    }
  }
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({ email, password }, { dispatch, extra: api }) => {
    const { data: { token } } = await api.post<UserData>(APIRoute.Login, { email, password });
    saveToken(token);
    dispatch(changeAuthorizationStatus(AuthorizationStatus.Auth));
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, { dispatch, extra: api }) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(changeAuthorizationStatus(AuthorizationStatus.NoAuth));
  },
);

