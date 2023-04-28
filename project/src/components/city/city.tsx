import { useAppDispatch, useAppSelector } from 'hooks';
import { CityInfo } from 'types';
import { default as classNames } from 'classnames';
import { changeCity } from 'store/offer';

interface Props {
  cityName: CityInfo;
}

export default function City({ cityName }: Props) {
  const dispatch = useAppDispatch();
  const currentCity = useAppSelector((item) => item.offers.city.name);

  const handleCityChange = () => {
    dispatch(changeCity(cityName));
  };

  return (
    <div className={classNames('locations__item-link', 'tabs__item', { 'tabs__item--active': cityName.name === currentCity })} onClick={handleCityChange} style={{ cursor: 'pointer' }}>
      <span>{cityName.name}</span>
    </div>
  );
}
