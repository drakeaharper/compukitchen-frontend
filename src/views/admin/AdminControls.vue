<template>
    <div class="page-content-holder p-2 m-2">
        <h1>Users</h1>
        <div class="border border-dark my-2 p-2" v-for="user of users" :key="user.username">
            <div class="row">
                <div class="col-sm font-weight-bold">{{ user.username }}</div>
                <div class="col-sm font-weight-bold">{{ user.role }}</div>
                <div class="col-sm font-weight-bold">
                    <select :id="`select-${user.username}`">
                        <option :selected="user.role === 'admin'" value="admin">Admin</option>
                        <option :selected="user.role === 'user'" value="user">User</option>
                    </select>
                </div>
                <div class="col-sm font-weight-bold">
                    <button class="btn btn-outline-success font-weight-bold" @click="updateUserRole(user.username, user._id)">
                        Update Role
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import * as user_manager from '../../services/UserService'
    // import {showAt} from 'vue-breakpoints'

    export default {
        name: 'admin_controls',
        // components: { showAt },
        data: function() {
            return {
                users: {}
            }
        },
        beforeRouteEnter(to, from, next) {
            user_manager.getAllUsers()
            .then(res => {
                next(vm => {
                    console.table(res.data.users)
                    vm.users = res.data.users
                })
            })
        },
        methods: {
            updateUserRole: async function(username, user_id, current_role) {
                let new_role = document.getElementById(`select-${username}`).value
                if (new_role === current_role) return
                user_manager.updateUserById(user_id, new_role)
            }
        }
    }
</script>