import { Fragment } from 'react';
import { Rating } from 'types';

interface Props {
  rating: Rating;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  checked: boolean;
}

export default function StarIcon({ rating, onChange, checked }: Props) {
  const { title, value, id } = rating;

  return (
    <Fragment>
      <input className="form__rating-input visually-hidden" name="rating" value={value} id={id} type="radio" onChange={onChange} checked={checked} />
      <label htmlFor={id} className="reviews__rating-label form__rating-label" title={title}>
        <svg className="form__star-image" width="37" height="33">
          <use xlinkHref="#icon-star"></use>
        </svg>
      </label>
    </Fragment>
  );
}
