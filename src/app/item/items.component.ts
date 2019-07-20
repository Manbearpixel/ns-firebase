import { Component, OnInit } from "@angular/core";

import { Item } from "./item";
import { ItemService } from "./item.service";

const firebase = require('nativescript-plugin-firebase');

@Component({
  selector: "ns-items",
  moduleId: module.id,
  templateUrl: "./items.component.html"
})
export class ItemsComponent implements OnInit {
  items: Array<Item>;

  // This pattern makes use of Angular’s dependency injection implementation to
  // inject an instance of the ItemService service into this class.
  // Angular knows about this service because it is included in your app’s main NgModule,
  // defined in app.module.ts.
  constructor(private itemService: ItemService) { }

  ngOnInit(): void {
    this.items = this.itemService.getItems();
  }

  public captureCustomEvent() {
    firebase.analytics.logEvent({
      key: 'wallet_send_bad_other'
    })
    .then(() => { console.log('[Analytics] Metric logged >> Wallet Send Bad Other'); });
  }

  public captureSpendCurrency(amount: number) {

    const spentBuckets = {
      usmall:    [0, 100],
      umedium:   [101, 500],
      ustandard: [501, 1000],
      ularge:    [1001, 5000],
      uxlarge:   [5001, 10000],
      uxxlarge:  [10001, 30000]
    };

    const bucket = Object.keys(spentBuckets).find(label => {
      const range = spentBuckets[label];
      return (amount > range[0] && amount < range[1]);
    });

    const bucketLabel = bucket ? bucket : 'Other';

    const parameters = [
      {
        key: 'virtual_currency_name',
        value: 'testnet'
      },
      {
        key: 'item_name',
        value: bucketLabel
      }
    ];

    firebase.analytics.logEvent({
      key: 'spend_virtual_currency',
      parameters
    })
    .then(() => {
      console.log(`[Analytics] Metric logged >> Spend [${bucketLabel}]
        ${JSON.stringify(parameters)}
      `);

      // send cartItemAdded
      this.captureCartItemAdded();
    });
  }

  public captureCartItemAdded() {
    firebase.analytics.logEvent({
      key: 'cart_item_added',
      parameters: [
        {
          key: 'name',
          value: 'Sample Item'
        }
      ]
    })
    .then(() => {
      console.log('[Analytics] Metric logged >> CartItem');
    });
  }
}
