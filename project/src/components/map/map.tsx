import { useRef, useEffect } from 'react';
import leaflet from 'leaflet';
import { MapPins } from 'const';
import { Offer } from 'types';
import { useAppSelector, useMap } from 'hooks';

interface Props {
  selectedOffer: Offer | undefined;
  className: string;
  offersList: Offer[];
  activeOffer: Offer | null;
}

const defaultIcon = leaflet.icon({
  iconUrl: MapPins.DefaultPin,
  iconSize: [27, 39],
  iconAnchor: [18, 39],
});

const currentIcon = leaflet.icon({
  iconUrl: MapPins.ActivePin,
  iconSize: [27, 39],
  iconAnchor: [18, 39],
});

export default function Map({ selectedOffer, className, offersList, activeOffer }: Props) {
  const mapRef = useRef(null);

  const cityLocation = useAppSelector((state) => state.offers.city);
  const map = useMap(cityLocation, mapRef);

  useEffect(() => {
    if (map) {
      const layerGroup = leaflet.layerGroup().addTo(map);

      offersList.forEach((item) => {
        leaflet
          .marker({
            lat: item.location.latitude,
            lng: item.location.longitude,
          }, {
            icon: (selectedOffer !== undefined && item.id === selectedOffer.id)
              ? currentIcon
              : defaultIcon,
          })
          .addTo(layerGroup);
      });

      if (activeOffer !== null) {
        leaflet
          .marker({
            lat: activeOffer.location.latitude,
            lng: activeOffer.location.longitude,
          }, {
            icon: currentIcon,
          })
          .addTo(layerGroup);
      }

      return () => {
        map.removeLayer(layerGroup);
      };
    }
  }, [map, selectedOffer, offersList, activeOffer]);

  return (
    <section className={className} style={{ width: '100%' }} ref={mapRef}></section>
  );
}
