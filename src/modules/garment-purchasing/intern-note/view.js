import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';


@inject(Router, Service)
export class View {
    
    constructor(router, service) {
        this.router = router;
        this.service = service;
        this.hasCancel = true;
        this.hasEdit = true;
        this.hasDelete = true;
    }

    async activate(params) {
        var id = params.id;
        this.hasEdit = true;
        this.hasDelete = true;
        this.data = await this.service.getById(id);
        this.currency = this.data.currency;
        this.supplier = this.data.supplier;
        this.data.isView = true;

        if (!this.data.isEdit){
            this.hasEdit = false;
            this.hasDelete = false;
        }
    }

    cancel(event) {
        this.router.navigateToRoute('list');
    }

    edit(event) {
        this.router.navigateToRoute('edit', { id: this.data.Id });
    }

    delete(event) {
        this.service.delete(this.data).then(result => {
            this.cancel();
        });
    }
}
