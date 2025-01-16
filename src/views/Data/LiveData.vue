<template>
    <main style="padding-top:10px;">
        <div class="row">
            <div class="col-12">
                <h2 class="text-center text-primary">Live Data Overview</h2>
            </div>
        </div>
        <div class="row mb-3">
            <label for="imei" class="col-sm-2 col-form-label">IMEI</label>
            <div class="col-sm-10">
                <select v-model="selectedImei" id="imei" class="form-select" style="width:auto;">
                    <option v-for="imei in imeiList" :key="imei" :value="imei">{{ imei }}</option>
                </select>
            </div>
        </div>
        <table class="table table-striped">
            <thead>
                <tr>
                    <th>IMEI/MAC</th>
                    <th>Device Type</th>
                    <th>Hut ID</th>
                    <th>Device ID</th>
                    <th>Channel ID</th>
                    <th>Gear Type</th>
                    <th>Timestamp</th>
                    <th>Value</th>
                    <th>Range 1</th>
                    <th>Range 2</th>
                    <th>Status</th>
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
                    <!-- <td>{{ item.gearType?.channelValueRange1 || 'N/A' }}</td>
                    <td>{{ item.gearType?.channelValueRange2 || 'N/A' }}</td>
                    <td>{{ item.gearType?.channelUnit || 'N/A' }}</td> -->
                </tr>
            </tbody>
        </table>

        <!-- Message when no data is available -->
        <div v-if="!loading" class="no-data">No data available for the selected IMEI.</div>

    </main>
</template>