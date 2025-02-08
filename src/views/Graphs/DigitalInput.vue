<template>
    <main style="padding-top:10px;">
        <div class="row main-container">
            <div class="col-12 d-flex justify-content-center mb-2">
                <h2 class="text-center text-primary">Dc Voltage Graph</h2>
            </div>
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
                        <option v-for="device in deviceList.filter(device => device.deviceType == 'Digital Input')"
                            :key="device.deviceId" :value="device.deviceId">
                            (ID: {{ device.deviceId }}) (Type: {{ device.deviceType }}) (Name: {{ device.deviceName }})
                        </option>
                    </select>
                </div>


            </div>
        </div>

        <section>
            <div class="card-container">
                <div class="card" v-for="(channel, index) in channelData" :key="index">
                    <div class="card-header"
                        :class="parseInt(channel.hourlyData[0].channelValue) === 0 ? 'btn-red' : 'btn-green'">
                        <div class="channel-status">
                            <strong>{{ parseInt(channel.hourlyData[0].channelValue) === 0 ? 'In-Active' : 'Active'
                                }}</strong>
                        </div>
                    </div>

                    <div class="card-body">
                        <p>{{ channel.channalId }}<strong> :-</strong> {{ channel.gearType }}</p>
                    </div>

                    <div class="card-footer">
                        <div class="channel-time">
                            <strong>Last Updated:- </strong>
                            <span>{{ new Date(channel.hourlyData[0].timestamp).toLocaleString() }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- <section>
            <apexchart type="line" :options="chartOptions" :series="series" class="custom-chart" />
        </section> -->
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
            channelData: [],  // Store channel data here
            chartOptions: {
                chart: {
                    height: 350,
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
                    type: "time",
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
                        return `${hours}:${minutes}:${seconds}`;
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
                        formatter: (value) => value.toFixed(2),
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

                let url = `DeviceData/GetDeviceDetailsByImeiMac?imeiMac=${this.selectedImei}&hutId=${this.selectedHutId}&deviceId=${this.selectedDeviceId}`;
                const response = await ApiGatewayServies.get(url, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });

                const channelData = response.data.channelData;
                this.channelData = channelData; // Store channelData for displaying in cards
                console.log(channelData);
                const seriesData = channelData.map((channel) => ({
                    name: `${channel.channalId}`,
                    data: channel.hourlyData.map(entry => ({
                        x: new Date(entry.timestamp).getTime(),
                        y: parseFloat(entry.channelValue),
                    })),
                }));

                this.series = seriesData;

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
                const token = localStorage.getItem('authToken');
                if (!token) throw new Error('Authentication token is missing.');
                const response = await ApiGatewayServies.get('Master/Imeis', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });
                this.imeiList = response.data;
            } catch (error) {
                console.error('Error fetching IMEI list:', error);
            }
        },

        async onImeiChange() {
            try {
                if (!this.selectedImei) return;

                await this.fetchHutIds();
            } catch (error) {
                console.error('Error handling IMEI change:', error);
            }
        },

        async fetchHutIds() {
            if (!this.selectedImei) return;

            try {
                const token = localStorage.getItem('authToken');
                if (!token) throw new Error('Authentication token is missing.');

                const response = await ApiGatewayServies.get(`DeviceData/HutIds?imei=${this.selectedImei}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });

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

                const response = await ApiGatewayServies.get(`DeviceData/Devices?hutId=${this.selectedHutId}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });

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
    width: 100%;
}

/* Green (Active) Header */
:deep(.btn-green) {
    background-color: rgba(62, 185, 95, 0.1) !important;
    color: #3eb95f !important;
    padding: 10px;
    border-bottom: 1px solid #3eb95f;
}

/* Red (Inactive) Header */
:deep(.btn-red) {
    background-color: rgba(231, 75, 43, 0.1) !important;
    color: #e74b2b !important;
    padding: 10px;
    border-bottom: 1px solid #e74b2b;
}

/* Additional Styling for Card */
.card-container {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    justify-content: space-between;
    margin-top: 20px;
    padding: 0 10px;
}

.card {
    width: calc(25% - 15px);
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    transition: box-shadow 0.3s ease-in-out;
}

.card:hover {
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.card-body {
    padding: 10px;
}

.card-footer {
    background-color: #f9f9f9;
    padding: 10px;
    text-align: center;
    font-size: 14px;
    color: gray;
}


/* Card Body */
.card-body {
    padding: 10px;
}

.card-body ul {
    padding-left: 20px;
}

.card-body li {
    margin-bottom: 5px;
}

/* Responsive Design */
@media (max-width: 768px) {
    .card {
        width: calc(50% - 15px);
        /* 2 cards per row on tablets */
    }
}

@media (max-width: 480px) {
    .card {
        width: calc(100% - 15px);
        /* 1 card per row on mobile devices */
    }
}
</style>
