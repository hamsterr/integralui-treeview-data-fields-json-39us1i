import { Component, ViewContainerRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IntegralUITreeView } from '@lidorsystems/integralui-web/bin/integralui/components/integralui.treeview';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent  {
    @ViewChild('application', {read: ViewContainerRef}) applicationRef: ViewContainerRef;
    @ViewChild('treeview') treeview: IntegralUITreeView;

    public items: Array<any> = [];

    public ctrlStyle: any = {
        general: {
            normal: 'trw-dfjson-normal'
        }
    }

    public treeFields: any = {
        id: 'itemId',
        expanded: 'isExpanded',
        pid: 'parentId',
        items: 'children',
        text: 'label'
    }

    constructor(private http: HttpClient){
    }   

    ngAfterViewInit(){
        // Load data into the TreeView from a JSON file
        this.loadFromJSON();
    }

    private loadFromJSON(){
        let self = this;

        // Use HTTP service to get data from the specified JSON file
        self.http.get("./assets/file.json").subscribe((data: Array<any>) => {
            // Suspend the tree layout from updates, to increase performance
            self.treeview.suspendLayout();

            // Load data into the tree view
            self.treeview.loadData(data, null, self.treeFields, false);

            // Resume and update the tree layout
            self.treeview.resumeLayout();
        });
    }
}
