<template>
    <div class="page-content-holder p-2 m-2">
        <h1>This is the ORDER HISTORY view</h1>
        <div class="border mx-2 my-3 px-2 pt-2" v-for="month of order_history" v-bind:key="month.month_name">
            <p class="display-4">{{ month.month_name }} {{ month.year }}</p>
            <div class="d-flex flex-row-reverse flex-wrap-reverse">
                <h3 class="mr-5">${{ parseFloat(month.month_cost).toFixed(2) }}</h3>
                <h3 class="font-weight-bold mr-3">Month Total:</h3>
            </div>
            <div class="d-flex flex-row-reverse flex-wrap-reverse">
                <button
                    type="button"
                    @click="submit(month.month_name, month.month_cost, month.month_number)"
                    class="mb-3 mr-3 btn btn-outline-success font-weight-bold"
                    v-bind:class="{disabled: month.submitted}"
                >
                    {{ month.workflow_sate }}
                </button>
            </div>
            <div class="border mx-3 my-3 px-2 pt-2" v-for="order of month.items" v-bind:key="order.order_date">
                <div>{{ order.order_date }}</div>
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
                </div>
                <div v-for="item of order.items" v-bind:key="item.name">
                    <div class="row mx-3 my-2">
                        <div class="col-sm">
                            {{ item.name }}
                        </div>
                        <div class="col-sm">
                            ${{ item.price.toFixed(2) }}
                        </div>
                        <div class="col-sm">
                            {{ item.amount }}
                        </div>
                    </div>
                </div>
                <div class="my-3 d-flex flex-row-reverse">
                    <div class="mr-5">${{ parseFloat(order.total_cost).toFixed(2) }}</div>
                    <div class="font-weight-bold mr-3">Order Cost:</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import * as order_manager from '../../services/OrderManagerService'
    import * as submission_manager from '../../services/SubmissionManagerService'

    export default {
        name: 'manage_roles',
        currentQuizId: null,
        data: function() {
            return {
                order_history: "",
                month_names: {
                    "January":"01",
                    "February":"02",
                    "March":"03",
                    "April":"04",
                    "May":"05",
                    "June":"06",
                    "July":"07",
                    "August":"08",
                    "September":"09",
                    "October":"10",
                    "November":"11",
                    "December":"12"
                }
            }
        },
        beforeRouteEnter(to, from, next) {
            order_manager.getUserOrders(to.params.id)
            .then(res => {
                let sorted_orders = {}
                let unsorted_orders = res.data.order_history
                let month_names = ["make index 1 based", "January","February","March","April","May","June","July","August","September","October","November","December"]
                unsorted_orders.forEach(order => {
                    if (sorted_orders[order.createdAt.slice(5,7)] === undefined) {
                        sorted_orders[order.createdAt.slice(5,7)] = {}
                        sorted_orders[order.createdAt.slice(5,7)].items = []
                        sorted_orders[order.createdAt.slice(5,7)].month_cost = 0
                        sorted_orders[order.createdAt.slice(5,7)].year = order.createdAt.slice(0,4)
                        sorted_orders[order.createdAt.slice(5,7)].month_name = month_names[parseInt(order.createdAt.slice(5,7))]
                        sorted_orders[order.createdAt.slice(5,7)].month_number = order.createdAt.slice(5,7)
                    }
                    sorted_orders[order.createdAt.slice(5,7)].items.push(order)
                    sorted_orders[order.createdAt.slice(5,7)].month_cost += parseFloat(order.total_cost)
                })
                return sorted_orders
            })
            .then(async sorted => {
                let result = await submission_manager.getUserSubmissions(to.params.id)
                result = result.data.submissions
                for (let key in sorted) {
                    let obj = sorted[key]
                    let already_submitted = false
                    result.forEach(sub => {
                        if (sub.month === obj.month_name) {
                            sorted[key].workflow_sate = "Submitted"
                            already_submitted = true
                        }
                    })
                    if (!already_submitted) {
                        sorted[key].workflow_sate = "Submit"
                    }
                    sorted[key].submitted = already_submitted
                }
                next(vm => {
                    vm.order_history = sorted
                })
            })
        },
        methods: {
            submit: async function (month, month_total, month_number) {
                await submission_manager.userSubmit(this.$store.state.userId, month, month_total, this.$store.state.name)
                this.order_history[month_number].workflow_sate = "Submitted"
                this.order_history[month_number].submitted = true
            }
        }
    }
</script>