<template>
    <main style="padding-top:10px;">
        <!-- Heading for History Data -->
        <div class="row">
            <div class="col-12">
                <h2 class="text-center text-primary">History Data Overview</h2>
            </div>
        </div>

        <!-- IMEI Selection -->
        <div class="row mb-3">
            <label for="imei" class="col-sm-2 col-form-label">IMEI</label>
            <div class="col-sm-10">
                <select v-model="selectedImei" id="imei" class="form-select" style="width:auto;">
                    <option v-for="imei in imeiList" :key="imei" :value="imei">{{ imei }}</option>
                </select>
            </div> 
        </div>

        <!-- Data Table -->
        <table class="table table-striped">
            <thead>
                <tr>
                    <th>IMEI/MAC</th>
                    <th>Hut ID</th>
                    <th>Device ID</th>
                    <th>Channel ID</th>
                    <th>Device Type</th>
                    <th>Gear Type</th>
                    <th>Timestamp</th>
                    <th>Value</th>
                </tr>
            </thead>
            <tbody>
                <div v-if="loading" class="loading">Loading data, please wait...</div>
                <tr v-for="item in tableData" :key="item.imeiMac">
                    <td>{{ item.imeiMac }}</td>
                    <td>{{ item.hutId }}</td>
                    <td>{{ item.deviceId }}</td>
                    <td>{{ item.channalId }}</td>
                    <td>{{ item.deviceType }}</td>
                    <td>{{ item.gearType?.gearType || 'N/A' }}</td>
                    <td>{{ formatTimestamp(item.timeStamp) }}</td>
                    <td>{{ item.value }}</td>
                </tr>
            </tbody>
        </table>

        <!-- Message when no data is available -->
        <div v-if="!loading" class="no-data">No data available for the selected IMEI.</div>
    </main>
</template>

<script>
import ApiGatewayServies from '../../Services/ApiGatewayServies';
// import { toast } from 'vue-toastification'; // Uncomment if you are using toast notifications

export default {
    data() {
        return {
            imeiList: [], // Holds the fetched IMEI list
            selectedImei: '', // Stores the selected IMEI
            tableData: [], // Data to populate the table
            loading: false, // Controls the loading state
        };
    },
    created() {
        // Fetch IMEI list when the component is created
        this.fetchImeiList();
    },
    watch: {
        // Watch for changes in the selected IMEI and fetch table data
        selectedImei(newImei) {
            if (newImei) {
                this.fetchTableData(newImei);
            }
        },
    },
    methods: {
        // Fetch IMEI list from the API
        async fetchImeiList() {
            try {
                this.loading = true; // Set loading state to true

                const token = localStorage.getItem('authToken'); // Retrieve token from localStorage
                if (!token) {
                    throw new Error('Authentication token is missing.');
                }

                const response = await ApiGatewayServies.get('Master/Imeis', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });

                this.imeiList = response.data; // Store the fetched IMEI list

                // toast.success('IMEI list fetched successfully!'); // Display success toast (optional)
            } catch (error) {
                console.error('Error fetching IMEI list:', error);
                // toast.error(error.response?.data || 'Failed to fetch IMEI list.');
            } finally {
                this.loading = false; // Reset loading state
            }
        },

        // Fetch table data based on the selected IMEI
        async fetchTableData(imei) {
            try {
                this.loading = true; // Set loading state to true

                const token = localStorage.getItem('authToken'); // Retrieve token from localStorage
                if (!token) {
                    throw new Error('Authentication token is missing.');
                }

                // Construct the URL with the selected IMEI
                const url = `DeviceData/GetDeviceDetailsByImeiMac?imeiMac=${imei}`;

                const response = await ApiGatewayServies.get(url, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });

                this.tableData = response.data; // Update table data
                console.log(this.tableData);

                // toast.success('Data fetched successfully!'); // Display success toast (optional)
            } catch (error) {
                console.error('Error fetching table data:', error);
                // toast.error(error.response?.data || 'Failed to fetch table data.');
            } finally {
                this.loading = false; // Reset loading state
            }
        },

        formatTimestamp(timestamp) {
            const date = new Date(timestamp * 1000);

            // Get the hours, minutes, and seconds in UTC
            let hours = date.getUTCHours();
            let minutes = date.getUTCMinutes();
            let seconds = date.getUTCSeconds();

            // Adjust for GMT +5:30 (Indian Standard Time)
            hours += 5; // Add 5 hours for GMT +5:00
            minutes += 30; // Add 30 minutes for GMT +5:30

            // Adjust if minutes exceed 60 (wrap around)
            if (minutes >= 60) {
                minutes -= 60;
                hours += 1;
            }

            // Ensure hours stay within the 24-hour range
            if (hours >= 24) {
                hours -= 24;
            }

            // Format hours, minutes, and seconds to always show two digits
            const formattedHours = hours < 10 ? `0${hours}` : hours;
            const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
            const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

            // Return formatted time in HH:mm:ss
            return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
        }

    },
};
</script>

<style scoped>
.table {
    margin-top: 20px;
}
</style>