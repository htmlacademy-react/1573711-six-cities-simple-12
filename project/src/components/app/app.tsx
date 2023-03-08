import { CitiesHomeScreen } from 'pages';
import { LoginScreen } from 'pages';
import { PropertyScreen } from 'pages';
import { Screen404 } from 'pages';
import { AppRoute } from 'const';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

interface IProps {
  offersCount: number;
}

function App({ offersCount }: IProps) {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={<CitiesHomeScreen offersCount={offersCount} />}
        />
        <Route
          path={AppRoute.Login}
          element={<LoginScreen />}
        />
        <Route
          path={AppRoute.Room}
          element={<PropertyScreen />}
        />
        <Route
          path='*'
          element={<Screen404 />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
