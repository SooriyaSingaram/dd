import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Widgets } from '../WidgetsModel';


@Injectable()
export class ChartService {

  constructor(private http: Http) { }

  tablename: string;

  public url: string = "http://35.170.221.105:4000/api/chart";
 //private url :string='http://192.168.1.125:4000/api/chart'; 


  getTonarData() {

    let headers = new Headers({ 'Accept': 'application/json' });
    let token: string = localStorage.getItem("currentToken");

    headers.append('x-access-token', token);
    let options = new RequestOptions({ headers: headers });

    let tonar: string = `${this.url}/tonerData`
    return this.http.get(tonar, options).map((response: Response) => response.json());
  }

  getTable() {
    let headers = new Headers({ 'Accept': 'application/json' });
    let token: string = localStorage.getItem("currentToken");

    headers.append('x-access-token', token);
    let options = new RequestOptions({ headers: headers });
    let table: string = `${this.url}/getTables`
    return this.http.get(table, options).map((response: Response) => response.json());
  }

  getFieldname() {

    let headers = new Headers({ 'Accept': 'application/json' });
    let token: string = localStorage.getItem("currentToken");

    headers.append('x-access-token', token);
    let options = new RequestOptions({ headers: headers });

    let field: string = `${this.url}/getFields`
    return this.http.get(field, options).map((response: Response) => {
		let x =response.json();
		 delete x._id;
		 delete x['__v'];
		let data=  Object.values(x)
		return data
            
	});
  }


  getDynamicData(table, chartFields: any, filterFields: any, userFilter: any, percentFilter: any,contentFilter:any,sort:Number,dateRange) {
    let body = {};
    if (userFilter && percentFilter) {
      body = { "table": table, "chartFields": chartFields, "userFilter": userFilter, "percentFilter": percentFilter,contentFilter:contentFilter }
      console.log(body)
    }
    else if (percentFilter) {
      console.log("percentFilter only")
      body = { "table": table, "chartFields": chartFields, "percentFilter": percentFilter }

    }
    else if (userFilter) {
      // console.log("userFilter only")
      body = { "table": table, "chartFields": chartFields, "userFilter": userFilter }
    }
    else {
      // console.log("no filter")
      body = { "table": table, "chartFields": chartFields }

    }

    // if (filterFields.length >= 1) {
    //   body['summaryFields'] = filterFields;
    // }

    if(contentFilter.length>0){
      body['contentFilter'] =contentFilter;
    }
    if(sort){
      body['sort'] =sort;
    }
    if(dateRange){
      if(dateRange.from){
        if(!dateRange.to){
          dateRange.to = new Date()
         }
         body['dateRange'] =dateRange; 
      }
        
    }
    // body['summaryByFields'] = filterFields;
    
    let headers = new Headers({ 'Accept': 'application/json' });
    let token: string = localStorage.getItem("currentToken");

    headers.append('x-access-token', token);
    let options = new RequestOptions({ headers: headers });
    let toner: string = `${this.url}/dataFilter`
    return this.http.post(toner, body, options).map((response: Response) => response.json());
  }

  getChartData(tablename, chartField) {
    let body = { "table": tablename, "chartFields": chartField }

    let headers = new Headers({ 'Accept': 'application/json' });
    let token: string = localStorage.getItem("currentToken");

    headers.append('x-access-token', token);
    let options = new RequestOptions({ headers: headers });
    let toner: string = `${this.url}/dataFilter`
    return this.http.post(toner, body, options).map((response: Response) => response.json());
  }

  getFilterData(table, chartFields: any, filterFields: any, selectedValue2) {
    let headers = new Headers({ 'Accept': 'application/json' });
    let token: string = localStorage.getItem("currentToken");

    headers.append('x-access-token', token);
    let options = new RequestOptions({ headers: headers });
    let body = { "table": table, "chartFields": chartFields, "filterFields": filterFields, "Month": selectedValue2 }
    let toner: string = `${this.url}/dataFilter`
    return this.http.post(toner, body, options).map((response: Response) => response.json());
  }
  getWidgetData(tableName, PropertyToSum: any) {

    let headers = new Headers({ 'Accept': 'application/json' });
    let token: string = localStorage.getItem("currentToken");

    headers.append('x-access-token', token);
    let options = new RequestOptions({ headers: headers });
    let body = { "table": tableName, "sumProperty": PropertyToSum }
    let toner: string = `${this.url}/summation`
    return this.http.post(toner, body, options).map((response: Response) => response.json());
  }

  getParentCompanyList() {

    let headers = new Headers({ 'Accept': 'application/json' });
    let token: string = localStorage.getItem("currentToken");

    headers.append('x-access-token', token);
    let options = new RequestOptions({ headers: headers });
    let toner: string = `${this.url}/getParentCompanyList`
    return this.http.get(toner, options).map((response: Response) => response.json());
  }

  getUserFilter(fieldname) {

    let headers = new Headers({ 'Accept': 'application/json' });
    let token: string = localStorage.getItem("currentToken");

    headers.append('x-access-token', token);
    let options = new RequestOptions({ headers: headers });
    let body = {
      // "table": tablename,
      "fieldName": fieldname

    }
    let toner: string = `${this.url}/FilterFieldList`
    return this.http.post(toner, body, options).map((response: Response) => response.json());
  }

  getTopResults() {
    let headers = new Headers({ 'Accept': 'application/json' });
    let token: string = localStorage.getItem("currentToken");

    headers.append('x-access-token', token);
    let options = new RequestOptions({ headers: headers });

    let toner: string = `${this.url}/topFiveRecord`
    return this.http.post(toner, {}, options).map((response: Response) => response.json());

  }

  getCompanyBasedOnParent(fieldName, baseFilter) {
    let headers = new Headers({ 'Accept': 'application/json' });
    let token: string = localStorage.getItem("currentToken");

    headers.append('x-access-token', token);
    let options = new RequestOptions({ headers: headers });
    let body = {
      "fieldName": fieldName,
      "baseFilter": baseFilter
    }
    let toner: string = `${this.url}/FilterFieldList`
    return this.http.post(toner, body, options).map((response: Response) => response.json());
  }

  getWidgetResult() {
    let headers = new Headers({ 'Accept': 'application/json' });
    let token: string = localStorage.getItem("currentToken");

    headers.append('x-access-token', token);
    let options = new RequestOptions({ headers: headers });

    let toner: string = `${this.url}/staticWidget`
    return this.http.get(toner, options).map((response: Response) => response.json());

  }
  emailDashboard(data) {
    let headers = new Headers({ 'Accept': 'application/json' });
    let token: string = localStorage.getItem("currentToken");
    headers.append('x-access-token', token);
    let options = new RequestOptions({ headers: headers });
    let api_Url: string = `${this.url}/emailDashboard`
    return this.http.post(api_Url, data, options).map((response: Response) => response.json());
  }

}
