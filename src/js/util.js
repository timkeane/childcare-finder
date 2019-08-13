import {cardJSON} from './cardjson';

const vcf = require('vcf');

const decorations = [{
  extendFeature() {},
  html() {
    return $('<div class="facility"></div>')
      .addClass(this.cssClass())
      .append(this.distanceHtml())
      .append(this.nameHtml())
      .append(this.distanceHtml(true))
      .append(this.addressHtml())
      .append(this.phoneButton())
      .append(this.mapButton())
      .append(this.contactInfo())      
      .append(this.directionsButton())
      .append(this.detailsCollapsible())
      .data('feature', this)
      .mouseover($.proxy(this.handleOver, this))
      .mouseout($.proxy(this.handleOut, this));
  },  
  getName() {
    return this.get('name');
  },
  getAddress() {
    return this.get('address');
  },
  getAddress1() {
    return this.getAddress();
  },
  getCityStateZip() {
    return '';
  },
  getPhone() {
    return this.get('phone');
  },
  detailsHtml() {
      const detail = this.get('levelofcare');
      return $('<div>' + createLevelOfCareTable(detail)+ '</div>');
  },
  cssClass() {
    return this.get('model_type');
  },
  contactInfo() {
    const app = this.app;
    const feature = this;
    return $('<button class="btn rad-all vcard">Contact Info</button>').click(() => {
      const fileName = feature.getName() + '.vcf';
      const jsonData = cardJSON(feature); 
      const card = vcf.fromJSON(jsonData);
      const vcfCard = card.toString("4.0");
      try {
        const blob = new Blob([card], {type:'text/plain',endings: 'native'});
        if(window.navigator && window.navigator.msSaveOrOpenBlob) {
          window.navigator.msSaveBlob(blob, fileName);
        } else {        
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = fileName;
          a.click();
          document.removeChild(a);
        }
      } catch(e) {
        const blobBuilder = new MSBlobBuilder();
        blobBuilder.append(card);
        const blob = blobBuilder.getBlob('text/plain;charset=utf-8');
        window.navigator.msSaveBlob(blob, fileName);
      }     
      app.addToList(feature);
    })
   }
}];

function createLevelOfCareTable(detail) {
  const arrLC = JSON.parse(detail);        
  let lcTableData = "";
  const ind=arrLC[0][3];  
  if (arrLC[0][0] === 1 || arrLC[1][0] === 1 || arrLC[2][0] === 1 || arrLC[3][0] === 1) {          
    lcTableData += "<table class='detailTbl' cellspacing='0' cellpadding='0' border='1' class=\u0022customTable\u0022>";
    lcTableData += "<caption>Age Groups</caption>";
    lcTableData += "<thead>";
    lcTableData += "<tr>";
    lcTableData += "<th>";
    lcTableData += "Group";
    lcTableData += "</th>";
    lcTableData += "<th>";
    lcTableData += "Min Age";
    lcTableData += "</th>";
    lcTableData += "<th>";
    lcTableData += "Max Age";
    lcTableData += "</th>";
    lcTableData += "</tr>";
    lcTableData += "</thead>";
    lcTableData += "<tbody>";
    arrLC.forEach(function(arr, idx) {
      lcTableData += genLCRow(arr, idx);
    });        
    lcTableData += "</tbody>";          
    if(indDiv(ind) != "") {
      lcTableData += "<tfoot>";
      lcTableData += "<tr>";
      lcTableData += "<td colspan='3' style='color:red;font-weight:bold'>";
      lcTableData += indDiv(ind); 
      lcTableData += "</td>";
      lcTableData += "</tr>";
      lcTableData += "</tfoot>";
    }          
    lcTableData += "</table>";
    return  lcTableData;        
  }
}

function genLCRow(arr, idx) {    
  let rowData = "";
  if (arr[0] === 1) {
    rowData += "<tr>";
    rowData += "<td>";
    rowData += (idx===0 ? "Infant" : (idx===1 ? "Toddler" : (idx===2 ? "Pre-School" : "School")));
    rowData += "</td>";
    rowData += "<td>";
    rowData += getAgeStringFromNumber(arr[1].toFixed(2));
    rowData += "</td>";
    rowData += "<td>";
    rowData += getAgeStringFromNumber(arr[2].toFixed(2));
    rowData += "</td>";
    rowData += "</tr>";
  }    
  return rowData;
}

function getAgeStringFromNumber(inputValue) {
  let age = "";
  const yearMonth = inputValue.toString().split('.');
  const year = parseInt(yearMonth[0]);
  const month = parseInt(yearMonth[1]);
  age = (year===0 ? "" : (year +  ( year> 1 ? " yrs " : " yr ")));
  age += (month===0 ? "" : (month +  ( month> 1 ? " mos" : " mo")));
  return age;            
}

function indDiv(ind) {
  switch(ind) {
    case 1:
      return "Open all year";
      break;
    case 2:
      return "Open during summer only";
      break;
    case 3:
      return "Day camp open during summer only";
      break;
    case 4:
      return "Country camp open during summer only";
      break;
    default:
      return "";
  }
}

function getSchoolDistricts() {
  const schooDistrictInfo = new Array();
  const index=new Array();
  const property_name = 'school_district';
  for (let i = 1; i <= 32; i++) {
    if (i.toString().length < 2) {
      i = '0' + i;
    }
    for (let j = 1; j <= 32; j++) {
      if (j.toString().length < 2) {
        j = '0' + j;
      }
      index.push(j.toString());
    }
    schooDistrictInfo[1]= {name: property_name, values:index, label:'ALL',checked:true}
    schooDistrictInfo.push(
      {name: property_name, values:[i.toString()], label:i.toString()}
    )
  }
  return schooDistrictInfo;
}

export default {
  decorations,
  indDiv,
  getAgeStringFromNumber,
  genLCRow,
  createLevelOfCareTable,
  getSchoolDistricts
};