import 'leaflet/dist/leaflet.css';
import { Icon, Marker, layerGroup } from 'leaflet';
import { City, Offers, Offer, WideOffer } from '../../types/types';
import { URL_MARKER_CURRENT, URL_MARKER_DEFAULT, URL_MARKER_HOWERED } from '../../const';
import { useRef, useEffect, useMemo } from 'react';
import useMap from '../../hooks/use-map';
import React from 'react';

type MapComponentProps = {
  city: City;
  points: Offers;
  selectedPoint: WideOffer | undefined;
  hoveredPoint: Offer | undefined;
};

const MapComponent = React.memo(({ city, points, selectedPoint, hoveredPoint }: MapComponentProps): JSX.Element => {
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  const defaultCustomIcon = useMemo(() => new Icon({
    iconUrl: URL_MARKER_DEFAULT,
    iconSize: [40, 40],
    iconAnchor: [20, 40]
  }), []);

  const currentCustomIcon = useMemo(() => new Icon({
    iconUrl: URL_MARKER_CURRENT,
    iconSize: [40, 40],
    iconAnchor: [20, 40]
  }), []);

  const hoveredCustomIcon = useMemo(() => new Icon({
    iconUrl: URL_MARKER_HOWERED,
    iconSize: [40, 40],
    iconAnchor: [20, 40]
  }), []);

  useEffect(() => {
    if (map) {
      if (selectedPoint) {
        map.setView([selectedPoint.location.latitude, selectedPoint.location.longitude], selectedPoint.location.zoom);
      } else {
        map.setView([city.location.latitude, city.location.longitude], city.location.zoom);
      }
    }
  }, [map, city, selectedPoint]);

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);

      points.forEach((point) => {
        const marker = new Marker({
          lat: point.location.latitude,
          lng: point.location.longitude
        });

        let icon = defaultCustomIcon;
        if (hoveredPoint !== undefined && point.id === hoveredPoint.id) {
          icon = hoveredCustomIcon;
        }
        marker.setIcon(icon).addTo(markerLayer);
      });

      if (selectedPoint) {
        const selectedMarker = new Marker({
          lat: selectedPoint.location.latitude,
          lng: selectedPoint.location.longitude
        });
        selectedMarker.setIcon(currentCustomIcon).addTo(markerLayer);
      }

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, points, selectedPoint, hoveredPoint, defaultCustomIcon, currentCustomIcon, hoveredCustomIcon]);

  return <div style={{ height: '100%' }} ref={mapRef}></div>;
});

MapComponent.displayName = 'MapComponent';

export default MapComponent;
