import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import { Observable, throwError as _observableThrow, of as _observableOf } from 'rxjs';
import { Injectable, Inject, Optional, InjectionToken } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';

export const BASE_URL = new InjectionToken<string>('BASE_URL');

@Injectable()
export class EmployeeAPIClient {
  private http: HttpClient;
  private baseUrl: string;
  protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

  constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(BASE_URL) baseUrl?: string) {
    this.http = http;
    this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : "";
  }

  /**
   * @param body (optional) 
   * @return Success
   */
  addEmployee(body: AddEmployeeDto | undefined): Observable<void> {
    let url_ = this.baseUrl + "/api/EmployeeAPI/AddEmployee";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(body);

    let options_: any = {
      body: content_,
      observe: "response",
      responseType: "blob",
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      })
    };

    return this.http.request("post", url_, options_).pipe(_observableMergeMap((response_: any) => {
      return this.processAddEmployee(response_);
    })).pipe(_observableCatch((response_: any) => {
      if (response_ instanceof HttpResponseBase) {
        try {
          return this.processAddEmployee(response_ as any);
        } catch (e) {
          return _observableThrow(e) as any as Observable<void>;
        }
      } else
        return _observableThrow(response_) as any as Observable<void>;
    }));
  }

  protected processAddEmployee(response: HttpResponseBase): Observable<void> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse ? response.body :
        (response as any).error instanceof Blob ? (response as any).error : undefined;

    let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } }
    if (status === 200) {
      return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
        return _observableOf(null as any);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return _observableOf(null as any);
  }

  /**
   * @param id (optional) 
   * @return Success
   */
  deleteEmployee(id: number | undefined): Observable<void> {
    let url_ = this.baseUrl + "/api/EmployeeAPI/DeleteEmployee?";
    if (id === null)
      throw new Error("The parameter 'id' cannot be null.");
    else if (id !== undefined)
      url_ += "id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");

    let options_: any = {
      observe: "response",
      responseType: "blob",
      headers: new HttpHeaders({
      })
    };

    return this.http.request("delete", url_, options_).pipe(_observableMergeMap((response_: any) => {
      return this.processDeleteEmployee(response_);
    })).pipe(_observableCatch((response_: any) => {
      if (response_ instanceof HttpResponseBase) {
        try {
          return this.processDeleteEmployee(response_ as any);
        } catch (e) {
          return _observableThrow(e) as any as Observable<void>;
        }
      } else
        return _observableThrow(response_) as any as Observable<void>;
    }));
  }

  protected processDeleteEmployee(response: HttpResponseBase): Observable<void> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse ? response.body :
        (response as any).error instanceof Blob ? (response as any).error : undefined;

    let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } }
    if (status === 200) {
      return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
        return _observableOf(null as any);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return _observableOf(null as any);
  }

  /**
   * @return Success
   */
  getAllEmployees(): Observable<EmployeeDto[]> {
    let url_ = this.baseUrl + "/api/EmployeeAPI/GetAllEmployees";
    url_ = url_.replace(/[?&]$/, "");

    let options_: any = {
      observe: "response",
      responseType: "blob",
      headers: new HttpHeaders({
        "Accept": "text/plain"
      })
    };

    return this.http.request("get", url_, options_).pipe(_observableMergeMap((response_: any) => {
      return this.processGetAllEmployees(response_);
    })).pipe(_observableCatch((response_: any) => {
      if (response_ instanceof HttpResponseBase) {
        try {
          return this.processGetAllEmployees(response_ as any);
        } catch (e) {
          return _observableThrow(e) as any as Observable<EmployeeDto[]>;
        }
      } else
        return _observableThrow(response_) as any as Observable<EmployeeDto[]>;
    }));
  }

  protected processGetAllEmployees(response: HttpResponseBase): Observable<EmployeeDto[]> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse ? response.body :
        (response as any).error instanceof Blob ? (response as any).error : undefined;

    let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } }
    if (status === 200) {
      return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
        let result200: any = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        if (Array.isArray(resultData200)) {
          result200 = [] as any;
          for (let item of resultData200)
            result200!.push(EmployeeDto.fromJS(item));
        }
        else {
          result200 = <any>null;
        }
        return _observableOf(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return _observableOf(null as any);
  }

  /**
   * @param body (optional) 
   * @return Success
   */
  updateEmployee(body: UpdateEmployeeDto | undefined): Observable<void> {
    let url_ = this.baseUrl + "/api/EmployeeAPI/UpdateEmployee";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(body);

    let options_: any = {
      body: content_,
      observe: "response",
      responseType: "blob",
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      })
    };

    return this.http.request("put", url_, options_).pipe(_observableMergeMap((response_: any) => {
      return this.processUpdateEmployee(response_);
    })).pipe(_observableCatch((response_: any) => {
      if (response_ instanceof HttpResponseBase) {
        try {
          return this.processUpdateEmployee(response_ as any);
        } catch (e) {
          return _observableThrow(e) as any as Observable<void>;
        }
      } else
        return _observableThrow(response_) as any as Observable<void>;
    }));
  }

  protected processUpdateEmployee(response: HttpResponseBase): Observable<void> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse ? response.body :
        (response as any).error instanceof Blob ? (response as any).error : undefined;

    let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } }
    if (status === 200) {
      return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
        return _observableOf(null as any);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return _observableOf(null as any);
  }

  /**
   * @param id (optional) 
   * @return Success
   */
  getEmployeebyId(id: number | undefined): Observable<EmployeeDto> {
    let url_ = this.baseUrl + "/api/EmployeeAPI/GetEmployeebyId?";
    if (id === null)
      throw new Error("The parameter 'id' cannot be null.");
    else if (id !== undefined)
      url_ += "id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");

    let options_: any = {
      observe: "response",
      responseType: "blob",
      headers: new HttpHeaders({
        "Accept": "text/plain"
      })
    };

    return this.http.request("get", url_, options_).pipe(_observableMergeMap((response_: any) => {
      return this.processGetEmployeebyId(response_);
    })).pipe(_observableCatch((response_: any) => {
      if (response_ instanceof HttpResponseBase) {
        try {
          return this.processGetEmployeebyId(response_ as any);
        } catch (e) {
          return _observableThrow(e) as any as Observable<EmployeeDto>;
        }
      } else
        return _observableThrow(response_) as any as Observable<EmployeeDto>;
    }));
  }

  protected processGetEmployeebyId(response: HttpResponseBase): Observable<EmployeeDto> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse ? response.body :
        (response as any).error instanceof Blob ? (response as any).error : undefined;

    let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } }
    if (status === 200) {
      return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
        let result200: any = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = EmployeeDto.fromJS(resultData200);
        return _observableOf(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return _observableOf(null as any);
  }
}

export class AddEmployeeDto implements IAddEmployeeDto {
  empName?: string | undefined;
  empSalary?: number;
  emailId?: string | undefined;
  password?: string | undefined;
  fkRelation?: number;

  constructor(data?: IAddEmployeeDto) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.empName = _data["empName"];
      this.empSalary = _data["empSalary"];
      this.emailId = _data["emailId"];
      this.password = _data["password"];
      this.fkRelation = _data["fkRelation"];
    }
  }

  static fromJS(data: any): AddEmployeeDto {
    data = typeof data === 'object' ? data : {};
    let result = new AddEmployeeDto();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data["empName"] = this.empName;
    data["empSalary"] = this.empSalary;
    data["emailId"] = this.emailId;
    data["password"] = this.password;
    data["fkRelation"] = this.fkRelation;
    return data;
  }
}

export interface IAddEmployeeDto {
  empName?: string | undefined;
  empSalary?: number;
  emailId?: string | undefined;
  password?: string | undefined;
  fkRelation?: number;
}

export class EmployeeDto implements IEmployeeDto {
  pkEmpId?: number;
  empName?: string | undefined;
  empSalary?: number;
  emailId?: string | undefined;
  password?: string | undefined;
  fkRelation?: number;

  constructor(data?: IEmployeeDto) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.pkEmpId = _data["pkEmpId"];
      this.empName = _data["empName"];
      this.empSalary = _data["empSalary"];
      this.emailId = _data["emailId"];
      this.password = _data["password"];
      this.fkRelation = _data["fkRelation"];
    }
  }

  static fromJS(data: any): EmployeeDto {
    data = typeof data === 'object' ? data : {};
    let result = new EmployeeDto();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data["pkEmpId"] = this.pkEmpId;
    data["empName"] = this.empName;
    data["empSalary"] = this.empSalary;
    data["emailId"] = this.emailId;
    data["password"] = this.password;
    data["fkRelation"] = this.fkRelation;
    return data;
  }
}

export interface IEmployeeDto {
  pkEmpId?: number;
  empName?: string | undefined;
  empSalary?: number;
  emailId?: string | undefined;
  password?: string | undefined;
  fkRelation?: number;
}

export class UpdateEmployeeDto implements IUpdateEmployeeDto {
  pkEmpId?: number;
  empName?: string | undefined;
  empSalary?: number;
  emailId?: string | undefined;
  password?: string | undefined;
  fkRelation?: number;

  constructor(data?: IUpdateEmployeeDto) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.pkEmpId = _data["pkEmpId"];
      this.empName = _data["empName"];
      this.empSalary = _data["empSalary"];
      this.emailId = _data["emailId"];
      this.password = _data["password"];
      this.fkRelation = _data["fkRelation"];
    }
  }

  static fromJS(data: any): UpdateEmployeeDto {
    data = typeof data === 'object' ? data : {};
    let result = new UpdateEmployeeDto();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data["pkEmpId"] = this.pkEmpId;
    data["empName"] = this.empName;
    data["empSalary"] = this.empSalary;
    data["emailId"] = this.emailId;
    data["password"] = this.password;
    data["fkRelation"] = this.fkRelation;
    return data;
  }
}

export interface IUpdateEmployeeDto {
  pkEmpId?: number;
  empName?: string | undefined;
  empSalary?: number;
  emailId?: string | undefined;
  password?: string | undefined;
  fkRelation?: number;
}

export class ApiException extends Error {
  override message: string;
  status: number;
  response: string;
  headers: { [key: string]: any; };
  result: any;

  constructor(message: string, status: number, response: string, headers: { [key: string]: any; }, result: any) {
    super();

    this.message = message;
    this.status = status;
    this.response = response;
    this.headers = headers;
    this.result = result;
  }

  protected isApiException = true;

  static isApiException(obj: any): obj is ApiException {
    return obj.isApiException === true;
  }
}

function throwException(message: string, status: number, response: string, headers: { [key: string]: any; }, result?: any): Observable<any> {
  if (result !== null && result !== undefined)
    return _observableThrow(result);
  else
    return _observableThrow(new ApiException(message, status, response, headers, null));
}

function blobToText(blob: any): Observable<string> {
  return new Observable<string>((observer: any) => {
    if (!blob) {
      observer.next("");
      observer.complete();
    } else {
      let reader = new FileReader();
      reader.onload = event => {
        observer.next((event.target as any).result);
        observer.complete();
      };
      reader.readAsText(blob);
    }
  });
}
