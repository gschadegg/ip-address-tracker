import L from 'leaflet';
import Mark from '../images/icon-location.svg'

const LocationMarker = new L.Icon({
    iconUrl: Mark,
    iconRetinaUrl:Mark,
    iconSize: new L.Point(46, 56),
    className: 'location-marker-icon'
});

export default LocationMarker;