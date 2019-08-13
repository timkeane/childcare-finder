/**
 * @module nyc-childcare-finder/App
 */

import $ from 'jquery'
import FinderApp from 'nyc-lib/nyc/ol/FinderApp'
import CsvPoint from 'nyc-lib/nyc/ol/format/CsvPoint'
import util from './util'
import {style, districtStyle} from './style'
import TopoJSON from 'ol/format/TopoJSON'
import VectorSource from 'ol/source/Vector'
import VectorLayer from 'ol/layer/Vector'

class App extends FinderApp {
  /**
   * @desc Create an instance of App
   * @public
   * @constructor
   * @param {module:nyc-lib/nyc/Content~Content} content The POD content
   * @param {string} url The POD data URL
   */
  constructor(content, url) {

    super({
      title: 'Childcare Providers',
      // splashOptions: {message: 'Please wait.'},
      geoclientUrl: 'https://maps.nyc.gov/geoclient/v1/search.json?app_key=74DF5DB1D7320A9A2&app_id=nyc-lib-example',
      facilityTabTitle: 'Childcare Providers',
      facilityUrl: 'data/programs.csv',
      facilityFormat: new CsvPoint({
        x: 'lon',
        y: 'lat',
        dataProjection: 'EPSG:4326'
      }),
      facilityStyle: style,
      filterChoiceOptions: [
        {
          title: 'Program Type',
          radio: false,
          choices: [    
            {name: 'model_type', values: ['GC'],  label:'Child care',checked:true},
            {name: 'model_type', values: ['GD'], label:'Dual',checked:true},
            {name: 'model_type', values: ['GH'], label:'Headstart',checked:true},
            {name: 'model_type', values: ['PP'], label:'Voucher',checked:true}        
          ]
        },
        {
          title: 'Borough',
          radio: true,
          choices: [          
            {name: 'boro', values: ['MN'] ,label: 'Manhattan'},
            {name: 'boro', values: ['BX'] ,label: 'Bronx'},
            {name: 'boro', values: ['QN'] ,label: 'Queens'},
            {name: 'boro', values: ['SI'] ,label: 'Staten Island'},
            {name: 'boro', values: ['BK'] ,label: 'Brooklyn'} 
        ]
        },
        {
          title: 'School District',
          radio: false,
          choices: util.getSchoolDistricts()
        }
      ],
      facilitySearch: {nameField: 'name'},
      decorations: util.decorations,
      directionsUrl: 'https://maps.googleapis.com/maps/api/js?&sensor=false&libraries=visualization'
    })
    this.addSchoolDist(this.map)
  }
  addSchoolDist(map) {
    const source = new VectorSource({
      url: 'data/school-district.json',
      format: new TopoJSON()
    })
    const layer = new VectorLayer({source: source,
      style: districtStyle     
    })
    map.addLayer(layer)
  }
  addToList(feature) {    
    console.warn('adding', feature)
  }
}
 
export default App