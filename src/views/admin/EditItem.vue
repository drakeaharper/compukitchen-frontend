<template>
    <div class="page-content-holder p-2">
        <h1>This is the EDIT ITEM view</h1>
        <form class="custom-form" v-on:submit.prevent="onSubmit">
            <div class="form-group">
                <label for="item">Item Name</label>
                <input v-model="item.name" type="text" class="form-control" id="item" placeholder="Item Name" />
            </div>
            <div class="form-group">
                <label for="quantity">Quantity</label>
                <input v-model="item.quantity" type="text" class="form-control" id="quantity" placeholder="Quantity" />
            </div>
            <div class="form-group">
                <label for="price">Price</label>
                <input v-model="item.price" type="text" class="form-control" id="price" placeholder="Price" />
            </div>
            <div class="d-flex">
                <button class="btn btn-outline-danger mx-2 font-weight-bold" @click.prevent="deleteItem()">Delete</button>
                <button class="btn btn-outline-primary mx-2 font-weight-bold" to="/manage_kitchen">Cancel</button>
                <button type="submit" class="btn btn-outline-success mx-2 font-weight-bold">Save Changes</button>
            </div>
        </form>
    </div>
</template>

<script>
    import * as item_manager from '../../services/ItemManagerService'

    export default {
        name: 'edit_item',
        data: function() {
            return {
                item: {
                    name: '',
                    price: '',
                    quantity: '',
                    id: ''
                }
            }
        },
        beforeRouteEnter(to, from, next) {
            item_manager.getItem(to.params.id)
                .then(response => {
                    if (!response) {
                        next('/manage_kitchen')
                    } else {
                        next(vm => {
                            const item = response.data.food_item
                            vm.item.name = item.name
                            vm.item.quantity = item.quantity
                            vm.item.price = item.price
                            vm.item.id = item._id
                        })
                    }
                })
        },
        methods: {
            onSubmit: async function () {
                const updated_item = {
                    name: this.item.name,
                    quantity: this.item.quantity,
                    price: this.item.price,
                    id: this.item.id
                }

                await item_manager.updateItem(updated_item, this.item.id)
                this.$router.push({ name: 'ManageKitchen' })
            },
            deleteItem: async function () {
                await item_manager.deleteItem(this.item.id)
                this.$router.push({ name: 'ManageKitchen' })
            }
        }
    }
</script>