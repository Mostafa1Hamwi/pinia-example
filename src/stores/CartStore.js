import { defineStore, acceptHMRUpdate } from "pinia";
import { groupBy } from "lodash";
import { useAuthUserStore } from "./AuthUserStore";

export const useCartStore = defineStore("CartStore", {
    state: () => {
        return {
            items: []
        }
    },

    getters: {
        count() {
            return this.items.length
        },

        isEmpty() {
            return this.count == 0
        },
        grouped() {
            const grouped = groupBy(this.items, item => item.name)
            const sorted = Object.keys(grouped).sort()
            let inOrder = {}
            sorted.forEach(key => inOrder[key] = grouped[key])
            return inOrder
        },

        //Another way to define a getter using arrow functions (state is the alternative of 'this' keyword)
        groupCount: (state) => (name) => state.grouped[name].length,

        total() {
            return this.items.reduce((p, c) => p + c.price, 0)
        }
    },

    actions: {
        checkout() {
            const AuthUserStore = useAuthUserStore()
            alert(`${AuthUserStore.username} just bought ${this.count} items at a total of $${this.total}`)
        },

        addItems(count, item) {
            count = parseInt(count);
            for (let index = 0; index < count; index++) {
                this.items.push({ ...item });
            }
        },
        clearItem(itemName) {
            this.items = this.items.filter(item => item.name !== itemName)
        },
        setItemCount(item, count) {
            this.clearItem(item.name)
            this.addItems(count, item)
        }
    }
})


//for hot reloading store code changes without the need to refresh the page

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useCartStore, import.meta.hot))
}