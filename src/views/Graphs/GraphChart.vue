<template>
    <main>
        <div class="main-container">
            <div class="div-ddl">
                <div class="dropdown-container">
                    <label for="imei-select" style="margin-right: 10px;">IMEI</label>
                    <select id="imei-select" v-model="selectedImei" @change="onImeiChange" class="custom-select">
                        <option value="" disabled>Select IMEI</option>
                        <option v-for="imei in imeiList" :key="imei" :value="imei">{{ imei }}</option>
                    </select>
                </div>

                <div class="dropdown-container">
                    <label for="hutId-select" style="margin-right: 10px;">Hut ID</label>
                    <select id="hutId-select" v-model="selectedHutId" @change="fetchDeviceIds" class="custom-select"
                        :disabled="!selectedImei">
                        <option value="" disabled>Select Hut ID</option>
                        <!-- <option value="All">All</option> -->
                        <option v-for="hutId in hutIdList" :key="hutId" :value="hutId">{{ hutId }}</option>
                    </select>
                </div>

                <div class="dropdown-container">
                    <label for="device-select" style="margin-right: 10px;">Device ID</label>
                    <select id="device-select" v-model="selectedDeviceId" @change="fetchgraphdata" class="custom-select"
                        :disabled="!selectedHutId">
                        <option value="" disabled>Select Device ID</option>
                        <option v-for="device in deviceList.filter(device => device.deviceType === 'Ac Voltage')"
                            :key="device.deviceId" :value="device.deviceId">
                            (ID: {{ device.deviceId }}) (Type: {{ device.deviceType }}) (Name: {{ device.deviceName }})
                        </option>
                    </select>
                </div>


            </div>
        </div>

        <h4 class="text-center" v-if="selectedDeviceId">{{ getDeviceType() }} Graph</h4>
        <section>
            <apexchart type="line" :options="chartOptions" :series="series" class="custom-chart" />
        </section>
    </main>
</template>
<script>
import { defineComponent } from "vue";
import VueApexCharts from "vue3-apexcharts";
import ApiGatewayServies from "../../Services/ApiGatewayServies";

export default {
    components: {
        apexchart: VueApexCharts,
    },
    data() {
        return {
            imeiList: [],
            selectedImei: "",
            selectedHutId: "",
            selectedDeviceId: "",
            hutIdList: [],
            deviceList: [],
            series: [],
            chartOptions: {
                chart: {
                    height: 350,
                    // width: "50%",
                    // maxWidth: 800,
                    type: "line",
                },
                stroke: {
                    width: 4,
                },
                title: {
                    text: "",
                    align: "center",
                },
                xaxis: {
                    type: "time", // Use datetime for the x-axis
                    title: {
                        text: "Timestamp",
                    },
                },
                labels: {
                    formatter: (value) => {
                        const date = new Date(value);
                        const hours = date.getHours().toString().padStart(2, '0');
                        const minutes = date.getMinutes().toString().padStart(2, '0');
                        const seconds = date.getSeconds().toString().padStart(2, '0');
                        return `${hours}:${minutes}:${seconds}`; // Only show time (HH:mm:ss)
                    },
                },
                yaxis: {
                    title: {
                        text: "Values",
                    },
                },
                tooltip: {
                    shared: true,
                    intersect: false,
                    y: {
                        formatter: (value) => value.toFixed(2), // Format tooltip values
                    },
                },
                legend: {
                    position: "top",
                },
            },
        };
    },
    created() {
        this.fetchImeiList();
    },
    methods: {
        async fetchgraphdata() {
            try {
                const token = localStorage.getItem("authToken");
                if (!token) throw new Error("Authentication token is missing.");
                console.log(this.selectedDeviceId, this.selectedHutId, this.selectedImei);

                let url = `DeviceData/GetDeviceDetailsByImeiMac?imeiMac=${this.selectedImei}&hutId=${this.selectedHutId}&deviceId=${this.selectedDeviceId}`;
                const response = await ApiGatewayServies.get(url, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });

                console.log(response.data);

                const channelData = response.data.channelData;

                // Prepare data for all channels
                const seriesData = [];

                channelData.forEach((channel) => {
                    const channelName = `${channel.channalId}`;
                    const channelSeries = {
                        name: channelName,
                        data: [],  // Initialize the data array
                    };

                    // Iterate through hourly data
                    channel.hourlyData.forEach((entry) => {
                        const timestamp = new Date(entry.timestamp).getTime(); // Convert to UNIX time
                        const value = parseFloat(entry.channelValue);

                        channelSeries.data.push({ x: timestamp, y: value }); // Add data point with timestamp
                    });

                    seriesData.push(channelSeries);
                });

                // Assign series data to the chart
                this.series = seriesData;

                // Set chartOptions for the x-axis to show only time
                this.chartOptions = {
                    ...this.chartOptions,
                    xaxis: {
                        type: 'datetime',  // Use datetime for the x-axis
                        title: {
                            text: 'Timestamp',
                        },
                        labels: {
                            formatter: (value) => {
                                const date = new Date(value);
                                // Format to display only the time (hours, minutes, seconds)
                                const hours = date.getHours().toString().padStart(2, '0');
                                const minutes = date.getMinutes().toString().padStart(2, '0');
                                const seconds = date.getSeconds().toString().padStart(2, '0');
                                return `${hours}:${minutes}:${seconds}`; // Only show time (HH:mm:ss)
                            },
                        },
                    },
                };

                console.log(seriesData);

            } catch (error) {
                console.error("Error fetching graph data:", error);
            }
        },

        getDeviceType() {
            const selectedDevice = this.deviceList.find(device => device.deviceId === this.selectedDeviceId);
            return selectedDevice ? selectedDevice.deviceType : 'Select a Device';
        },

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
        async onImeiChange() {
            try {
                if (!this.selectedImei) return;

                // Fetch Hut IDs based on the selected IMEI
                await this.fetchHutIds();

                // Fetch table data directly based on selected IMEI
                // await this.fetchTableData();
            } catch (error) {
                console.error('Error handling IMEI change:', error);
            }
        },

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
            } catch (error) {
                console.error('Error fetching Hut IDs:', error);
            }
        },

        async fetchDeviceIds() {
            if (!this.selectedHutId) return;

            try {
                const token = localStorage.getItem('authToken');
                if (!token) throw new Error('Authentication token is missing.');

                const response = await ApiGatewayServies.get(
                    `DeviceData/Devices?hutId=${this.selectedHutId}`,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`,
                        },
                    }
                );

                this.deviceList = response.data || [];
            } catch (error) {
                console.error('Error fetching Device IDs:', error);
            }
        },
    },
};
</script>


<style scoped>
.chart-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f9f9f9;
}

section {
    display: flex;
    justify-content: center;
}

.custom-chart {
    min-height: 450px !important;
    max-width: 1500px;
    max-height: 1500px;
    width: 100%;
    height: 100%;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 10px;
    background-color: #ffffff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.custom-select {
    padding: 8px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 200px;
}

.main-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
}

.div-ddl {
    display: flex;
    gap: 20px;
    /* Adjust gap between the dropdowns */
    width: 100%;
}
</style>
