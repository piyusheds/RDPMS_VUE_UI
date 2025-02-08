<template>
    <main style="padding-top:10px;">
        <div class="row">
<<<<<<< HEAD
            <div class="col-12 d-flex justify-content-center ">
                <h2 class="text-center text-primary">Real-Time Data</h2>
                <div class="d-flex">
=======
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
>>>>>>> e0ad36401195423255db1e02af8817fe8efaedae
                </div>
            </div>
        </div>
        <div class="main-container">
            <div class="div-ddl">
                <!-- IMEI Dropdown -->
                <div class="dropdown-container">
                    <label for="imei-select" style="margin-right: 10px;">IMEI</label>
                    <select id="imei-select" v-model="selectedImei" @change="onImeiChange" class="custom-select">
                        <option value="" disabled>Select IMEI</option>
                        <option v-for="imei in imeiList" :key="imei" :value="imei">{{ imei }}</option>
                    </select>
                </div>


<<<<<<< HEAD
=======
                <!-- Hut ID Dropdown -->
>>>>>>> e0ad36401195423255db1e02af8817fe8efaedae
                <div class="dropdown-container">
                    <label for="hutId-select" style="margin-right: 10px;">Hut ID</label>
                    <select id="hutId-select" v-model="selectedHutId" @change="filterDataByHutId" class="custom-select"
                        :disabled="!selectedImei">
<<<<<<< HEAD
                        <option value="" disabled>Select Hut ID</option>
                        <option value="All">All</option>
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

                <button @click="downloadData" class="download-btn ">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                            stroke="currentColor" class="download-icon">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                    </button>
            </div>
        </div>

        <div class="table-responsive" style="margin-top: 0px!important">
            <ag-grid-vue :columnDefs="columnDefs" :rowData="paginatedData" :pagination="true"
                :paginationPageSize="itemsPerPage" :domLayout="'autoHeight'" :enableSorting="true" :enableFilter="true"
                :enableColResize="true" class="ag-theme-alpine"
                @first-data-rendered="onFirstDataRendered"></ag-grid-vue>
        </div>

        <!-- </div> -->
=======
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
                        <th style="text-align: center;" @click="sortTable('value')">Value</th>
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
                        <td style="text-align: center;">{{ item.value || 'N/A' }}</td>
                        <td style="text-align: center;">
                            <button :class="['status-btn', getStatus(item).statusClass]">
                                {{ getStatus(item).status }}
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <!-- 
        <div class="pagination">
            <button @click="prevPage" :disabled="currentPage === 1" class="pagination-btn">Previous</button>
            <span>Page {{ currentPage }} of {{ totalPages }}</span>
            <button @click="nextPage" :disabled="currentPage === totalPages" class="pagination-btn">Next</button>
        </div> -->
>>>>>>> e0ad36401195423255db1e02af8817fe8efaedae
    </main>
</template>

<script>
import ApiGatewayServies from '../../Services/ApiGatewayServies';
<<<<<<< HEAD
import { AgGridVue } from '@ag-grid-community/vue3';
import '@ag-grid-community/styles/ag-grid.css'
import '@ag-grid-community/styles/ag-theme-alpine.css'
import { useToast } from 'vue-toastification';
=======
import { jsPDF } from 'jspdf'; // For PDF export
import * as XLSX from 'xlsx'; // For Excel export
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import 'datatables.net-bs4/css/dataTables.bootstrap4.min.css';
>>>>>>> e0ad36401195423255db1e02af8817fe8efaedae

export default {
    components: {
        AgGridVue
    },
    data() {
        return {
            imeiList: [], // Holds the fetched IMEI list
            selectedImei: '', // Stores the selected IMEI
            selectedDeviceType: "", // Stores the selected Device Type
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

            statusOptions: ["Active", "Inactive", "Low Voltage", "Normal Voltage", "High Voltage", "Low Current", "Normal Current", "High Current"], // Status options for filtering
            selectedStatus: '',
            searchQuery: '',
            hutIdList: [], // List of Hut IDs fetched based on the selected IMEI
            selectedHutId: "",

<<<<<<< HEAD
            rowData: [], // Row data from your API
            columnDefs: [
                {
                    headerName: 'Sno',
                    valueGetter: 'node.rowIndex + 1',
                    width: 80,
                    sortable: true,
                },
                {
                    headerName: 'Device Type',
                    field: 'deviceType',
                    sortable: true,
                    width: 140,
                    filter: 'agTextColumnFilter',  // Enable text filtering for this column
                    floatingFilter: true,  // Add floating filter
                    filterParams: {
                        clearButton: true,
                        debounceMs: 500,  // Delay for filter input (in milliseconds)
                    },
                },
                {
                    headerName: 'Hut ID',
                    field: 'hutId',
                    sortable: true,
                    width: 100,
                    filter: 'agTextColumnFilter',
                    floatingFilter: true,
                    filterParams: {
                        clearButton: true,
                        debounceMs: 500,
                    },
                },
                {
                    headerName: 'Device ID',
                    field: 'deviceId',
                    sortable: true,
                    width: 100,
                    filter: 'agTextColumnFilter',
                    floatingFilter: true,
                    filterParams: {
                        clearButton: true,
                        debounceMs: 500,
                    },
                },
                {
                    headerName: 'Channel ID',
                    field: 'channelId',
                    sortable: true,
                    width: 100,
                    filter: 'agTextColumnFilter',
                    floatingFilter: true,
                    filterParams: {
                        clearButton: true,
                        debounceMs: 500,
                    },
                },
                {
                    headerName: 'Gear Type',
                    field: 'gearType',
                    width: 250,
                    valueGetter: (params) => {
                        // Access gearType from tableData object
                        return params.data.tableData && params.data.tableData.gearType
                            ? params.data.tableData.gearType
                            : 'N/A';
                    },
                    tooltipValueGetter: (params) => {
                        // Access gearType from tableData object for the tooltip
                        return params.data.tableData && params.data.tableData.gearType
                            ? params.data.tableData.gearType
                            : 'N/A';
                    },
                    sortable: true,
                    filter: true,
                    floatingFilter: true, // Add floating filter
                },
                {
                    headerName: 'Date',
                    field: 'timeStamp',
                    valueFormatter: (params) => this.formatDate(params.value) || 'N/A', // Format the displayed value
                    sortable: true,
                    width: 130,
                    filter: 'agDateColumnFilter',  // Use the date filter
                    floatingFilter: true,
                    filterParams: {
                        clearButton: true,
                        debounceMs: 500,
                        inRangeInclusive: true,
                        comparator: (filterLocalDateAtMidnight, cellValue) => {

                            // Strip time from the Date objects by setting hours, minutes, seconds, and milliseconds to 0
                            const strippedCellDate = new Date(cellValue.getFullYear(), cellValue.getMonth(), cellValue.getDate());
                            const strippedFilterDate = new Date(filterLocalDateAtMidnight.getFullYear(), filterLocalDateAtMidnight.getMonth(), filterLocalDateAtMidnight.getDate());

                            // Compare the stripped dates (ignoring time)
                            if (strippedCellDate < strippedFilterDate) {
                                return -1;  // Cell date is earlier, so it goes before
                            } else if (strippedCellDate > strippedFilterDate) {
                                return 1;  // Cell date is later, so it goes after
                            }
                            return 0;  // Dates are equal
                        }
                    }
                }
                ,


                {
                    headerName: 'Time',
                    field: 'timeStamp',
                    valueFormatter: (params) => this.formatTimestamp(params.value) || 'N/A',
                    sortable: true,
                    width: 130,
                    filter: 'agTextColumnFilter',
                    floatingFilter: true,
                    filterParams: {
                        clearButton: true,
                        debounceMs: 500,
                    },
                },
                {
                    headerName: 'Value',
                    field: 'value',
                    width: 100,
                    sortable: true,
                    filter: 'agNumberColumnFilter',  // Use number filter
                    floatingFilter: true,
                    cellStyle: { textAlign: 'center' },
                    filterParams: {
                        clearButton: true,
                        debounceMs: 500,
                    },
                },
                {
                    headerName: 'Status',
                    cellRenderer: (params) => {
                        const status = this.getStatus(params.data);
                        return `<span class="status-btn ${status.statusClass}">${status.status}</span>`;
                    },
                    width: 150,
                    sortable: true,
                    filter: 'agTextColumnFilter',
                    floatingFilter: true,
                    cellStyle: { textAlign: 'center' },
                    filterParams: {
                        clearButton: true,
                        debounceMs: 500,
                    },
                },
            ],

            gridOptions: {
                enableBrowserTooltips: true,
                rowSelection: 'single',
                pagination: true,
                paginationPageSize: 10,
                domLayout: 'normal',
                quickFilterText: '',
                floatingFilter: true,  // Enable floating filters globally
            },

            // },

=======
>>>>>>> e0ad36401195423255db1e02af8817fe8efaedae
        };
    },
    created() {
        this.fetchImeiList();
    },
    beforeDestroy() {
        // Clear the interval to avoid unnecessary API calls when the component is destroyed
        clearInterval(this.dataRefreshInterval);
    },
    watch: {
        selectedImei(newImei) {
<<<<<<< HEAD
=======
            console.log('selectedImei changed:', newImei);
>>>>>>> e0ad36401195423255db1e02af8817fe8efaedae
            if (newImei) {
                this.fetchTableData(); // Fetch table data when IMEI changes
                this.startRefreshInterval(); // Start the interval
            } else {
                this.stopRefreshInterval(); // Stop the interval if no IMEI is selected
            }
        },
        selectedDeviceType() {
            this.applyFiltersAndSorting(); // Apply sorting/filtering when selectedDeviceType changes
        },
        selectedStatus() {
            this.applyFiltersAndSorting(); // Apply sorting/filtering when selectedStatus changes
        }
    },
<<<<<<< HEAD
=======

    computed: {
        totalPages() {
            return Math.ceil(this.tableData.length / this.itemsPerPage);
        },
    },
    // beforeDestroy() {
    //     // Clear the interval to avoid unnecessary API calls when the component is destroyed
    //     clearInterval(this.dataRefreshInterval);
    // },
>>>>>>> e0ad36401195423255db1e02af8817fe8efaedae
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
<<<<<<< HEAD
=======
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
>>>>>>> e0ad36401195423255db1e02af8817fe8efaedae
        async fetchImeiList() {
            const toast = useToast();
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
                // console.error('Error fetching IMEI list:', error);
                toast.error(`IMEI ${error.response.statusText}`, {
                    timeout: 2000,
                }); 
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
<<<<<<< HEAD
                toast.error(`Error ${error.response.statusText}`, {
                    timeout: 2000,
                }); 
=======
>>>>>>> e0ad36401195423255db1e02af8817fe8efaedae
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

            try {
                const token = localStorage.getItem('authToken');
                if (!token) throw new Error('Authentication token is missing.');

<<<<<<< HEAD
                let url = `IotDeviceData/LiveDeviceAlertByImeiMac?imeiMac=${this.selectedImei}`;
=======
                let url = `IotDeviceData/GetLiveDatasByImeiMac?imeiMac=${this.selectedImei}`;
>>>>>>> e0ad36401195423255db1e02af8817fe8efaedae

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

<<<<<<< HEAD
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

=======

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

>>>>>>> e0ad36401195423255db1e02af8817fe8efaedae
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
                return null; // Return null if the timestamp is null or undefined
            }

            const date = new Date(timestamp * 1000); // Convert epoch timestamp (seconds) to Date object

            // Get day, month, and year
            const day = String(date.getDate()).padStart(2, '0'); // Ensure two-digit day
            const month = String(date.getMonth() + 1).padStart(2, '0'); // Ensure two-digit month (months are zero-indexed)
            const year = date.getFullYear();

            // Format the date as 'dd-MM-yyyy'
            const formattedDate = `${day}-${month}-${year}`;

            return formattedDate; // Return formatted date in 'dd-MM-yyyy' format
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
                this.dataRefreshInterval = null;
            }
        },

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
<<<<<<< HEAD
                'Device Type', 'Hut ID', 'Device ID', 'Channel ID', 'Gear Type', 'Date', 'Time', 'Value', 'Status'
=======
                'SNo', 'Device Type', 'Hut ID', 'Device ID', 'Channel ID', 'Gear Type', 'Date', 'Time', 'Value', 'Status'
>>>>>>> e0ad36401195423255db1e02af8817fe8efaedae
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
<<<<<<< HEAD
            const headers = ["Device Type", "Hut ID", "Device ID", "Channel ID", "Gear Type", "Date", "Time", "Value", "Status"];
=======
            const headers = ["SNo", "Device Type", "Hut ID", "Device ID", "Channel ID", "Gear Type", "Date", "Time", "Value", "Status"];
>>>>>>> e0ad36401195423255db1e02af8817fe8efaedae
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
<<<<<<< HEAD
:deep(.status-btn) {
    width: 110px !important;
    padding: 4px 7px !important;
    border: none !important;
    font-size: 13px !important;
    color: white !important;
    border-radius: 10px !important;
    cursor: pointer !important;
}

:deep(.btn-green) {
    background-color: rgba(62, 185, 95, 0.1) !important;
    color: #3eb95f !important;
}

:deep(.btn-red) {
    background-color: rgba(231, 75, 43, 0.1) !important;
    color: #e74b2b !important;
}

:deep(.btn-gray) {
    background-color: rgba(234, 146, 0, 0.1) !important;
    color: #ea9200 !important;
}

.dropdown-container {
    margin-bottom: 15px;
    flex: 1;
    /* Ensure dropdowns take up equal space */
    display: flex;
    align-items: center;
    justify-content: flex-start;
}

=======
/* Custom styling for the dropdown containers */
.dropdown-container {
    margin-bottom: 15px;
    flex: 1;
    /* Ensure dropdowns take up equal space */
    display: flex;
    align-items: center;
    justify-content: flex-start;
}

>>>>>>> e0ad36401195423255db1e02af8817fe8efaedae
/* Flex container to align the dropdowns in a row */
.div-ddl {
    display: flex;
    gap: 20px;
    /* Adjust gap between the dropdowns */
    width: 100%;
}

/* Styling for the select element */
<<<<<<< HEAD
/* .custom-select {
    padding: 8px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 200px;
} */

/* Styling for the search input */
.custom-input {
=======
.custom-select {
>>>>>>> e0ad36401195423255db1e02af8817fe8efaedae
    padding: 8px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 200px;
}

/* Styling for the search input */
.custom-input {
    padding: 8px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 200px;
}

/* Improve button styles */
.download-btn {
<<<<<<< HEAD
    padding: 6px 10px !important;
=======
    padding: 9px 14px;
>>>>>>> e0ad36401195423255db1e02af8817fe8efaedae
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
    align-items: center;
<<<<<<< HEAD
    /* margin-bottom: 10px; */
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

/* Optional: Add hover effect for better user experience */
.status-btn:hover {
    opacity: 0.9;
}

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

.div-ddl {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    /* margin-bottom: 10px; */
}

.dropdown-container {
    display: inline-block;
    margin-right: 15px;
}

.dropdown-label {
    font-size: 12px;
    margin-right: 5px;
}

.custom-select {
    font-size: 12px;
    padding: 5px 8px;
    width: 132px;
    border-radius: 4px;
    border: 1px solid #ccc;
    background-color: #fff;
    box-shadow: none;
    outline: none;
    cursor: pointer;
}

.custom-select:focus {
    border-color: #66afe9;
    box-shadow: 0 0 3px rgba(102, 175, 233, .6);
=======
    margin-bottom: 10px;
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

/* Optional: Add hover effect for better user experience */
.status-btn:hover {
    opacity: 0.9;
}

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
>>>>>>> e0ad36401195423255db1e02af8817fe8efaedae
}
</style>
