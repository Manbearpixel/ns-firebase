import { Injectable } from "@angular/core";

import { Item } from "./item";

@Injectable({
    providedIn: "root"
})
export class ItemService {
    private items = new Array<Item>(
        { id: 1, name: "Send 50", role: "Goalkeeper", amount: 50 },
        { id: 3, name: "Send 120", role: "Defender", amount: 120 },
        { id: 5, name: "Send 520", role: "Midfielder", amount: 520 },
        { id: 7, name: "Send 1,500", role: "Midfielder", amount: 1500 },
        { id: 8, name: "Send 7,500", role: "Midfielder", amount: 7500 },
        { id: 10, name: "Send 15,000", role: "Forward", amount: 15000 },
        { id: 10, name: "Send 50,000", role: "Forward", amount: 50000 }
    );

    getItems(): Array<Item> {
        return this.items;
    }

    getItem(id: number): Item {
        return this.items.filter((item) => item.id === id)[0];
    }
}
