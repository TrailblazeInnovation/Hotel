  export const MapExtension = {
    name: 'Maps',
    type: 'response',
    match: ({ trace }) =>
      trace.type === 'ext_map' || trace.payload?.name === 'ext_map',
    render: ({ trace, element }) => {
      const GoogleMap = document.createElement('iframe');
      const { apiKey, origin, destination, travelMode, zoom, height, width } = trace.payload;
      GoogleMap.width = width || ${height};
      GoogleMap.height = height || ${width};
      GoogleMap.style.border = '0';
      GoogleMap.loading = 'lazy';
      GoogleMap.allowFullscreen = true;
      GoogleMap.src = `https://www.google.com/maps/embed/v1/directions?key=${apiKey}&origin=${origin}&destination=${destination}&zoom=${zoom}&mode=${travelMode}`;
      element.appendChild(GoogleMap);
    }
  };
