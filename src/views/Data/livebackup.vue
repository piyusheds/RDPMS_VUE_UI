<template>
<<<<<<< HEAD
    <main style="padding-top:10px;">
        <div class="row">
            <div class="col-12 d-flex justify-content-between">
                <h2 class="text-center text-primary">Live Data Overview</h2>
                <div class="d-flex">
                    <div class="dropdown-container">
                        <label for="search-bar" style="margin-right: 10px;">Search</label>
                        <input type="text" id="search-bar" v-model="searchQuery" @input="filterTableData"
                            placeholder="Search by Device ID, Hut ID, or any other field" class="custom-input"
                            :disabled="!selectedImei" style="margin-right: 20px;" />
                    </div>
                    <button @click="downloadData" class="download-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                            stroke="currentColor" class="download-icon">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
        <div class="main-container">
            <div class="div-ddl">
                <!-- IMEI Dropdown -->
                <div class="dropdown-container">
                    <label for="imei-select" style="margin-right: 10px;">IMEI</label>
                    <select id="imei-select" v-model="selectedImei" @change="onImeiChange" class="custom-select">
=======
    <main>
        <div class="main-container">
            <div class="div-ddl">
                <div class="dropdown-container">
                    <label for="imei-select">IMEI</label>
                    <select id="imei-select" v-model="selectedImei" @change="fetchTableData" class="custom-select">
>>>>>>> e0ad36401195423255db1e02af8817fe8efaedae
                        <option value="" disabled>Select IMEI</option>
                        <option v-for="imei in imeiList" :key="imei" :value="imei">{{ imei }}</option>
                    </select>
                </div>

<<<<<<< HEAD

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

                <!-- New Dropdown for Status Filter -->
                <div class="dropdown-container">
                    <label for="status-select" style="margin-right: 10px;">Status</label>
                    <select id="status-select" v-model="selectedStatus" @change="filterAndSortByStatus"
                        class="custom-select" style="width:118px" :disabled="!selectedImei">
                        <option value="">All</option>
                        <option v-for="status in statusOptions" :key="status" :value="status">{{ status }}</option>
                    </select>
                </div>
            </div>

            <div>
                <!-- Download Button -->
            </div>
        </div>

        <!-- Table Data -->
        <div class="table-responsive" style="margin-top: 0px!important">
            <table id="dataTable" class="table table-striped table-bordered">
=======
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
>>>>>>> e0ad36401195423255db1e02af8817fe8efaedae
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
<<<<<<< HEAD
                        <th style="text-align: center;" @click="sortTable('value')">Value</th>
=======
                        <th @click="sortTable('value')">Value</th>
>>>>>>> e0ad36401195423255db1e02af8817fe8efaedae
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
<<<<<<< HEAD
                        <td style="text-align: center;">{{ item.value || 'N/A' }}</td>
=======
                        <td>{{ item.value || 'N/A' }}</td>
>>>>>>> e0ad36401195423255db1e02af8817fe8efaedae
                        <td style="text-align: center;">
                            <button :class="['status-btn', getStatus(item).statusClass]">
                                {{ getStatus(item).status }}
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
<<<<<<< HEAD
        <!-- 
=======
>>>>>>> e0ad36401195423255db1e02af8817fe8efaedae
        <div class="pagination">
            <button @click="prevPage" :disabled="currentPage === 1" class="pagination-btn">Previous</button>
            <span>Page {{ currentPage }} of {{ totalPages }}</span>
            <button @click="nextPage" :disabled="currentPage === totalPages" class="pagination-btn">Next</button>
<<<<<<< HEAD
        </div> -->
    </main>
=======
        </div>
    </main>

>>>>>>> e0ad36401195423255db1e02af8817fe8efaedae
</template>

<script>
import ApiGatewayServies from '../../Services/ApiGatewayServies';
import { jsPDF } from 'jspdf'; // For PDF export
import * as XLSX from 'xlsx'; // For Excel export
<<<<<<< HEAD
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import 'datatables.net-bs4/css/dataTables.bootstrap4.min.css';
=======
>>>>>>> e0ad36401195423255db1e02af8817fe8efaedae

export default {
    data() {
        return {
            imeiList: [], // Holds the fetched IMEI list
            selectedImei: '', // Stores the selected IMEI
<<<<<<< HEAD
            selectedDeviceType: "", // Stores the selected Device Type
=======
            selectedDeviceType: 'All', // Stores the selected Device Type
>>>>>>> e0ad36401195423255db1e02af8817fe8efaedae
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

<<<<<<< HEAD
            statusOptions: ["Active", "Inactive", "Low Voltage", "Normal Voltage", "High Voltage", "Low Current", "Normal Current", "High Current"], // Status options for filtering
            selectedStatus: '',
            searchQuery: '',
            hutIdList: [], // List of Hut IDs fetched based on the selected IMEI
            selectedHutId: "",

=======
>>>>>>> e0ad36401195423255db1e02af8817fe8efaedae
        };
    },
    created() {
        this.fetchImeiList();
<<<<<<< HEAD
    },
    beforeDestroy() {
        // Clear the interval to avoid unnecessary API calls when the component is destroyed
        clearInterval(this.dataRefreshInterval);
    },
    watch: {
        selectedImei(newImei) {
            console.log('selectedImei changed:', newImei);
=======
        this.filteredData = [...this.paginatedData];
    },
    watch: {
        selectedImei(newImei) {
>>>>>>> e0ad36401195423255db1e02af8817fe8efaedae
            if (newImei) {
                this.fetchTableData(); // Fetch table data when IMEI changes
                this.startRefreshInterval(); // Start the interval
            } else {
                this.stopRefreshInterval(); // Stop the interval if no IMEI is selected
            }
        },
        selectedDeviceType() {
<<<<<<< HEAD
            this.applyFiltersAndSorting(); // Apply sorting/filtering when selectedDeviceType changes
        },
        selectedStatus() {
            this.applyFiltersAndSorting(); // Apply sorting/filtering when selectedStatus changes
        }
    },

    computed: {
=======
            this.sortByDeviceType();  // Apply sorting/filtering when selectedDeviceType changes
        }
    },
    computed: {
        uniqueDeviceTypes() {
            // Get unique device types from table data
            const deviceTypes = this.tableData.map(item => item.deviceType);
            return [...new Set(deviceTypes)];
        },
>>>>>>> e0ad36401195423255db1e02af8817fe8efaedae
        totalPages() {
            return Math.ceil(this.tableData.length / this.itemsPerPage);
        },
    },
<<<<<<< HEAD
    // beforeDestroy() {
    //     // Clear the interval to avoid unnecessary API calls when the component is destroyed
    //     clearInterval(this.dataRefreshInterval);
    // },
    mounted() {
        this.$nextTick(() => {
            if (this.tableData.length > 0) {
                this.initializeDataTable();
            }
        });
    },
    unmounted() {
        this.stopRefreshInterval(); // Stop the interval when the component is destroyed
    },
    methods: {
        initializeDataTable() {
            if ($.fn.DataTable.isDataTable('#dataTable')) {
                $('#dataTable').DataTable().clear().destroy(); // Destroy existing instance
            }
            $('#dataTable').DataTable({
                paging: true,
                searching: true, // You can enable this if you need search functionality
                ordering: true,
                info: true,
                autoWidth: false
            });
        },
        async fetchImeiList() {
            try {
                this.loading = true;
                const token = localStorage.getItem('authToken');
                if (!token) {
                    throw new Error('Authentication token is missing.');
                }
=======
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

>>>>>>> e0ad36401195423255db1e02af8817fe8efaedae
                const response = await ApiGatewayServies.get('Master/Imeis', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });
<<<<<<< HEAD
                this.imeiList = response.data;
            } catch (error) {
                console.error('Error fetching IMEI list:', error);
            } finally {
                this.loading = false;
            }
        },

        async fetchHutIds() {
            // Check if IMEI is selected before making the request
            if (!this.selectedImei) {
                return; // Do nothing if no IMEI is selected
            }

            try {
                this.loading = true;
                const token = localStorage.getItem('authToken');
                if (!token) {
                    throw new Error('Authentication token is missing.');
                }

                // Make the GET request to fetch Hut IDs based on the selected IMEI
                const response = await ApiGatewayServies.get(`DeviceData/HutIds?imei=${this.selectedImei}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });

                // Assuming the response contains an array of Hut IDs
                this.hutIdList = response.data;

                // Clear the selected Hut ID if no valid Hut IDs are returned
                if (this.hutIdList.length === 0) {
                    this.selectedHutId = '';
                }
            } catch (error) {
                console.error('Error fetching Hut IDs:', error);
            } finally {
                this.loading = false;
            }
        }
        ,


        async onImeiChange() {
            try {
                if (!this.selectedImei) return;

                // Fetch Hut IDs based on the selected IMEI
                await this.fetchHutIds();

                // Fetch table data directly based on selected IMEI
                await this.fetchTableData();
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

        async fetchTableData() {
            console.log('fetchTableData triggered');
            if (!this.selectedImei) return;
=======

                this.imeiList = response.data; // Store the fetched IMEI list
            } catch (error) {
                console.error('Error fetching IMEI list:', error);
            } finally {
                this.loading = false; // Reset loading state
            }
        },

        async fetchTableData() {
            if (!this.selectedImei) return; // Exit if IMEI is not selected
>>>>>>> e0ad36401195423255db1e02af8817fe8efaedae

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
<<<<<<< HEAD
                this.applyFiltersAndSorting();

            } catch (error) {
                console.error('Error fetching table data:', error);
            }
        }
        ,

        applyFiltersAndSorting() {
            this.filterAndSortByStatus();  // Apply sorting/filtering by status
            this.filterAndSortTable();   // Apply sorting/filtering by device type
        },

        filterDataByHutId() {
            if (!this.selectedHutId || this.selectedHutId === 'All') {
                // If no Hut ID or "All" is selected, show all data
                this.paginatedData = [...this.tableData];
            } else {
                // Filter data based on selected Hut ID
                this.paginatedData = this.tableData.filter(item => item.hutId === this.selectedHutId);
            }

            // After filtering, update pagination
            this.totalPages = Math.ceil(this.paginatedData.length / this.itemsPerPage);
        },




        filterTableData() {
            if (this.searchQuery.trim() === '') {
                // If search query is empty, show all data
                this.paginatedData = [...this.tableData];
            } else {
                // Filter data based on search query
                this.paginatedData = this.tableData.filter(item => {
                    // Adjust the fields to search according to your needs
                    const searchFields = [
                        item.deviceType,
                        item.hutId,
                        item.deviceId,
                        item.channelId,
                        item.gearType,
                        item.timeStamp,
                        item.value,
                        this.getStatus(item).status
                    ];

                    // Return true if any field matches the search query (case insensitive)
                    return searchFields.some(field =>
                        field && field.toString().toLowerCase().includes(this.searchQuery.toLowerCase())
                    );
                });
            }

            // After filtering, update pagination
            this.totalPages = Math.ceil(this.paginatedData.length / this.itemsPerPage);
        },


        // updatePaginatedData() {
        //     // Make sure we reset pagination to the first page if data is filtered
        //     const totalItems = this.paginatedData.length;

        //     // Calculate the start and end indices based on the current page
        //     const start = (this.currentPage - 1) * this.itemsPerPage;
        //     const end = this.currentPage * this.itemsPerPage;

        //     // Slice the filtered or sorted data for pagination
        //     const paginatedItems = this.paginatedData.slice(start, end);

        //     // Ensure that paginated data is updated properly
        //     this.displayedData = paginatedItems;

        //     // Optionally: Update totalPages if you haven't already
        //     this.totalPages = Math.ceil(totalItems / this.itemsPerPage);
        // }

        // ,

        // prevPage() {
        //     if (this.currentPage > 1) {
        //         this.currentPage--;
        //         this.updatePaginatedData();
        //     }
        // },

        // nextPage() {
        //     if (this.currentPage < this.totalPages) {
        //         this.currentPage++;
        //         this.updatePaginatedData();
        //     }
        // },

        filterAndSortByStatus() {
            if (this.selectedStatus && this.selectedStatus !== 'All') {
                // Filter rows by status if a specific status is selected
                this.paginatedData = this.tableData.filter(item => this.getStatus(item).status === this.selectedStatus);
            } else {
                // If 'All' is selected or no filter is applied, display all rows
                this.paginatedData = [...this.tableData];
            }

            // After filtering, update the pagination
            this.totalPages = Math.ceil(this.paginatedData.length / this.itemsPerPage);

        },

        filterAndSortTable() {
            // Apply filtering based on deviceType
            if (this.selectedDeviceType && this.selectedDeviceType !== 'All') {
                // Filter rows by deviceType if a specific type is selected
                this.paginatedData = this.tableData.filter(item => item.deviceType === this.selectedDeviceType);
            } else {
                // If 'All' is selected or no filter is applied, display all rows
                this.paginatedData = [...this.tableData];
            }
            this.totalPages = Math.ceil(this.paginatedData.length / this.itemsPerPage);
            // this.updatePaginatedData(); // Update the displayed paginated rows
        }


        ,
=======
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
>>>>>>> e0ad36401195423255db1e02af8817fe8efaedae

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
<<<<<<< HEAD
=======
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
>>>>>>> e0ad36401195423255db1e02af8817fe8efaedae

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
<<<<<<< HEAD
        },
        startRefreshInterval() {
            if (this.dataRefreshInterval) {
                console.log('Starting refresh interval');
                clearInterval(this.dataRefreshInterval); // Clear existing interval
            }
            this.dataRefreshInterval = setInterval(() => {
                this.fetchTableData(); // Fetch data periodically
            }, 1000); // Set your preferred interval time
        },
        stopRefreshInterval() {
            console.log('Stopping refresh interval');
            if (this.dataRefreshInterval) {
                clearInterval(this.dataRefreshInterval); // Stop the interval
=======
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
>>>>>>> e0ad36401195423255db1e02af8817fe8efaedae
                this.dataRefreshInterval = null;
            }
        },

<<<<<<< HEAD
        downloadData() {
            const fileType = "csv"; // You can allow the user to choose the file type
            if (fileType === "csv") {
                this.downloadCsv();
            } else if (fileType === "pdf") {
                this.downloadPdf();
            }
        },

        downloadCsv() {
            const rows = [];
            // Create table header row
            rows.push([
                'SNo', 'Device Type', 'Hut ID', 'Device ID', 'Channel ID', 'Gear Type', 'Date', 'Time', 'Value', 'Status'
            ]);

            // Create data rows
            this.paginatedData.forEach(item => {
                rows.push([
                    item.deviceType,
                    item.hutId,
                    item.deviceId,
                    item.channelId,
                    item.tableData.gearType || 'N/A',
                    this.formatDate(item.timeStamp),
                    this.formatTimestamp(item.timeStamp),
                    item.value || 'N/A',
                    this.getStatus(item).status,
                ]);
            });

            // Convert to CSV format
            const csvContent = "data:text/csv;charset=utf-8,"
                + rows.map(row => row.join(",")).join("\n");

            // Create a link and download the CSV file
            const encodedUri = encodeURI(csvContent);
            const link = document.createElement("a");
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", "table_data.csv");
            document.body.appendChild(link);
            link.click();
        }
        ,

        downloadPdf() {
            const doc = new jsPDF();
            const headers = ["SNo", "Device Type", "Hut ID", "Device ID", "Channel ID", "Gear Type", "Date", "Time", "Value", "Status"];
            const rows = this.paginatedData.map(item => [
                item.sno,
                item.deviceType,
                item.hutId,
                item.deviceId,
                item.channelId,
                item.tableData.gearType || 'N/A',
                this.formatDate(item.timeStamp),
                this.formatTimestamp(item.timeStamp),
                item.value || 'N/A',
                this.getStatus(item).status,
            ]);

            doc.autoTable({ head: [headers], body: rows });
            doc.save('device_data.pdf');
        },
    },
};
</script>

<style scoped>
/* Custom styling for the dropdown containers */
.dropdown-container {
    margin-bottom: 15px;
    flex: 1;
    /* Ensure dropdowns take up equal space */
    display: flex;
    align-items: center;
    justify-content: flex-start;
}

/* Flex container to align the dropdowns in a row */
.div-ddl {
    display: flex;
    gap: 20px;
    /* Adjust gap between the dropdowns */
    width: 100%;
}

/* Styling for the select element */
=======
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

>>>>>>> e0ad36401195423255db1e02af8817fe8efaedae
.custom-select {
    padding: 8px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 200px;
}

<<<<<<< HEAD
/* Styling for the search input */
.custom-input {
    padding: 8px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 200px;
}

=======
>>>>>>> e0ad36401195423255db1e02af8817fe8efaedae
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
<<<<<<< HEAD
=======
    margin-top: 10px;
>>>>>>> e0ad36401195423255db1e02af8817fe8efaedae
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
<<<<<<< HEAD
    align-items: center;
    margin-bottom: 10px;
}

=======
    margin-bottom: 10px;
}

.div-ddl {
    display: flex;
    gap: 20px;
}

>>>>>>> e0ad36401195423255db1e02af8817fe8efaedae
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
<<<<<<< HEAD
    color: #3eb95f;
=======
    /* Soft light green */
    color: #3eb95f;
    /* Subtle border for contrast */
>>>>>>> e0ad36401195423255db1e02af8817fe8efaedae
}

.btn-red {
    background-color: rgba(231, 75, 43, 0.1) !important;
<<<<<<< HEAD
    color: #e74b2b;
=======
    /* Soft light red */
    color: #e74b2b;
    /* Subtle border for contrast */
>>>>>>> e0ad36401195423255db1e02af8817fe8efaedae
}

.btn-gray {
    background-color: rgba(234, 146, 0, 0.1) !important;
<<<<<<< HEAD
    color: #ea9200;
=======
    /* Soft gray */
    color: #ea9200;
    /* Subtle border for contrast */
>>>>>>> e0ad36401195423255db1e02af8817fe8efaedae
}

/* Optional: Add hover effect for better user experience */
.status-btn:hover {
    opacity: 0.9;
}
<<<<<<< HEAD

/* Centered headers for table */
th {
    text-align: center !important;
}

td {
    text-align: center !important;
}

.download-btn {
    background-color: #4CAF50;
    /* Green background */
    color: white;
    /* White text */
    border: none;
    padding: 10px 15px;
    border-radius: 5px;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    /* Space between icon and text */
    font-size: 16px;
    transition: background-color 0.3s ease;
}

.download-btn:hover {
    background-color: #45a049;
    /* Darker green on hover */
}

.download-icon {
    width: 20px;
    height: 20px;
}
</style>
=======
</style>
>>>>>>> e0ad36401195423255db1e02af8817fe8efaedae
