import { inject, bindable, computedFrom } from "aurelia-framework";
import { Service } from "./service";
import { Router } from "aurelia-router";
import moment from "moment";
import numeral from "numeral";
var CategoryLoader = require("../../../../loader/category-loader");
var AccountingUnitLoader = require("../../../../loader/accounting-unit-loader");
var DivisionLoader = require("../../../../loader/division-loader");

@inject(Router, Service)
export class List {
  constructor(router, service) {
    this.service = service;
    this.router = router;

    this.isImport = false;
    this.isForeignCurrency = false;
    this.titles = ["Lokal", "Lokal Valas", "Impor"];
    this.activeTitle = this.titles[0];
  }

  controlOptions = {
    label: {
      length: 4,
    },
    control: {
      length: 5,
    },
  };

  tableOptions = {
    pagination: false,
    showColumns: false,
    search: false,
    showToggle: false,
  };

  columns = [
    {
      field: "ReceiptDate",
      title: "Tanggal SPB",
      formatter: function (value, data, index) {
        return moment.utc(value).local().format("DD MMM YYYY");
      },
    },
    { field: "UPONo", title: "No SPB" },
    { field: "URNNo", title: "No BP" },
    { field: "InvoiceNo", title: "No Invoice" },
    { field: "SupplierName", title: "Supplier" },
    { field: "CategoryName", title: "Kategori" },
    { field: "AccountingUnitName", title: "Unit" },
    {
      field: "DueDate",
      title: "Jatuh Tempo",
      formatter: function (value, data, index) {
        return moment.utc(value).local().format("DD MMM YYYY");
      },
    },
    { field: "CurrencyCode", title: "Currency" },
    {
      field: "TotalSaldo",
      title: "Saldo",
      formatter: function (value, data, index) {
        return numeral(value).format("0,000.00");
      },
      align: "right",
    },
  ];

  columnsUnit = [
    { field: "AccountingUnitName", title: "Unit" },
    {
      field: "SubTotal",
      title: "Total",
      formatter: function (value, data, index) {
        return numeral(value).format("0,000.00");
      },
      align: "right",
    },
  ];

  columnsCurrency = [
    { field: "CurrencyCode", title: "Mata Uang" },
    {
      field: "SubTotal",
      title: "Total",
      formatter: function (value, data, index) {
        return numeral(value).format("0,000.00");
      },
      align: "right",
    },
    {
      field: "SubTotalIDR",
      title: "Total (IDR)",
      formatter: function (value, data, index) {
        return numeral(value).format("0,000.00");
      },
      align: "right",
    },
  ];

  changeTitle(title) {
    this.isSearch = false;
    this.isImport = title !== "Impor" ? false : true;
    this.isForeignCurrency = title !== "Lokal Valas" ? false : true;

    if (title !== this.activeTitle) {
      this.activeTitle = title;
    }

    this.documentTable.refresh();
    this.documentTableUnit.refresh();
    this.documentTableCurrency.refresh();
  }

  search() {
    this.isSearch = true;
    this.documentTable.refresh();
    this.documentTableUnit.refresh();
    this.documentTableCurrency.refresh();
  }

  reset() {
    this.category = null;
    this.accountingUnit = null;
    this.division = null;
    this.dateTo = null;
    this.isSearch = false;
    this.documentTable.refresh();
    this.documentTableUnit.refresh();
    this.documentTableCurrency.refresh();
  }

  get categoryLoader() {
    return CategoryLoader;
  }

  get accountingUnitLoader() {
    return AccountingUnitLoader;
  }

  get divisionLoader() {
    return DivisionLoader;
  }

  loader = () => {
    let categoryId = 0;
    if (this.category && this.category._id) categoryId = this.category._id;

    let accountingUnitId = 0;
    if (this.accountingUnit && this.accountingUnit.Id)
      accountingUnitId = this.accountingUnit.Id;

    let divisionId = 0;
    if (this.division && this.division.Id) divisionId = this.division.Id;

    let dateTo = this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : "";

    let arg = {
      categoryId,
      accountingUnitId,
      divisionId,
      dateTo,
      isImport: this.isImport,
      isForeignCurrency: this.isForeignCurrency,
    };

    if (this.isSearch) {
      return this.service.search(arg).then((result) => {
        return {
          data: result.Reports,
        };
      });
    } else {
      return {
        total: 0,
        data: [],
      };
    }
  };

  loaderUnit = () => {
    let categoryId = 0;
    if (this.category && this.category._id) categoryId = this.category._id;

    let accountingUnitId = 0;
    if (this.accountingUnit && this.accountingUnit.Id)
      accountingUnitId = this.accountingUnit.Id;

    let divisionId = 0;
    if (this.division && this.division.Id) divisionId = this.division.Id;

    let dateTo = this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : "";

    let arg = {
      categoryId,
      accountingUnitId,
      divisionId,
      dateTo,
      isImport: this.isImport,
      isForeignCurrency: this.isForeignCurrency,
    };

    if (this.isSearch) {
      return this.service.search(arg).then((result) => {
        return {
          data: result.AccountingUnitSummaries,
        };
      });
    } else {
      return {
        total: 0,
        data: [],
      };
    }
  };

  loaderCurrency = () => {
    let categoryId = 0;
    if (this.category && this.category._id) categoryId = this.category._id;

    let accountingUnitId = 0;
    if (this.accountingUnit && this.accountingUnit.Id)
      accountingUnitId = this.accountingUnit.Id;

    let divisionId = 0;
    if (this.division && this.division.Id) divisionId = this.division.Id;

    let dateTo = this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : "";

    let arg = {
      categoryId,
      accountingUnitId,
      divisionId,
      dateTo,
      isImport: this.isImport,
      isForeignCurrency: this.isForeignCurrency,
    };

    if (this.isSearch) {
      return this.service.search(arg).then((result) => {
        return {
          data: result.CurrencySummaries,
        };
      });
    } else {
      return {
        total: 0,
        data: [],
      };
    }
  };

  xls() {
    let categoryId = 0;
    if (this.category && this.category._id) categoryId = this.category._id;

    let accountingUnitId = 0;
    if (this.accountingUnit && this.accountingUnit.Id)
      accountingUnitId = this.accountingUnit.Id;

    let divisionId = 0;
    if (this.division && this.division.Id) divisionId = this.division.Id;

    let dateTo = this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : "";

    let arg = {
      categoryId,
      accountingUnitId,
      divisionId,
      dateTo,
      isImport: this.isImport,
      isForeignCurrency: this.isForeignCurrency,
    };

    return this.service.xls(arg).then((result) => {
      return {
        data: result.Reports,
      };
    });
  }

  pdf() {
    let categoryId = 0;
    if (this.category && this.category._id) categoryId = this.category._id;

    let accountingUnitId = 0;
    if (this.accountingUnit && this.accountingUnit.Id)
      accountingUnitId = this.accountingUnit.Id;

    let divisionId = 0;
    if (this.division && this.division.Id) divisionId = this.division.Id;

    let dateTo = this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : "";

    let arg = {
      categoryId,
      accountingUnitId,
      divisionId,
      dateTo,
      isImport: this.isImport,
      isForeignCurrency: this.isForeignCurrency,
    };

    return this.service.pdf(arg).then((result) => {
      return {
        data: result.Reports,
      };
    });
  }
}