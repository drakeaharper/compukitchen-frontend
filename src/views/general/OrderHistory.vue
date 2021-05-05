<template>
    <div id="order_history_parent" class="page-content-holder p-2 m-2">
        <h1>Order Histroy</h1>
        <div class="border border-dark mx-2 my-3 px-2 pt-2" v-for="month of order_history" v-bind:key="month.month_name">
            <a
                class="order-history-collapse-anchor"
                data-toggle="collapse"
                :data-target="`#collapse${month.month_name}`"
            >
                <p class="h3 order-history-collapse-anchor-text">
                    {{ month.month_name }} {{ month.year }}
                    <b-icon icon="chevron-down"></b-icon>
                </p>
            </a>
            <div class="d-flex flex-row-reverse flex-wrap-reverse">
                <h3 class="mr-5">${{ parseFloat(month.month_cost).toFixed(2) }}</h3>
                <h3 class="font-weight-bold mr-3">Month Total:</h3>
            </div>
            <div v-if="month.workflow_state !== 'CurrentMonth'" class="d-flex flex-row-reverse flex-wrap-reverse">
                <button
                    type="button"
                    @click="submit(month.month_name, month.month_cost, month.month_number)"
                    class="mb-3 mr-3 btn btn-outline-success font-weight-bold"
                    :disabled="month.submitted"
                >
                    {{ month.workflow_state }}
                </button>
            </div>
            <div
                class="border border-dark mx-3 my-3 px-2 pt-2 collapse"
                :id="`collapse${month.month_name}`"
                v-for="order of month.items"
                v-bind:key="order.order_date"
            >
                <div>{{ order.order_date }}</div>
                <show-at breakpoint="mediumAndAbove">
                    <div class="row mx-3 my-2">
                        <div class="col-sm font-weight-bold">
                            Name
                        </div>
                        <div class="col-sm font-weight-bold">
                            Price
                        </div>
                        <div class="col-sm font-weight-bold">
                            Quantity
                        </div>
                    </div>
                </show-at>
                <div v-for="item of order.items" v-bind:key="item.name" class="mb-2">
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
    import {showAt} from 'vue-breakpoints'

    export default {
        name: 'order_history',
        components: { showAt },
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
                unsorted_orders.reverse().forEach(order => {
                    if (sorted_orders[order.createdAt.slice(5,7)] === undefined) {
                        sorted_orders[order.createdAt.slice(5,7)] = {}
                        sorted_orders[order.createdAt.slice(5,7)].items = []
                        sorted_orders[order.createdAt.slice(5,7)].month_cost = 0
                        sorted_orders[order.createdAt.slice(5,7)].year = order.createdAt.slice(0,4)
                        sorted_orders[order.createdAt.slice(5,7)].month_name = month_names[parseInt(order.createdAt.slice(5,7))]
                        sorted_orders[order.createdAt.slice(5,7)].month_number = order.createdAt.slice(5,7)
                    }
                    order.order_date = `${month_names[parseInt(order.createdAt.slice(5,7))]} ${order.createdAt.slice(8,10)}`
                    sorted_orders[order.createdAt.slice(5,7)].items.push(order)
                    sorted_orders[order.createdAt.slice(5,7)].month_cost += parseFloat(order.total_cost)
                })
                return sorted_orders
            })
            .then(async sorted => {
                console.log(sorted)
                let current_date = new Date()
                let formatted_month = () => {
                    let current_month = current_date.getMonth() + 1
                    if (current_month < 10) {
                        return '0' + current_month
                    }
                    return current_month.toString()
                }

                let result = await submission_manager.getUserSubmissions(to.params.id)
                result = result.data.submissions
                for (let key in sorted) {
                    let already_submitted = false
                    if (key === formatted_month() && sorted[key].year === current_date.getFullYear().toString()) {
                        sorted[key].workflow_state = "CurrentMonth"
                        already_submitted = true
                    } else {
                        result.forEach(sub => {
                            if (sub.month === sorted[key].month_name) {
                                sorted[key].workflow_state = sub.workflow_status
                                already_submitted = true
                            }
                        })
                    }

                    if (!already_submitted) {
                        sorted[key].workflow_state = "Submit"
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
                this.order_history[month_number].workflow_state = "Submitted"
                this.order_history[month_number].submitted = true
            }
        }
    }
</script>