export class SpreadsheetIDs {

    spreadsheetID = '1OYgHJ7V7BN2KfGDJzjd8h6eo4JQ4zbGnMXHbxqbYSwU';
  
    dataObjects =  [
      {objName: 'Gerardo', tabID: 'ofy98t8', cache: 'gerardoCache', useYN: 'Y', labelName: 'Gerardo'}
    ];
    tabURLStart = 'https://spreadsheets.google.com/feeds/list/';
    allTabsURLStart = 'https://spreadsheets.google.com/feeds/worksheets/';
    urlEnd = '/public/full?alt=json';
  
    getTabURL(whichTab: string ): string {
      return this.tabURLStart + this.spreadsheetID + '/' +
        this.dataObjects.find(myObj => myObj.objName === whichTab).tabID +
        this.urlEnd;
    }
    getCacheName(whichTab: string ): string {
      return this.dataObjects.find(myObj => myObj.objName === whichTab).cache;
    }
    getLabelName(whichTab: string ): string {
      return this.dataObjects.find(myObj => myObj.objName === whichTab).labelName;
    }
    getAllTabsURL(): string {
      return this.allTabsURLStart + this.spreadsheetID + this.urlEnd;
    }
  }
  