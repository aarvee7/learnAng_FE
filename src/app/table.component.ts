import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { WebService } from './web.service';
import { ActivatedRoute } from '@angular/router';
import { DataTablesModule, DataTableDirective } from 'angular-datatables';
//import { DataTableDirective } from 'angular-datatables';
import { Http, Response } from '@angular/http';
import { Subject } from 'rxjs';
import 'rxjs/add/operator/map';

import * as $ from 'jquery';

interface Mss {
  owner: string;
  test: string;
}

@Component({
  selector: 'tableview',
  templateUrl: `./table.component.html`,
})
export class TableComponent implements OnInit, AfterViewInit {
  @ViewChild(DataTableDirective, { static: false })
  datatableElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  message = '';
  msss: Mss[] = [];
  data: any;
  dummy: any;

  private dsubject = new Subject();
  dtTrigger = this.dsubject;

  constructor(public WebService: WebService) {}
  someClickHandler(info: any): void {
    console.log(info[0].owner, info[0].test, info);
    //this.message = info[0].owner + ' - ' + info[0].test;
    this.message = info[0] + ' - ' + info[1];
  } //     private ActivateRoute: ActivatedRoute //     public WebService: WebService,

  ngOnInit(): void {
    // console.log(this.dummy);
    //console.log(this.data);
    this.dtOptions = {
      // ajax: this.data,
      // data: this.data,
      // columns: [
      //   {
      //     title: 'Owner',
      //     // data: 'owner',
      //   },
      //   {
      //     title: 'Message',
      //     // data: 'test',
      //   },
      // ],
      // columnDefs: [
      //   {
      //     targets: [0],
      //     visible: true,
      //     searchable: false,
      //   },
      //   {
      //     targets: [1],
      //     visible: false,
      //   },
      //   {
      //     targets: [2],
      //     visible: true,
      //   },
      //   {
      //     targets: [3],
      //     visible: true,
      //   },
      // ],
      paging: true,
      ordering: true,

      info: true,
      order: [[0, 'asc']],
      pagingType: 'full_numbers',
      createdRow: function (row, data, index) {
        console.log(data[1]);
        if (data[1] === 'Raj') {
          $('td', row).addClass('highlight');
        }
      },
      rowCallback: (row: Node, data: Mss[], index: number) => {
        const self = this;
        // Unbind first in order to avoid any duplicate handler
        // (see https://github.com/l-lin/angular-datatables/issues/87)

        $('td', row).unbind('click');
        $('td', row).bind('click', () => {
          self.someClickHandler(data);
          console.log(self);
          //console.log(row);
        });
        return row;
      },
    };

    (<any>$('.datepicker')).datepicker();

    //#region  dummy data
    // this.dummy = {
    //   tx: [
    //     { owner: 'erara', test: 'hellow' },
    //     // { owner: 'Vel', test: 'Test' },
    //     // { owner: 'vel', test: 'test223232' },
    //     // { owner: 'Raj', test: 'DOne Today' },
    //     // { owner: 'guru', test: 'hellow' },
    //     // { owner: 'guru', test: 'hellow' },
    //     // { owner: 'raj', test: 'hellow' },
    //     // { owner: 'uiui', test: 'hellow' },
    //     // { owner: 'test', test: 'Raj' },
    //     // { owner: 'test', test: 'Raj' },
    //     // { owner: 'Vel', test: 'Working' },
    //     // { owner: 'Workkdadaskdsad', test: 'Rajjjjjjjj' },
    //     // { owner: 'Vellsllsdasd', test: 'tytytytytyyt' },
    //     // { owner: 'uiui', test: 'hellow' },
    //     // { owner: 'Vel', test: 'Test' },
    //     // { owner: 'vel', test: 'test223232' },
    //     // { owner: 'Raj', test: 'DOne Today' },
    //     // { owner: 'guru', test: 'hellow' },
    //     // { owner: 'guru', test: 'hellow' },
    //     // { owner: 'erara', test: 'hellow' },
    //     // { owner: 'raj', test: 'hellow' },
    //     // { owner: 'test', test: 'Raj' },
    //     // { owner: 'test', test: 'Raj' },
    //     // { owner: 'Workkdadaskdsad', test: 'Rajjjjjjjj' },
    //     // { owner: 'Vel', test: 'Working' },
    //     // { owner: 'Vellsllsdasd', test: 'tytytytytyyt' },
    //   ],
    // };
    //#endregion

    // console.log('test');
    this.WebService.getallMessages().subscribe((response) => {
      //   const data = result['_body'];
      //this.msss = response.json();
      //  var ty = response.json();
      this.msss = response.json();
      //  this.data = JSON.stringify(ty);
      //console.log(this.dummy);
      console.log(this.msss);

      this.dtTrigger.next();
    });

    console.log('test');

    //this.msss = this.WebService.msgs;
  }

  ngAfterViewInit(): void {
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.columns().every(function () {
        const that = this;
        $('input', this.footer()).on('keyup change', function () {
          if (that.search() !== this['value']) {
            that.search(this['value']).draw();
          }
        });
      });
    });
  }
}
