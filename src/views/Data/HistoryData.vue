<template>
    <main style="padding-top:10px;">
        <div class="row">
            <div class="col-12">
                <h2 class="text-center text-primary">History Data Overview</h2>
            </div>
        </div>

        <!-- IMEI Selection -->
        <!-- <div class="row mb-3">
            <label for="imei" class="col-sm-2 col-form-label">IMEI</label>
            <div class="col-sm-10">
                <select v-model="selectedImei" id="imei" class="form-select" style="width:auto;">
                    <option value="" disabled selected>Select IMEI</option>
                    <option v-for="imei in imeiList" :key="imei" :value="imei">{{ imei }}</option>
                </select>
            </div>
        </div> -->

        <div class="main-container">
            <div class="div-ddl">
                <div class="dropdown-container">
                    <label for="imei-select" style="margin-right: 10px;">IMEI</label>
                    <select id="imei-select" v-model="selectedImei" @change="onImeiChange" class="custom-select">
                        <option value="" disabled>Select IMEI</option>
                        <option v-for="imei in imeiList" :key="imei" :value="imei">{{ imei }}</option>
                    </select>
                </div>


                <!-- Hut ID Dropdown -->
                <div class="dropdown-container">
                    <label for="hutId-select" style="margin-right: 10px;">Hut ID</label>
                    <select id="hutId-select" v-model="selectedHutId" @change="filterDataByHutId" class="custom-select"
                        :disabled="!selectedImei">
                        <!-- Default "Select Hut ID" option with empty value -->
                        <option value="" disabled>Select Hut ID</option>

                        <!-- Add the "All" option -->
                        <option value="All">All</option>

                        <!-- Loop through the hutIdList and populate the dropdown -->
                        <option v-for="hutId in hutIdList" :key="hutId" :value="hutId">{{ hutId }}</option>
                    </select>
                </div>


                <div class="dropdown-container">
                    <label for="deviceType-select" style="margin-right: 10px;">Device Type</label>
                    <select id="deviceType-select" v-model="selectedDeviceType" @change="filterAndSortTable"
                        class="custom-select" style="width:118px" :disabled="!selectedImei">
                        <option value="">All</option>
                        <option v-for="device in deviceTypeOrder" :key="device" :value="device">{{ device }}</option>
                    </select>
                </div>
            </div>
        </div>



        <!-- Data Table -->
        <table class="table table-striped">
            <thead>
                <tr>
                    <th @click="sortTable('SNo')">Sno</th>
                    <th>Hut ID</th>
                    <th>Device ID</th>
                    <th>Channel ID</th>
                    <th>Device Type</th>
                    <th>Gear Type</th>
                    <th>Date</th>
                    <th>Timestamp</th>
                    <th>Value</th>
                    <th style="text-align: center;">Status</th>
                </tr>
            </thead>
            <tbody>
                <div v-if="loading" class="loading">Loading data, please wait...</div>
                <tr v-for="(item, index) in paginatedData" :key="item.imeiMac">
                    <td>{{ (currentPage - 1) * itemsPerPage + index + 1 }}</td>
                    <td>{{ item.hutId }}</td>
                    <td>{{ item.deviceId }}</td>
                    <td>{{ item.channalId }}</td>
                    <td>{{ item.deviceType }}</td>
                    <td style="width: 195px;">{{ item.gearType?.gearType || 'N/A' }}</td>
                    <td>{{ formatDate(item.timeStamp) || 'N/A' }}</td>
                    <td>{{ formatTimestamp(item.timeStamp) || 'N/A' }}</td>
                    <td>{{ item.value }}</td>
                    <td style="text-align: center;">
                        <button :class="['status-btn', getStatus(item).statusClass]">
                            {{ getStatus(item).status }}
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>

        <!-- Pagination Controls -->
        <div v-if="!loading && tableData.length > 10" class="pagination-controls">
            <button @click="changePage(currentPage - 1)" :disabled="currentPage === 1">Prev</button>
            <span>Page {{ currentPage }} of {{ totalPages }}</span>
            <button @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages">Next</button>
        </div>

        <!-- Message when no data is available -->
        <div v-if="!loading && tableData.length === 0" class="no-data">No data available for the selected IMEI.</div>
    </main>
</template>

<script>
import ApiGatewayServies from '../../Services/ApiGatewayServies';

export default {
    data() {
        return {
            imeiList: [],
            selectedImei: '',
            tableData: [],
            loading: false,
            currentPage: 1,
            itemsPerPage: 10, // Show 10 items per page
            selectedDeviceType: "",
            deviceTypeOrder: ["Digital Input", "Ac Voltage", "Ac Current", "Dc Voltage", "Dc Current"], // Predefined order

        };
    },
    created() {
        this.fetchImeiList();
    },
    watch: {
        selectedImei(newImei) {
            if (newImei) {
                this.fetchTableData();
            }
        },
        selectedDeviceType() {
            this.filterAndSortTable();  // Apply sorting/filtering when selectedDeviceType changes
        },
        selectedImei(newVal) {
            if (!newVal) {
                // Reset other filters when IMEI is cleared
                this.selectedDeviceType = '';
                this.selectedStatus = '';
                this.searchQuery = '';
            }
        }
    },
    computed: {
        // Calculate the paginated data
        paginatedData() {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            const end = start + this.itemsPerPage;
            return this.tableData.slice(start, end);
        },
        // Calculate the total number of pages
        totalPages() {
            return Math.ceil(this.tableData.length / this.itemsPerPage);
        },
    },
    methods: {
        async fetchImeiList() {
            try {
                this.loading = true;

                const token = localStorage.getItem('authToken');
                if (!token) {
                    throw new Error('Authentication token is missing.');
                }

                const response = await ApiGatewayServies.get('Master/Imeis', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });

                this.imeiList = response.data;
            } catch (error) {
                console.error('Error fetching IMEI list:', error);
            } finally {
                this.loading = false;
            }
        },

        async fetchTableData() {
            if (!this.selectedImei) return;

            try {
                const token = localStorage.getItem('authToken');
                if (!token) throw new Error('Authentication token is missing.');

                let url = `IotDeviceData/GetDeviceDetailsByImeiMac?imeiMac=${this.selectedImei}`;

                // Add device type condition if applicable
                if (this.selectedDeviceType !== 'All') {
                    url += `&deviceType=${this.selectedDeviceType}`;
                }

                const response = await ApiGatewayServies.get(url, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });

                this.tableData = response.data || [];
                console.log("Imei response"+response.data)
                this.filterAndSortTable(); // Optionally apply any filters or sorting
            } catch (error) {
                console.error('Error fetching table data:', error);
            }
        },


        async onImeiChange() {
            try {
                if (!this.selectedImei) return;

                // Fetch Hut IDs based on the selected IMEI
                await this.fetchHutIds();

                // Fetch table data directly based on selected IMEI
                await this.fetchTableData();

                // Re-apply any selected filters or sorting
                this.filterAndSortTable();
            } catch (error) {
                console.error('Error handling IMEI change:', error);
            }
        }

        ,

        async fetchHutIds() {
            if (!this.selectedImei) return;

            try {
                const token = localStorage.getItem('authToken');
                if (!token) throw new Error('Authentication token is missing.');

                const response = await ApiGatewayServies.get(
                    `DeviceData/HutIds?imei=${this.selectedImei}`,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`,
                        },
                    }
                );

                this.hutIdList = response.data || [];
                this.selectedHutId = 'All'; // Default to "All"
            } catch (error) {
                console.error('Error fetching Hut IDs:', error);
            }
        }
        ,


        filterAndSortTable() {
            let filteredData = this.tableData;

            // Apply filtering based on deviceType
            if (this.selectedDeviceType && this.selectedDeviceType !== 'All') {
                filteredData = filteredData.filter(item => item.deviceType === this.selectedDeviceType);
            }

            // Apply pagination on filtered data
            this.paginatedData = filteredData.slice(
                (this.currentPage - 1) * this.itemsPerPage,
                this.currentPage * this.itemsPerPage
            );

            // Update total pages
            this.totalPages = Math.ceil(filteredData.length / this.itemsPerPage);
        }
        ,

        changePage(page) {
            if (page < 1 || page > this.totalPages) {
                return;
            }
            this.currentPage = page;
        },

        formatTimestamp(timestamp) {
            if (!timestamp) {
                return null;
            }

            const date = new Date(timestamp * 1000);
            let hours = date.getUTCHours();
            let minutes = date.getUTCMinutes();
            let seconds = date.getUTCSeconds();

            hours += 5;
            minutes += 30;

            if (minutes >= 60) {
                minutes -= 60;
                hours += 1;
            }

            if (hours >= 24) {
                hours -= 24;
            }

            const formattedHours = hours < 10 ? `0${hours}` : hours;
            const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
            const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

            return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
        },

        formatDate(timestamp) {
            if (!timestamp) {
                return null;
            }

            const date = new Date(timestamp * 1000);
            let hours = date.getUTCHours();
            let minutes = date.getUTCMinutes();

            hours += 5;
            minutes += 30;

            if (minutes >= 60) {
                minutes -= 60;
                hours += 1;
            }

            if (hours >= 24) {
                hours -= 24;
                date.setUTCDate(date.getUTCDate() + 1);
            }

            const day = date.getUTCDate();
            const month = date.getUTCMonth() + 1;
            const year = date.getUTCFullYear();

            const formattedDay = day < 10 ? `0${day}` : day;
            const formattedMonth = month < 10 ? `0${month}` : month;

            return `${formattedDay}/${formattedMonth}/${year}`;
        },

        getStatus(item) {
            if (item.deviceType === 'Digital Input') {
                const status = item.value === "1" ? 'Active' : 'Inactive';
                const statusClass = item.value === "1" ? 'btn-green' : 'btn-red';
                return { status, statusClass };
            }

            if (item.deviceType === "Ac Current" || item.deviceType === "Dc Current") {
                const value = item.value;
                const range1 = item.gearType.channelValueRange1;
                const range2 = item.gearType.channelValueRange2;

                if (value < range1) {
                    return { status: 'Low Current', statusClass: 'btn-gray' };
                } else if (value >= range1 && value <= range2) {
                    return { status: 'Normal Current', statusClass: 'btn-green' };
                } else if (value > range2) {
                    return { status: 'High Current', statusClass: 'btn-red' };
                }
            }

            if (item.deviceType === "Ac Voltage" || item.deviceType === "Dc Voltage") {
                const value = item.value;
                const range1 = item.gearType.channelValueRange1;
                const range2 = item.gearType.channelValueRange2;

                if (value < range1) {
                    return { status: 'Low Voltage', statusClass: 'btn-gray' };
                } else if (value >= range1 && value <= range2) {
                    return { status: 'Normal Voltage', statusClass: 'btn-green' };
                } else if (value > range2) {
                    return { status: 'High Voltage', statusClass: 'btn-red' };
                }
            }

            return { status: 'N/A', statusClass: 'btn-gray' };
        },
    },
};
</script>

<style scoped>
.table {
    margin-top: 20px;
}

.status-btn {
    width: 110px;
    padding: 4px 7px;
    border: none;
    font-size: 13px;
    color: white;
    border-radius: 10px;
    cursor: pointer;
}

.btn-green {
    background-color: rgba(62, 185, 95, 0.1) !important;
    color: #3eb95f;
}

.btn-red {
    background-color: rgba(231, 75, 43, 0.1) !important;
    color: #e74b2b;
}

.btn-gray {
    background-color: rgba(234, 146, 0, 0.1) !important;
    color: #ea9200;
}

.pagination-controls {
    display: flex;
    justify-content: center;
    margin-top: 20px;
}

.pagination-controls button {
    padding: 5px 10px;
    border: none;
    background-color: #007bff;
    color: white;
    cursor: pointer;
    margin: 0 5px;
    border-radius: 5px;
}

.pagination-controls button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
}

.div-ddl {
    display: flex;
    gap: 20px;
    width: 100%;
}

.custom-select {
    padding: 8px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 200px;
}

</style>
