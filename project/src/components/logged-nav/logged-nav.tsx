import { useAppDispatch, useAppSelector } from 'hooks';
import { MouseEvent } from 'react';
import { logoutAction } from 'store/user';

export default function LoggedNav() {
  const dispatch = useAppDispatch();
  const userName = useAppSelector((state) => state.user.name);
  const avatarUrl = useAppSelector((state) => state.user.avatar);

  const handleLogout = (event: MouseEvent<HTMLElement>) => {
    event.preventDefault();
    dispatch(logoutAction());
  };

  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        <li className="header__nav-item user">
          <div className="header__nav-profile">
            <div className="header__avatar-wrapper user__avatar-wrapper" style={{ backgroundImage: `url(${avatarUrl || ''})` }}></div>
            <span className="header__user-name user__name">{userName}</span>
          </div>
        </li>
        <li className="header__nav-item">
          <div className="header__nav-link" style={{ cursor: 'pointer' }} onClick={handleLogout}>
            <span className="header__signout">Sign out</span>
          </div>
        </li>
      </ul>
    </nav>
  );
}
