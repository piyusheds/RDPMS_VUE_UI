<template>
    <main>
        <div class="main-container">
            <div class="div-ddl">
                <!-- IMEI Dropdown -->
                <div class="dropdown-container">
                    <label for="imei-select">IMEI</label>
                    <select id="imei-select" v-model="selectedImei" @change="fetchTableData" class="custom-select">
                        <option value="" disabled>Select IMEI</option>
                        <option v-for="imei in imeiList" :key="imei" :value="imei">{{ imei }}</option>
                    </select>
                </div>

                <!-- Device Type Dropdown -->
                <div class="dropdown-container">
                    <label for="deviceType-select">Device Type</label>
                    <select id="deviceType-select" v-model="selectedDeviceType" @change="fetchTableData"
                        class="custom-select">
                        <option value="All">All</option>
                        <option v-for="device in uniqueDeviceTypes" :key="device" :value="device">{{ device }}</option>
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
                        <th @click="sortTable('imeiMac')">IMEI/MAC</th>
                        <th @click="sortTable('deviceType')">Device Type</th>
                        <th @click="sortTable('hutId')">Hut ID</th>
                        <th @click="sortTable('deviceId')">Device ID</th>
                        <th @click="sortTable('channelId')">Channel ID</th>
                        <th @click="sortTable('gearType')">Gear Type</th>
                        <th @click="sortTable('timeStamp')">Date/Time</th>
                        <th @click="sortTable('value')">Range/Value</th>
                        <th @click="sortTable('value')">Value</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    <!-- <div v-if="loading" class="loading">Loading data, please wait...</div> -->
                    <tr v-for="(item, index) in paginatedData" :key="item.imeiMac">
                        <td>{{ (currentPage - 1) * itemsPerPage + index + 1 }}</td>
                        <td>{{ item.imeiMac }}</td>
                        <td>{{ item.deviceType }}</td>
                        <td>{{ item.hutId }}</td>
                        <td>{{ item.deviceId }}</td>
                        <td>{{ item.channelId }}</td>
                        <td style="width: 195px;">{{ item.tableData.gearType || 'N/A' }}</td>
                        <td>
                            {{ formatDate(item.timeStamp) || 'N/A' }}
                            <br>
                            {{ formatTimestamp(item.timeStamp) || 'N/A' }}
                        </td>
                        <td class="center">{{ getChannelValueRange(item) }}</td>
                        <td>{{ item.value || 'N/A' }}</td>
                        <td>{{ getStatus(item) }}</td>
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

// export default {
//     data() {
//         return {
//             imeiList: [], // Holds the fetched IMEI list
//             selectedImei: '', // Stores the selected IMEI
//             selectedDeviceType: 'All', // Stores the selected Device Type
//             tableData: [], // Data to populate the table
//             paginatedData: [], // Data for current page
//             currentPage: 1, // Current page for pagination
//             itemsPerPage: 10, // Number of items per page
//             totalPages: 0, // Total number of pages
//             loading: false, // Controls the loading state
//             sortBy: '', // Column to sort by
//             sortDirection: 'asc', // Sorting direction (asc or desc)

//         };
//     },
//     created() {
//         // Fetch IMEI list when the component is created
//         this.fetchImeiList();
//     },
//     watch: {
//         // Watch for changes in the selected IMEI and fetch table data
//         selectedImei() {
//             this.fetchTableData(); // Fetch table data based on the selected IMEI
//         },
//         selectedDeviceType() {
//             this.fetchTableData(); // Fetch table data based on the selected device type
//         },
//     },
//     computed: {
//         uniqueDeviceTypes() {
//             // Get unique device types from table data
//             const deviceTypes = this.tableData.map(item => item.deviceType);
//             return [...new Set(deviceTypes)];
//         },
//     },

//     mounted() {
//     // Perform the initial data fetch when the component is opened
//     this.fetchTableData();

//     // Start a background refresh to update data without full page refresh
//     this.dataRefreshInterval = setInterval(() => {
//       this.fetchTableData();
//     }, 10);  // Refresh data every 10 milliseconds
//   },
//   beforeDestroy() {
//     // Clear the interval to avoid unnecessary API calls when the component is destroyed
//     clearInterval(this.dataRefreshInterval);
//   },
//     methods: {
//         // Fetch IMEI list from the API
//         async fetchImeiList() {
//             try {
//                 this.loading = true; // Set loading state to true

//                 const token = localStorage.getItem('authToken'); // Retrieve token from localStorage
//                 if (!token) {
//                     throw new Error('Authentication token is missing.');
//                 }

//                 const response = await ApiGatewayServies.get('Master/Imeis', {
//                     headers: {
//                         'Content-Type': 'application/json',
//                         'Authorization': `Bearer ${token}`,
//                     },
//                 });

//                 this.imeiList = response.data; // Store the fetched IMEI list
//             } catch (error) {
//                 console.error('Error fetching IMEI list:', error);
//             } finally {
//                 this.loading = false; // Reset loading state
//             }
//         },

//         // Fetch table data based on the selected IMEI and device type
//         async fetchTableData() {
//       try {
//         this.loading = true; // Set loading state to true

//         const token = localStorage.getItem('authToken'); // Retrieve token from localStorage
//         if (!token) {
//           throw new Error('Authentication token is missing.');
//         }

//         let url = `DeviceData/GetLiveDatasByImeiMac?imeiMac=${this.selectedImei}`;
//         if (this.selectedDeviceType !== 'All') {
//           url += `&deviceType=${this.selectedDeviceType}`;
//         }

//         // Fetch data from the server
//         const response = await ApiGatewayServies.get(url, {
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${token}`,
//           },
//         });

//         // Update table data with the response from the backend
//         this.tableData = response.data;
//         this.totalPages = Math.ceil(this.tableData.length / this.itemsPerPage);

//         // Update paginated data without blocking the UI
//         this.updatePaginatedData();
//       } catch (error) {
//         console.error('Error fetching table data:', error);
//       } finally {
//         this.loading = false; // Reset loading state
//       }
//     },

//         // Update the data for the current page
//         updatePaginatedData() {
//             const start = (this.currentPage - 1) * this.itemsPerPage;
//             const end = start + this.itemsPerPage;
//             this.paginatedData = this.tableData.slice(start, end);
//         },

//         // Change to the previous page
//         prevPage() {
//             if (this.currentPage > 1) {
//                 this.currentPage--;
//                 this.updatePaginatedData();
//             }
//         },

//         // Change to the next page
//         nextPage() {
//             if (this.currentPage < this.totalPages) {
//                 this.currentPage++;
//                 this.updatePaginatedData();
//             }
//         },

//         // Sorting function
//         sortTable(column) {
//             this.sortDirection = this.sortBy === column && this.sortDirection === 'asc' ? 'desc' : 'asc';
//             this.sortBy = column;

//             this.tableData.sort((a, b) => {
//                 let valA = a[column];
//                 let valB = b[column];

//                 // Handle nested properties like tableData.gearType
//                 if (column === 'gearType') {
//                     valA = a.tableData.gearType;
//                     valB = b.tableData.gearType;
//                 }

//                 if (valA < valB) {
//                     return this.sortDirection === 'asc' ? -1 : 1;
//                 }
//                 if (valA > valB) {
//                     return this.sortDirection === 'asc' ? 1 : -1;
//                 }
//                 return 0;
//             });

//             this.updatePaginatedData();
//         },

//         getChannelValueRange(item) {
//             const range1 = item.tableData.channelValueRange1 ?? 'N/A';
//             const range2 = item.tableData.channelValueRange2 ?? 'N/A';
//             return item.deviceType === 'Digital Input' ? range1 : `${range1} - ${range2}`;
//         }

//         ,

//         formatTimestamp(timestamp) {
//             if (!timestamp) {
//                 return null; // Return null if the timestamp is null or undefined
//             }

//             const date = new Date(timestamp * 1000);

//             let hours = date.getUTCHours();
//             let minutes = date.getUTCMinutes();
//             let seconds = date.getUTCSeconds();

//             hours += 5;
//             minutes += 30;

//             if (minutes >= 60) {
//                 minutes -= 60;
//                 hours += 1;
//             }

//             if (hours >= 24) {
//                 hours -= 24;
//             }

//             const formattedHours = hours < 10 ? `0${hours}` : hours;
//             const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
//             const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

//             return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
//         },

//         formatDate(timestamp) {
//             if (!timestamp) {
//                 return null;
//             }

//             const date = new Date(timestamp * 1000);

//             let hours = date.getUTCHours();
//             let minutes = date.getUTCMinutes();

//             hours += 5;
//             minutes += 30;

//             if (minutes >= 60) {
//                 minutes -= 60;
//                 hours += 1;
//             }

//             if (hours >= 24) {
//                 hours -= 24;
//                 date.setUTCDate(date.getUTCDate() + 1); // Increment the day
//             }

//             const day = date.getUTCDate();
//             const month = date.getUTCMonth() + 1;
//             const year = date.getUTCFullYear();

//             const formattedDay = day < 10 ? `0${day}` : day;
//             const formattedMonth = month < 10 ? `0${month}` : month;

//             return `${formattedDay}/${formattedMonth}/${year}`;
//         },

//         getStatus(item) {
//             // Check for Digital Input
//             if (item.deviceType === 'Digital Input') {
//                 return item.value === true ? 'Active' : 'Inactive';
//             }

//             // Check for AC Current or DC Current
//             if (item.deviceType === 'AC Current' || item.deviceType === 'DC Current') {
//                 const value = item.value;
//                 const range1 = item.channelValueRange1;
//                 const range2 = item.channelValueRange2;

//                 if (value < range1) {
//                     return 'Low Current';
//                 } else if (value >= range1 && value <= range2) {
//                     return 'Green';
//                 } else if (value > range2) {
//                     return item.deviceType === 'AC Current' ? 'Low AC Current' : 'Low DC Current';
//                 }
//             }

//             // Check for AC Voltage or DC Voltage
//             if (item.deviceType === 'AC Voltage' || item.deviceType === 'DC Voltage') {
//                 const value = item.value;
//                 const range1 = item.channelValueRange1;
//                 const range2 = item.channelValueRange2;

//                 if (value < range1) {
//                     return item.deviceType === 'AC Voltage' ? 'Low AC Voltage' : 'Low DC Voltage';
//                 } else if (value >= range1 && value <= range2) {
//                     return 'Green';
//                 } else if (value > range2) {
//                     return item.deviceType === 'AC Voltage' ? 'Low AC Voltage' : 'Low DC Voltage';
//                 }
//             }

//             // Default return if no conditions match
//             return 'N/A';
//         },

//         downloadData() {
//             // Export as PDF
//             const doc = new jsPDF();
//             let yOffset = 20;
//             doc.text("Device Data", 10, yOffset);

//             // Export table data
//             this.paginatedData.forEach((item, index) => {
//                 yOffset += 10;
//                 doc.text(`Device Name: ${item.deviceName}, Device Type: ${item.deviceType}, Timestamp: ${this.formatDate(item.timestamp)} - ${this.formatTimestamp(item.timestamp)}`, 10, yOffset);
//             });

//             doc.save("DeviceData.pdf");

//             // Export as Excel
//             const ws = XLSX.utils.json_to_sheet(this.paginatedData);
//             const wb = XLSX.utils.book_new();
//             XLSX.utils.book_append_sheet(wb, ws, "Device Data");
//             XLSX.writeFile(wb, "DeviceData.xlsx");
//         },

//         // Export data to Excel
//         downloadExcel() {
//             const worksheet = XLSX.utils.json_to_sheet(this.tableData);
//             const workbook = XLSX.utils.book_new();
//             XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');
//             XLSX.writeFile(workbook, 'data.xlsx');
//         },

//         // Export data to PDF
//         downloadPDF() {
//             const doc = new jsPDF();

//             doc.text('Table Data', 10, 10);
//             this.tableData.forEach((item, index) => {
//                 doc.text(`IMEI/MAC: ${item.imeiMac}, Device Type: ${item.deviceType}`, 10, 20 + index * 10);
//             });

//             doc.save('data.pdf');
//         },

//         // Trigger file download
//         downloadData() {
//             this.downloadExcel(); // Export to Excel by default
//         },
//     },
// };
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
        };
    },
    created() {
        // Fetch IMEI list when the component is created
        this.fetchImeiList();
    },
    watch: {
        // Watch for changes in the selected IMEI and fetch table data
        selectedImei() {
            this.fetchTableData(); // Fetch table data based on the selected IMEI
        },
        selectedDeviceType() {
            this.fetchTableData(); // Fetch table data based on the selected device type
        },
    },
    computed: {
        uniqueDeviceTypes() {
            // Get unique device types from table data
            const deviceTypes = this.tableData.map(item => item.deviceType);
            return [...new Set(deviceTypes)];
        },
    },
    mounted() {
        this.fetchTableData();

        // Start a background refresh to update data without full page refresh
        this.dataRefreshInterval = setInterval(() => {
            this.fetchTableData();
        }, 1000);  // Refresh data every 10 seconds
    },
    beforeDestroy() {
        // Clear the interval to avoid unnecessary API calls when the component is destroyed
        clearInterval(this.dataRefreshInterval);
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
            } catch (error) {
                console.error('Error fetching IMEI list:', error);
            } finally {
                this.loading = false; // Reset loading state
            }
        },

        // Fetch table data based on the selected IMEI and device type
        async fetchTableData() {
            try {
                this.loading = true; // Set loading state to true

                const token = localStorage.getItem('authToken'); // Retrieve token from localStorage
                if (!token) {
                    throw new Error('Authentication token is missing.');
                }

                let url = `DeviceData/GetLiveDatasByImeiMac?imeiMac=${this.selectedImei}`;
                if (this.selectedDeviceType !== 'All') {
                    url += `&deviceType=${this.selectedDeviceType}`;
                }

                // Fetch data from the server
                const response = await ApiGatewayServies.get(url, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });

                // Update table data with the response from the backend
                this.tableData = response.data;
                this.totalPages = Math.ceil(this.tableData.length / this.itemsPerPage);

                // Update paginated data without blocking the UI
                this.updatePaginatedData();
            } catch (error) {
                console.error('Error fetching table data:', error);
            } finally {
                this.loading = false; // Reset loading state
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
        sortTable(column) {
            this.sortDirection = this.sortBy === column && this.sortDirection === 'asc' ? 'desc' : 'asc';
            this.sortBy = column;

            this.tableData.sort((a, b) => {
                let valA = a[column];
                let valB = b[column];

                // Handle nested properties like tableData.gearType
                if (column === 'gearType') {
                    valA = a.tableData.gearType;
                    valB = b.tableData.gearType;
                }

                if (valA < valB) {
                    return this.sortDirection === 'asc' ? -1 : 1;
                }
                if (valA > valB) {
                    return this.sortDirection === 'asc' ? 1 : -1;
                }
                return 0;
            });

            this.updatePaginatedData();
        },

        getChannelValueRange(item) {
            const range1 = item.tableData.channelValueRange1 ?? 'N/A';
            const range2 = item.tableData.channelValueRange2 ?? 'N/A';
            return item.deviceType === 'Digital Input' ? range1 : `${range1} - ${range2}`;
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

        getStatus(item) {
            // Check for Digital Input
            if (item.deviceType === 'Digital Input') {
                return item.value === true ? 'Active' : 'Inactive';
            }

            // Check for AC Current or DC Current
            if (item.deviceType === 'AC Current' || item.deviceType === 'DC Current') {
                const value = item.value;
                const range1 = item.channelValueRange1;
                const range2 = item.channelValueRange2;

                if (value < range1) {
                    return 'Low Current';
                } else if (value >= range1 && value <= range2) {
                    return 'Green';
                } else if (value > range2) {
                    return item.deviceType === 'AC Current' ? 'Low AC Current' : 'Low DC Current';
                }
            }

            // Check for AC Voltage or DC Voltage
            if (item.deviceType === 'AC Voltage' || item.deviceType === 'DC Voltage') {
                const value = item.value;
                const range1 = item.channelValueRange1;
                const range2 = item.channelValueRange2;

                if (value < range1) {
                    return item.deviceType === 'AC Voltage' ? 'Low AC Voltage' : 'Low DC Voltage';
                } else if (value >= range1 && value <= range2) {
                    return 'Green';
                } else if (value > range2) {
                    return item.deviceType === 'AC Voltage' ? 'Low AC Voltage' : 'Low DC Voltage';
                }
            }

            // Default return if no conditions match
            return 'N/A';
        },

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
    padding: 10px 15px;
    background-color: #007bff;
    color: white;
    border: none;
    cursor: pointer;
    border-radius: 5px;
    margin-bottom: 20px;
}

.download-btn:hover {
    background-color: #0056b3;
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
</style>