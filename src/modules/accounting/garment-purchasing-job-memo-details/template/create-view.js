import { inject, bindable, BindingEngine } from 'aurelia-framework'
import { Service } from '../service';
import moment from 'moment';
var MemoGarmentPurchasingLoader = require('../../../../loader/memo-garment-purchasing-loader');

@inject(Service, BindingEngine)
export class DataForm {
    @bindable readOnly;
    @bindable packingReadOnly = false;
    @bindable data = {}
    @bindable error;
    @bindable memo;
    @bindable title;

    formOptions = {
        cancelText: "Kembali",
        saveText: "Simpan",
        deleteText: "Hapus",
        editText: "Ubah",
    };

    constructor(service, bindingEngine) {
        this.bindingEngine = bindingEngine;
    }

    bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;

        this.cancelCallback = this.context.cancelCallback;
        this.deleteCallback = this.context.deleteCallback;
        this.editCallback = this.context.editCallback;
        this.saveCallback = this.context.saveCallback;
    }

    itemsColumns = ["No. Disposisi"]

    get memoGarmentPurchasingLoader() {
        return MemoGarmentPurchasingLoader;
    }

    get addItems() {
        return (event) => {
            this.data.MemoDetailGarmentPurchasingDispositions.push({});
        };
    }

    get getMemoDate() {
        if (this.data.Memo) {
            return moment(this.data.Memo.MemoDate).format("DD-MMM-YYYY")
        }
        return '';
    }
}