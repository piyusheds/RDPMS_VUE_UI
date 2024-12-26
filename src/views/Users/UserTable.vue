<template>
    <main>
        <!-- Add User Button and Search Box -->
        <div style="display: flex; justify-content: space-between; align-items: center;margin-bottom: 10px;">
            <b-input-group style="width: 50%;">
                <b-form-input v-model="search" placeholder="Search..." />
            </b-input-group>
            <b-button variant="success" @click="navigateToAddUser" size="sm">
                <b-icon icon="plus" aria-hidden="true"></b-icon> Add User
            </b-button>
        </div>

        <!-- User Table -->
        <b-table :items="filteredItems" :fields="fields" responsive="sm" bordered hover striped>
            <template #cell(user_id)="row">
                <span>{{ row.value }}</span>
            </template>
            <template #cell(mail_id)="row">
                <span>{{ row.value }}</span>
            </template>
            <template #cell(phone_no)="row">
                <span>{{ row.value }}</span>
            </template>
            <template #cell(action)="row">
                <b-button variant="info" size="sm" @click="viewUser(row.item)">
                    View
                </b-button>
            </template>
        </b-table>
    </main>
</template>

<script>
import ApiGatewayServies from '../../Services/ApiGatewayServies';

export default {
    data() {
        return {
            search: "",
            fields: [
                { key: "user_id", label: "User ID" },
                { key: "mail_id", label: "Mail ID" },
                { key: "phone_no", label: "Phone No." },
                { key: "action", label: "Action" },
            ],
            items: [], // Placeholder for API data
        };
    },
    computed: {
        filteredItems() {
            let filtered = this.items;

            if (this.search) {
                filtered = filtered.filter((item) =>
                    Object.values(item)
                        .join(" ")
                        .toLowerCase()
                        .includes(this.search.toLowerCase())
                );
            }

            return filtered;
        },
    },
    methods: {
        async fetchUsers() {
            // Dummy data for testing
            const dummyData = [
                { user_id: 1, mail_id: "user1@example.com", phone_no: "1234567890" },
                { user_id: 2, mail_id: "user2@example.com", phone_no: "9876543210" },
                { user_id: 3, mail_id: "user3@example.com", phone_no: "1122334455" },
                { user_id: 4, mail_id: "user4@example.com", phone_no: "5566778899" },
                { user_id: 5, mail_id: "user5@example.com", phone_no: "2233445566" },
            ];
            
            // Setting the dummy data initially
            this.items = dummyData;

            try {
                // Fetch data from the API
                const response = await ApiGatewayServies.get("users");
                // Override dummy data with API response if available
                this.items = response.data || this.items; // Use API data if available
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        },
        viewUser(user) {
            // Handle viewing the user details, navigate to another page or show modal
            this.$router.push({ name: 'userDetails', params: { userId: user.user_id } });
        },
        navigateToAddUser() {
            // Navigate to the add user component
            this.$router.push({ name: 'Register' });
        },
    },
    mounted() {
        this.fetchUsers(); // Fetch the users on component mount
    },
};
</script>

<style scoped>
/* Styling for the table */
.b-table {
    margin-top: 20px;
}

.b-input-group {
    display: flex;
    justify-content: flex-start;
    align-items: center;
}

.b-input-group .form-control {
    max-width: 300px;
}

.b-button {
    margin-right: 10px;
}

#EditBtn {
    margin-right: 10px;
}
</style>
