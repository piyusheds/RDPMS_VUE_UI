<template>
    <main style="padding-top:10px;">
        <div class="row">
            <div class="col-12">
                <h2 class="text-center text-primary">Health History Data</h2>
            </div>
        </div>

        <div class="main-container">
            <div class="div-ddl">
                <div class="dropdown-container">
                    <label for="imei-select" class="dropdown-label">IMEI/MAC</label>
                    <select id="imei-select" v-model="selectedImei" @change="onImeiChange" class="custom-select">
                        <option value="" disabled>Select IMEI/MAC</option>
                        <option v-for="imei in imeiList" :key="imei" :value="imei">{{ imei }}</option>
                    </select>
                </div>
            </div>
        </div>


        <ag-grid-vue :columnDefs="columnDefs" :rowData="rowData" :pagination="true" :enableSorting="true"
            :enableFilter="true" :enableColResize="true" :paginationPageSize="10" class="ag-theme-alpine"
            :domLayout="'autoHeight'" @first-data-rendered="onFirstDataRendered"></ag-grid-vue>

    </main>
</template>

<script>
import ApiGatewayServies from '../../Services/ApiGatewayServies';
import { AgGridVue } from '@ag-grid-community/vue3';
import '@ag-grid-community/styles/ag-grid.css'
import '@ag-grid-community/styles/ag-theme-alpine.css'


export default {
    name: 'App',
    components: {
        AgGridVue
    },
    data() {
        return {
            imeiList: [],
            selectedImei: '',
            tableData: [],
            loading: false,
            selectedDeviceType: "",

            loading: true,
            currentPage: 1,
            itemsPerPage: 10,
            rowData: [], // Row data from your API
            columnDefs: [
                { headerName: 'Sno', valueGetter: 'node.rowIndex + 1', width: 80, sortable: true },
                {
                    headerName: 'Hut ID',
                    field: 'hutId',
                    tooltipField: 'hutId',
                    sortable: true,
                    filter: 'agTextColumnFilter', // Enable text filtering for this column
                    floatingFilter: true, // Add floating filter
                    filterParams: {
                        clearButton: true,   // Display a clear button
                        debounceMs: 500,     // Delay for filter input (in milliseconds)
                    },
                },
                { headerName: 'Device ID', field: 'deviceId', tooltipField: 'deviceId', sortable: true, filter: true, floatingFilter: true },
                { headerName: 'Device Type', field: 'deviceType', tooltipField: 'deviceType', sortable: true, filter: true, floatingFilter: true },

                {
                    headerName: 'Date',
                    field: 'timeStamp',
                    valueFormatter: (params) => this.formatDate(params.value) || 'N/A', // Format the displayed value
                    sortable: true,
                    filter: 'agDateColumnFilter',  // Use the date filter
                    floatingFilter: true,
                    filterParams: {
                        clearButton: true,
                        inRangeInclusive: true,
                        comparator: (filterLocalDateAtMidnight, cellValue) => {
                            const cellDate = new Date(cellValue * 1000); // *1000 because JavaScript expects milliseconds
                            const strippedCellDate = new Date(cellDate.getFullYear(), cellDate.getMonth(), cellDate.getDate());
                            const strippedFilterDate = new Date(filterLocalDateAtMidnight.getFullYear(), filterLocalDateAtMidnight.getMonth(), filterLocalDateAtMidnight.getDate());
                            if (strippedCellDate.getTime() < strippedFilterDate.getTime()) {
                                return -1;  // Cell date is earlier, so it goes before
                            } else if (strippedCellDate.getTime() > strippedFilterDate.getTime()) {
                                return 1;  // Cell date is later, so it goes after
                            }
                            return 0;  // Dates are equal
                        }
                    }
                },

                {
                    headerName: 'Timestamp',
                    field: 'timeStamp',
                    valueFormatter: (params) => this.formatTimestamp(params.value),
                    tooltipValueGetter: (params) => {
                        const timestamp = params.value;
                        if (!timestamp || isNaN(timestamp)) return 'Invalid Date';
                        const date = new Date(timestamp.toString().length === 10 ? timestamp * 1000 : timestamp);
                        return `${date.toLocaleTimeString()}`;
                    },
                    sortable: true,
                    filter: true,
                    floatingFilter: true, // Add floating filter
                },

                {
                    headerName: 'Status',
                    field: 'status',
                    tooltipField: 'status',
                    sortable: true,
                    filter: true,
                    floatingFilter: true,
                    cellRenderer: function (params) {
                        const status = params.value;
                        const btnClass = status === true ? 'btn-green' : 'btn-red';
                        const text = status === true ? 'Pass' : 'Fail';
                        return `
                         <span class=" ${btnClass}" style="padding: 6px 10px; border-radius: 8px;">${text}</span>`;
                    }
                }
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
        }
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
        // selectedImei(newVal) {
        //     if (!newVal) {
        //         // Reset other filters when IMEI is cleared
        //         this.selectedDeviceType = '';
        //         this.selectedStatus = '';
        //         this.searchQuery = '';
        //     }
        // }
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

                let url = `IotDeviceData/HistoryDeviceHealthByImeiMac?imeiMac=${this.selectedImei}`;

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

                // Check for valid response
                const newData = response.data || [];

                if (newData.length > 0) {
                    // Append the new data to existing rowData
                    this.rowData = [...newData];
                    console.log("Appended data to rowData", this.rowData);
                } else {
                    console.log("No new data to append");
                }
            } catch (error) {
                console.error('Error fetching table data:', error);
            }
        }
        ,


        async onImeiChange() {
            try {
                if (!this.selectedImei) return;
                await this.fetchTableData();
            } catch (error) {
                console.error('Error handling IMEI change:', error);
            }
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
                return null; // Return null if the timestamp is null or undefined
            }

            // Ensure timestamp is in seconds, so we convert to milliseconds
            const date = new Date(timestamp * 1000); // Convert epoch timestamp (seconds) to Date object

            // Check if the date is invalid
            if (isNaN(date)) {
                return 'Invalid Date'; // Return a message if the date is invalid
            }

            // Get day, month, and year
            const day = String(date.getDate()).padStart(2, '0'); // Ensure two-digit day
            const month = String(date.getMonth() + 1).padStart(2, '0'); // Ensure two-digit month (months are zero-indexed)
            const year = date.getFullYear();

            // Format the date as 'dd-MM-yyyy'
            const formattedDate = `${day}-${month}-${year}`;

            return formattedDate; // Return formatted date in 'dd-MM-yyyy' format
        }
        ,

        // getStatus(item) {
        //     if (item.deviceType === 'Digital Input') {
        //         const status = item.value === "1" ? 'Active' : 'Inactive';
        //         const statusClass = item.value === "1" ? 'btn-green' : 'btn-red';
        //         return { status, statusClass };
        //     }

        //     if (item.deviceType === "Ac Current" || item.deviceType === "Dc Current") {
        //         const value = item.value;
        //         const range1 = item.gearType.channelValueRange1;
        //         const range2 = item.gearType.channelValueRange2;

        //         if (value < range1) {
        //             return { status: 'Low Current', statusClass: 'btn-gray' };
        //         } else if (value >= range1 && value <= range2) {
        //             return { status: 'Normal Current', statusClass: 'btn-green' };
        //         } else if (value > range2) {
        //             return { status: 'High Current', statusClass: 'btn-red' };
        //         }
        //     }

        //     if (item.deviceType === "Ac Voltage" || item.deviceType === "Dc Voltage") {
        //         const value = item.value;
        //         const range1 = item.gearType.channelValueRange1;
        //         const range2 = item.gearType.channelValueRange2;

        //         if (value < range1) {
        //             return { status: 'Low Voltage', statusClass: 'btn-gray' };
        //         } else if (value >= range1 && value <= range2) {
        //             return { status: 'Normal Voltage', statusClass: 'btn-green' };
        //         } else if (value > range2) {
        //             return { status: 'High Voltage', statusClass: 'btn-red' };
        //         }
        //     }

        //     return { status: 'N/A', statusClass: 'btn-gray' };
        // }
    },
};
</script>

<style scoped>
.table {
    margin-top: 20px;
}

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

.ag-tooltip {
    font-size: 13px;
    color: #333;
    background-color: #fff;
    border: 1px solid #ccc;
    padding: 5px;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}


.div-ddl {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 10px;
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
    width: 128px;
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
}

:deep(.btn-green) {
    background-color: rgba(62, 185, 95, 0.1) !important;
    color: #3eb95f !important;
}

:deep(.btn-red) {
    background-color: rgba(231, 75, 43, 0.1) !important;
    color: #e74b2b !important;
}
</style>
