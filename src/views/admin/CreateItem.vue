<template>
    <div class="page-content-holder p-2">
        <h1>This is the CREATE ITEM view</h1>
        <form class="custom-form" v-on:submit.prevent="onSubmit">
            <div class="form-group">
                <label for="item">Item Name</label>
                <input v-model="item" type="text" class="form-control" id="item" placeholder="Item Name" />
            </div>
            <div class="form-group">
                <label for="quantity">Quantity</label>
                <input v-model="quantity" type="text" class="form-control" id="quantity" placeholder="Quantity" />
            </div>
            <div class="form-group">
                <label for="price">Price</label>
                <input v-model="price" type="text" class="form-control" id="price" placeholder="Price" />
            </div>
            <div class="form-group">
                <button type="submit" class="btn btn-outline-primary font-weight-bold">Create Item</button>
            </div>
        </form>
    </div>
</template>

<script>
    import * as item_manager from '../../services/ItemManagerService'

    export default {
        name: 'create_item',
        data: function() {
            return {
                item: '',
                quantity: '',
                price: ''
            }
        },
        methods: {
            onSubmit: async function() {
                const new_item = {
                    name: this.item,
                    quantity: this.quantity,
                    price: this.price
                }

                await item_manager.createItem(new_item)
                this.$router.push({ name: 'ManageKitchen' })
            }
        }
    }
</script>