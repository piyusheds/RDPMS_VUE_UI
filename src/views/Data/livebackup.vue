<template>
    <main>
        <div class="main-container">
            <div class="div-ddl">
                <div class="dropdown-container">
                    <label for="imei-select">IMEI</label>
                    <select id="imei-select" v-model="selectedImei" @change="fetchTableData" class="custom-select">
                        <option value="" disabled>Select IMEI</option>
                        <option v-for="imei in imeiList" :key="imei" :value="imei">{{ imei }}</option>
                    </select>
                </div>

                <div class="dropdown-container">
                    <label for="deviceType-select">Device Type</label>
                    <select id="deviceType-select" v-model="selectedDeviceType" @change="fetchTableData"
                        class="custom-select">
                        <option value="All">All</option>
                        <option v-for="device in uniqueDeviceTypes" :key="device" :value="device">{{ device }}</option>
                    </select>
                </div>

                <!-- Sort by Device Type -->
                <div class="dropdown-container">
                    <label for="deviceType-select">Select Device Type</label>
                    <select id="deviceType-select" v-model="selectedDeviceType" @change="sortByDeviceType"
                        class="custom-select">
                        <option value="">All</option>
                        <option value="Digital Input">Digital Input</option>
                        <option value="Ac Voltage">Ac Voltage</option>
                        <option value="Ac Current">Ac Current</option>
                        <option value="Dc Voltage">Dc Voltage</option>
                        <option value="Dc Current">Dc Current</option>
                    </select>
                </div>


            </div>
            <div>
                <!-- Download Button -->
                <button @click="downloadData" class="download-btn">Download</button>
            </div>
        </div>
        <!-- Table Data -->
        <div class="table-responsive">
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th @click="sortTable('SNo')">Sno</th>
                        <th @click="sortTable('deviceType')">Device Type</th>
                        <th @click="sortTable('hutId')">Hut ID</th>
                        <th @click="sortTable('deviceId')">Device ID</th>
                        <th @click="sortTable('channelId')">Channel ID</th>
                        <th @click="sortTable('gearType')">Gear Type</th>
                        <th @click="sortTable('timeStamp')">Date</th>
                        <th @click="sortTable('timeStamp')">Time</th>
                        <th @click="sortTable('value')">Value</th>
                        <th style="text-align: center;">Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in paginatedData" :key="item.imeiMac">
                        <td>{{ (currentPage - 1) * itemsPerPage + index + 1 }}</td>
                        <td>{{ item.deviceType }}</td>
                        <td>{{ item.hutId }}</td>
                        <td>{{ item.deviceId }}</td>
                        <td>{{ item.channelId }}</td>
                        <td style="width: 195px;">{{ item.tableData.gearType || 'N/A' }}</td>
                        <td>{{ formatDate(item.timeStamp) || 'N/A' }}</td>
                        <td>{{ formatTimestamp(item.timeStamp) || 'N/A' }}</td>
                        <td>{{ item.value || 'N/A' }}</td>
                        <td style="text-align: center;">
                            <button :class="['status-btn', getStatus(item).statusClass]">
                                {{ getStatus(item).status }}
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="pagination">
            <button @click="prevPage" :disabled="currentPage === 1" class="pagination-btn">Previous</button>
            <span>Page {{ currentPage }} of {{ totalPages }}</span>
            <button @click="nextPage" :disabled="currentPage === totalPages" class="pagination-btn">Next</button>
        </div>
    </main>

</template>

<script>
import ApiGatewayServies from '../../Services/ApiGatewayServies';
import { jsPDF } from 'jspdf'; // For PDF export
import * as XLSX from 'xlsx'; // For Excel export

export default {
    data() {
        return {
            imeiList: [], // Holds the fetched IMEI list
            selectedImei: '', // Stores the selected IMEI
            selectedDeviceType: 'All', // Stores the selected Device Type
            tableData: [], // Data to populate the table
            paginatedData: [], // Data for current page
            currentPage: 1, // Current page for pagination
            itemsPerPage: 10, // Number of items per page
            totalPages: 0, // Total number of pages
            loading: false, // Controls the loading state
            sortBy: '', // Column to sort by
            sortDirection: 'asc', // Sorting direction (asc or desc)
            dataRefreshInterval: null, // Interval to refresh data
            uniqueDeviceTypes: [], // List of unique device types
            selectedSortDeviceType: "", // Selected device type for sorting
            deviceTypeOrder: ["Digital Input", "Ac Voltage", "Ac Current", "Dc Voltage", "Dc Current"], // Predefined order

        };
    },
    created() {
        this.fetchImeiList();
        this.filteredData = [...this.paginatedData];
    },
    watch: {
        selectedImei(newImei) {
            if (newImei) {
                this.fetchTableData(); // Fetch table data when IMEI changes
                this.startRefreshInterval(); // Start the interval
            } else {
                this.stopRefreshInterval(); // Stop the interval if no IMEI is selected
            }
        },
        selectedDeviceType() {
            this.sortByDeviceType();  // Apply sorting/filtering when selectedDeviceType changes
        }
    },
    computed: {
        uniqueDeviceTypes() {
            // Get unique device types from table data
            const deviceTypes = this.tableData.map(item => item.deviceType);
            return [...new Set(deviceTypes)];
        },
        totalPages() {
            return Math.ceil(this.tableData.length / this.itemsPerPage);
        },
    },
    beforeDestroy() {
        // Clear the interval to avoid unnecessary API calls when the component is destroyed
        clearInterval(this.dataRefreshInterval);
    },
    methods: {
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
            } catch (error) {
                console.error('Error fetching IMEI list:', error);
            } finally {
                this.loading = false; // Reset loading state
            }
        },

        async fetchTableData() {
            if (!this.selectedImei) return; // Exit if IMEI is not selected

            try {
                const token = localStorage.getItem('authToken');
                if (!token) throw new Error('Authentication token is missing.');

                let url = `IotDeviceData/GetLiveDatasByImeiMac?imeiMac=${this.selectedImei}`;

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
                this.filterAndSortTable(); // Optionally apply any filters or sorting
            } catch (error) {
                console.error('Error fetching table data:', error);
            }
        },

        // Update the data for the current page
        updatePaginatedData() {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            const end = start + this.itemsPerPage;
            this.paginatedData = this.tableData.slice(start, end);
        },

        // Change to the previous page
        prevPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
                this.updatePaginatedData();
            }
        },

        // Change to the next page
        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
                this.updatePaginatedData();
            }
        },

        // Sorting function
        sortByDeviceType() {
            if (this.selectedDeviceType) {
                // Filter data based on the selected device type
                this.filteredData = this.paginatedData.filter(item => item.deviceType === this.selectedDeviceType);
            } else {
                // If no device type is selected, show all
                this.filteredData = [...this.paginatedData];
            }

            // After filtering, you can also sort based on a predefined order if necessary
            this.filteredData.sort((a, b) => {
                const indexA = this.deviceTypeOrder.indexOf(a.deviceType);
                const indexB = this.deviceTypeOrder.indexOf(b.deviceType);
                return indexA - indexB; // Adjust sorting logic as necessary
            });
        },

        // Method to sort other columns (optional)
        sortTable(column) {
            this.filteredData.sort((a, b) => {
                if (a[column] < b[column]) return -1;
                if (a[column] > b[column]) return 1;
                return 0;
            });
        },

        formatTimestamp(timestamp) {
            if (!timestamp) {
                return null; // Return null if the timestamp is null or undefined
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
                date.setUTCDate(date.getUTCDate() + 1); // Increment the day
            }

            const day = date.getUTCDate();
            const month = date.getUTCMonth() + 1;
            const year = date.getUTCFullYear();

            const formattedDay = day < 10 ? `0${day}` : day;
            const formattedMonth = month < 10 ? `0${month}` : month;

            return `${formattedDay}/${formattedMonth}/${year}`;
        },
        sortTable(column) {
            if (column !== "deviceType") {
                // Standard sorting for other columns
                this.paginatedData.sort((a, b) => {
                    if (a[column] < b[column]) return -1;
                    if (a[column] > b[column]) return 1;
                    return 0;
                });
            } else {
                // Sort based on the predefined deviceTypeOrder
                this.paginatedData.sort((a, b) => {
                    const indexA = this.deviceTypeOrder.indexOf(a.deviceType);
                    const indexB = this.deviceTypeOrder.indexOf(b.deviceType);
                    const adjustedIndexA = indexA === -1 ? this.deviceTypeOrder.length : indexA;
                    const adjustedIndexB = indexB === -1 ? this.deviceTypeOrder.length : indexB;

                    return adjustedIndexA - adjustedIndexB;
                });
            }
            this.filterAndSortTable();  // Apply filtering after sorting
        },

        // New method for filtering the table data based on selected device type
        filterAndSortTable() {
            if (this.selectedDeviceType) {
                // Filter based on selected deviceType
                this.filteredData = this.paginatedData.filter(item => item.deviceType === this.selectedDeviceType);
            } else {
                // If no device type is selected, show all
                this.filteredData = [...this.paginatedData];
            }
        },

        getStatus(item) {
            // Check for Digital Input
            if (item.deviceType === 'Digital Input') {
                const status = item.value === "1" ? 'Active' : 'Inactive';
                const statusClass = item.value === "1" ? 'btn-green' : 'btn-red'; // Button styles for Active/Inactive
                return { status, statusClass };
            }

            // Check for AC Current or DC Current
            if (item.deviceType === "Ac Current" || item.deviceType === "Dc Current") {
                const value = item.value;
                const range1 = item.tableData.channelValueRange1;
                const range2 = item.tableData.channelValueRange2;

                if (value < range1) {
                    return { status: 'Low Current', statusClass: 'btn-gray' };
                } else if (value >= range1 && value <= range2) {
                    return { status: 'Normal Current', statusClass: 'btn-green' };
                } else if (value > range2) {
                    return { status: 'High Current', statusClass: 'btn-red' };
                }
            }

            // Check for AC Voltage or DC Voltage
            if (item.deviceType === "Ac Voltage" || item.deviceType === "Dc Voltage") {
                const value = item.value;
                const range1 = item.tableData.channelValueRange1;
                const range2 = item.tableData.channelValueRange2;

                if (value < range1) {
                    return { status: 'Low Voltage', statusClass: 'btn-gray' };
                } else if (value >= range1 && value <= range2) {
                    return { status: 'Normal Voltage', statusClass: 'btn-green' };
                } else if (value > range2) {
                    return { status: 'High Voltage', statusClass: 'btn-red' };
                }
            }

            // Default return if no conditions match
            return { status: 'N/A', statusClass: 'btn-gray' }; // default gray button for unknown statuses
        }

        ,


        downloadData() {
            // Export as PDF
            const doc = new jsPDF();
            let yOffset = 20;
            doc.text("Device Data", 10, yOffset);

            // Export table data
            this.paginatedData.forEach((item, index) => {
                yOffset += 10;
                doc.text(`Device Name: ${item.deviceName}, Device Type: ${item.deviceType}, Timestamp: ${this.formatDate(item.timestamp)} - ${this.formatTimestamp(item.timestamp)}`, 10, yOffset);
            });

            doc.save("DeviceData.pdf");

            // Export as Excel
            const ws = XLSX.utils.json_to_sheet(this.paginatedData);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, "Device Data");
            XLSX.writeFile(wb, "DeviceData.xlsx");
        },
        startRefreshInterval() {
            this.stopRefreshInterval(); // Ensure only one interval is running
            this.dataRefreshInterval = setInterval(() => {
                this.fetchTableData();
            }, 1000); // Refresh data every 10 seconds
        },

        // Stop the interval
        stopRefreshInterval() {
            if (this.dataRefreshInterval) {
                clearInterval(this.dataRefreshInterval);
                this.dataRefreshInterval = null;
            }
        },

        // Export data to Excel
        downloadExcel() {
            const worksheet = XLSX.utils.json_to_sheet(this.tableData);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');
            XLSX.writeFile(workbook, 'data.xlsx');
        },

        // Export data to PDF
        downloadPDF() {
            const doc = new jsPDF();

            doc.text('Table Data', 10, 10);
            this.tableData.forEach((item, index) => {
                doc.text(`IMEI/MAC: ${item.imeiMac}, Device Type: ${item.deviceType}`, 10, 20 + index * 10);
            });

            doc.save('data.pdf');
        },

        // Trigger file download
        downloadData() {
            this.downloadExcel(); // Export to Excel by default
        },
    },
};

</script>

<style scoped>
/* Custom styling for the dropdowns */
.dropdown-container {
    margin-bottom: 15px;
}

.custom-select {
    padding: 8px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 200px;
}

/* Improve button styles */
.download-btn {
    padding: 9px 14px;
    background-color: #308e87;
    color: white;
    border: none;
    cursor: pointer;
    border-radius: 5px;
    margin-bottom: 20px;
    font-size: 15px;
}

.download-btn:hover {
    background-color: #65a09c;
}

.pagination {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
}

.pagination-btn {
    padding: 8px 12px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.pagination-btn:disabled {
    background-color: #ccc;
    cursor: not-allowed;
}

.table-responsive {
    margin-top: 20px;
    overflow-x: auto;
}

.table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
}

.table th,
.table td {
    padding: 10px;
    text-align: left;
    border-bottom: 1px solid #ddd;
}

.table th {
    background-color: #f8f9fa;
    cursor: pointer;
}

.loading {
    font-size: 18px;
    color: #aaa;
    text-align: center;
}

.main-container {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
}

.div-ddl {
    display: flex;
    gap: 20px;
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
    /* Soft light green */
    color: #3eb95f;
    /* Subtle border for contrast */
}

.btn-red {
    background-color: rgba(231, 75, 43, 0.1) !important;
    /* Soft light red */
    color: #e74b2b;
    /* Subtle border for contrast */
}

.btn-gray {
    background-color: rgba(234, 146, 0, 0.1) !important;
    /* Soft gray */
    color: #ea9200;
    /* Subtle border for contrast */
}

/* Optional: Add hover effect for better user experience */
.status-btn:hover {
    opacity: 0.9;
}
</style>