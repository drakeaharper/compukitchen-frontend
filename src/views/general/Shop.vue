<template>
    <div class="page-content-holder p-2 m-2">
        <h1>This is the SHOP view</h1>
        <div class="d-flex">
            <div class="mx-3 my-2" style="width: 50%;">
                <hide-at breakpoint="small">
                    <h3 class="mx-1">What's in the kitchen</h3>
                </hide-at>
                <show-at breakpoint="smallAndAbove">
                    <h3 class="mx-1">Cupboard</h3>
                </show-at>
                <hide-at breakpoint="small">
                    <div class="row mx-3 my-2 mb-2">
                        <div class="col-sm font-weight-bold">
                            Name
                        </div>
                        <div class="col-sm font-weight-bold">
                            Price
                        </div>
                        <div class="col-sm font-weight-bold">
                            Quantity
                        </div>
                        <div class="col-sm font-weight-bold">

                        </div>
                    </div>
                </hide-at>
                <div class="row mx-3 my-2" v-for="item in food_items" v-bind:key="item.name">
                    <div class="col-sm">
                        {{ item.name }}
                    </div>
                    <div class="col-sm">
                        ${{ item.price.toFixed(2) }}
                    </div>
                    <div class="col-sm">
                        {{ item.quantity }}
                    </div>
                    <hide-at breakpoint="small">
                        <button type="button" @click="addToCart(item)" class="col-sm btn btn-outline-primary font-weight-bold">
                            Add to Cart
                        </button>
                    </hide-at>
                    <show-at breakpoint="smallAndAbove">
                        <button type="button" @click="addToCart(item)" class="col-sm btn btn-outline-primary font-weight-bold">
                            <p class="h3"><b-icon icon="cart-plus"></b-icon></p>
                        </button>
                    </show-at>
                </div>
            </div>
            <div class="mx-3 my-2" style="width: 50%;">
                <hide-at breakpoint="small">
                    <h3 class="mx-1">Shopping Cart</h3>
                </hide-at>
                <show-at breakpoint="smallAndAbove">
                    <h3 class="mx-1">Cart</h3>
                </show-at>
                <hide-at breakpoint="small">
                    <div class="row mx-3 my-2">
                        <div class="col-sm font-weight-bold">
                            Item
                        </div>
                        <div class="col-sm font-weight-bold">
                            Cost
                        </div>
                        <div class="col-sm font-weight-bold">
                            Amount
                        </div>
                        <div class="col-sm font-weight-bold">

                        </div>
                    </div>
                </hide-at>

                <div class="row mx-3 my-2" v-for="item of cart_items" v-bind:key="item.name">
                    <div class="col-sm">
                        {{ item.name }}
                    </div>
                    <div class="col-sm">
                        ${{ item.price.toFixed(2) }}
                    </div>
                    <div class="col-sm">
                        {{ item.amount }}
                    </div>
                    <hide-at breakpoint="small">
                        <button type="button" @click="removeFromCart(item)" class="col-sm mb-2 btn btn-outline-danger font-weight-bold">
                            Remove
                        </button>
                    </hide-at>
                    <show-at breakpoint="smallAndAbove">
                        <button type="button" @click="removeFromCart(item)" class="col-sm mb-2 btn btn-outline-danger font-weight-bold">
                            <p class="h3"><b-icon icon="cart-dash"></b-icon></p>
                        </button>
                    </show-at>
                </div>
                <div v-if="Object.keys(cart_items).length !== 0" class="d-flex row mx-3">
                    <div class="col-sm font-weight-bold">
                        Total Cost:
                    </div>
                    <div class="col-sm">
                        ${{ total_cost.toFixed(2) }}
                    </div>
                    <div class="col-sm">
                    </div>
                    <hide-at breakpoint="small">
                        <button type="button" @click="checkout()" class="col-sm mb-2 btn btn-outline-success font-weight-bold">
                            Checkout
                        </button>
                    </hide-at>
                    <show-at breakpoint="smallAndAbove">
                        <button type="button" @click="checkout()" class="col-sm mb-2 btn btn-outline-success font-weight-bold">
                            <p class="h3"><b-icon icon="cart-check"></b-icon></p>
                        </button>
                    </show-at>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import * as item_manager from '../../services/ItemManagerService'
    import * as order_manager from '../../services/OrderManagerService'
    import {showAt, hideAt} from 'vue-breakpoints'

    export default {
        name: 'shopping_center',
        components: { hideAt, showAt },
        data: function() {
            return {
                food_items: '',
                cart_items: {},
                total_cost: 0
            }
        },
        beforeRouteEnter(to, from, next) {
            item_manager.listFoodItems()
            .then(res => {
                next(vm => {
                    let available = res.data.food_items.map(item => {
                    return (item.quantity > 0 ) ? item : undefined
                })
                let temp = available.filter(a => a !== undefined)
                vm.food_items = temp
                })
            })
        },
        methods: {
            addToCart: function (item) {
                if (item.quantity === 0) { return }
                this.food_items.forEach(i => {
                    if (item.name === i.name) {
                        if (this.cart_items[item.name] !== undefined) {
                            let temp_item = this.cart_items[item.name]
                            temp_item.amount += 1
                            temp_item.price = temp_item.amount * i.price

                            i.quantity -= 1
                            this.cart_items[item.name] = temp_item
                        } else {
                            let temp_item = {}
                            temp_item.name = item.name
                            temp_item.price = item.price
                            temp_item.amount = 1
                            temp_item.id = item._id
                            this.cart_items[item.name] = temp_item

                            i.quantity -= 1
                        }

                        let total = 0
                        let cart = this.cart_items
                        Object.keys(this.cart_items).forEach(function (key) {
                            total += cart[key].price
                        })
                        this.total_cost = total
                    }
                })
            },
            removeFromCart: function (item) {
                this.total_cost -= item.price
                this.food_items.forEach(i => {
                    if (i.name === item.name) {
                        i.quantity += item.amount
                    }
                })
                delete this.cart_items[item.name]
            },
            checkout: async function () {
                await order_manager.checkout(this.cart_items, this.$store.state.userId, this.total_cost)
                this.$router.push({ name: 'OrderHistory' , params: { id: this.$store.state.userId } })
            }
        }
    }
</script>