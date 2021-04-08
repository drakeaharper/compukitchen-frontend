<template>
    <div>
        <h1>This is the MANAGE KITCHEN view</h1>
        <div class="row mx-3 my-2">
            <div class="col-sm font-weight-bold">
                Name
            </div>
            <div class="col-sm font-weight-bold">
                Price
            </div>
            <div class="col-sm font-weight-bold">
                Item Quantity
            </div>
            <div class="col-sm font-weight-bold">

            </div>
        </div>
        <div class="row mx-3 my-2" v-for="item of food_items" v-bind:key="item.name">
            <div class="col-sm">
                {{ item.name }}
            </div>
            <div class="col-sm">
                ${{ item.price.toFixed(2) }}
            </div>
            <div class="col-sm">
                {{ item.quantity }}
            </div>
            <router-link type="button" class="col-sm btn btn-outline-primary font-weight-bold" :to="{ name: 'EditItem', params: { id: item._id } }" exact>Edit</router-link>
        </div>
    </div>
</template>

<script>
    import * as item_manager from '../../services/ItemManagerService'

    export default {
        name: 'manage_roles',
        currentQuizId: null,
        data: function() {
            return {
                food_items: null
            }
        },
        beforeRouteEnter(to, from, next) {
            item_manager.listFoodItems()
            .then(res => {
                next(vm => {
                    vm.food_items = res.data.food_items;
                });
            });
        }
    }
</script>