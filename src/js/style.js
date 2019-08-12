import nycOl from 'nyc-lib/nyc/ol' 
import Style from 'ol/style/Style'
import Icon from 'ol/style/Icon'
import Fill from 'ol/style/Fill'
import Stroke from 'ol/style/Stroke'
import Text from 'ol/style/Text'

export const style = (feature, resolution) => {
  return new Style({
    image: new Icon({
      src: `img/${feature.get('model_type')}.png`,
      scale: 24 / 64
    })
  })
}

export const districtStyle = (feature, resolution) => {
  const zoom = nycOl.TILE_GRID.getZForResolution(resolution);
  let fontSize = (zoom - 10) * 8 + 16;
  if (fontSize <= 0) fontSize = 12;
  return new Style({
    fill: new Fill({
      color: 'rgba(0, 0, 0, 0)'
    }),
    stroke: new Stroke({
      color: '#319FD3',
      width: 1
    }),
    text: new Text({
      text: `${feature.get('NAME')}`,
      font: `${fontSize}px Calibri,sans-serif`,
      fill: new Fill({
        color: '#808080'
      }),
      stroke: new Stroke({
        color: '#fff',
        width: 3
      })
    })
  })
}