import React from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const googleMapApiKey = 'AIzaSyDfz-OcfyJFfU3PdUUmPNjh1PbAd5JXKp8';

const LocationInput = () => (
  <GooglePlacesAutocomplete
    placeholder='Search'
    onPress={(data, details = null) => {
      // 'details' is provided when fetchDetails = true
      console.log(data, details);
    }}
    styles={{
      listView: {
        position: 'fixed',
        marginTop: 60
      }
    }}
    query={{
      key: googleMapApiKey,
      language: 'en',
    }}
    requestUrl={{
      useOnPlatform: 'web', // or "all"
      url:
        'https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api', // or any proxy server that hits https://maps.googleapis.com/maps/api
    }}
  />
);

export default LocationInput;
