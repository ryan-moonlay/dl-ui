import { inject, Lazy } from "aurelia-framework";
import { RestService } from "../../../utils/rest-service";

const serviceUri = "garment-debt-balance";

export class Service extends RestService {
  constructor(http, aggregator, config, endpoint) {
    super(http, aggregator, config, "finance");
  }

  search(info) {
    //console.log(info);
    let endpoint = `${serviceUri}`;
    // let endpoint = `${serviceUri}?bankId=${info.bankId}&dateFrom=${info.dateFrom}&dateTo=${info.dateTo}`;
    return super.list(endpoint, info);
  }

  getXls(info) {
    let endpoint = `${serviceUri}/downloads/xls?supplierId=${info.supplierId}&supplierName=${info.supplierName}&month=${info.month}&year=${info.year}`;
    return super.getXls(endpoint);
  }

  getPdf(info) {
    let endpoint = `${serviceUri}/downloads/pdf?supplierId=${info.supplierId}&supplierName=${info.supplierName}&month=${info.month}&year=${info.year}`;
    return super.getPdf(endpoint);
  }
}
