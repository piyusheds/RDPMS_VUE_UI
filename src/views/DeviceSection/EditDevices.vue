<template>
    <main>
        <div class="container mt-4">
            <b-card class="shadow-lg rounded p-4 border-0 bg-light">
                <h4 class="mb-4">Master and Station Details</h4>
                <div class="row g-3 mb-4">
                    <div class="col-md-4">
                        <b-form-group label="Select Master Type:" label-for="master-type">
                            <b-form-select v-model="selectedMaster" :options="masterOptions" id="master-type"
                                class="form-control " required>
                            </b-form-select>
                        </b-form-group>
                    </div>
                    <div class="col-md-4">
                        <b-form-group :label="`Enter ${selectedMaster}:`" :label-for="master - input">
                            <b-form-input v-model="masterInput" id="master-input"
                                :placeholder="`Enter ${selectedMaster}`" class="form-control " required>
                            </b-form-input>
                        </b-form-group>
                    </div>
                    <div class="col-md-4">
                        <b-form-group label="Station Name:" label-for="station-name">
                            <b-form-input id="station-name" v-model="name" placeholder="Enter Station Name"
                                class="form-control ">
                            </b-form-input>
                        </b-form-group>
                    </div>
                </div>

                <!-- Second Row: Station Code, Location -->
                <div class="row g-3">
                    <div class="col-md-6">
                        <b-form-group label="Station Code:" label-for="station-code">
                            <b-form-input id="station-code" v-model="stationCode" placeholder="Enter Station Code"
                                class="form-control ">
                            </b-form-input>
                        </b-form-group>
                    </div>
                    <div class="col-md-6">
                        <b-form-group label="Location:" label-for="location">
                            <b-form-input id="location" v-model="location" placeholder="Enter Location"
                                class="form-control ">
                            </b-form-input>
                        </b-form-group>
                    </div>
                </div>
            </b-card>
        </div>


        <b-card class="mt-3 shadow-lg rounded p-4 border-0 bg-light" style="margin: 0px 12px;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <h4 class="mb-3">HUT Configuration</h4>
                <b-button @click="addHut" size="sm">Add More HUT</b-button>
            </div>
            <ul class="tree">
                <li v-for="(hut, index) in huts" :key="hut.hutId">
                    <div class="div_styling">
                        <b>{{ hut.name }}</b>
                        <div>
                            <b-button @click="deleteHut(index)" variant="danger" size="sm"
                                style="margin-left: 15px;">Delete</b-button>
                            <b-button @click="toggleHutDetails(index)" variant="primary" size="sm"
                                style="margin-left: 15px;">Toggle Details</b-button>
                        </div>
                    </div>

                    <div v-show="hut.showDetails" class="hut-details">
<<<<<<< HEAD
=======
                        <b-form-group label="HUT ID:" class="mb-3 ml-3">
                            <b-form-input v-model="customHutId" placeholder="Enter HUT"
                                style="width: 22%;"></b-form-input>
                        </b-form-group>
>>>>>>> e0ad36401195423255db1e02af8817fe8efaedae
                        <div v-for="(device, deviceIndex) in hut.devices" :key="deviceIndex" class="DeviceName_div">
                            <b-form-group label="HUT ID:" class="mb-3 ml-3">
                                <b-form-input v-model="device.hutId" placeholder="Enter HUT"
                                    style="width: 22%;"></b-form-input>
                            </b-form-group>
                            <input v-model="device.name" placeholder="Device Name" />
                            <b-form-select v-model="device.devicetype" :options="DeviceType"
                                id="Device_Type_DDL"></b-form-select>
                            <input v-model="device.deviceid" placeholder="Enter Device Id" style="margin-left: 7px;" />

                            <b-button v-if="deviceIndex === 0" @click="addDeviceRow(hut.hutId)"
                                variant="outline-success" size="sm" style="margin-left: 7px;">
                                Add Device
                            </b-button>

                            <b-button @click="removeDeviceRow(hut.hutId, deviceIndex)" variant="outline-danger"
                                size="sm" style="margin-left: 7px;"> Remove </b-button>
                        </div>

                        <ul :id="hut.hutId">
                            <li v-for="(device, index) in hut.devices" :key="index">
                                <div class="d-flex align-items-center li_div"
                                    style="width: 70%; justify-content: space-between;">
                                    <div style="flex: 1;">
                                        <b><strong>{{ device.devicetype }}</strong></b>
                                    </div>
                                    <div style="display: flex; justify-content: flex-end;">
                                        <b-button @click="toggleDeviceDetails(hut.hutId, index)" size="sm"
                                            variant="outline-primary" style="margin-right: 8px;">
                                            {{ device.detailsVisible ? 'Hide' : 'Show' }}
                                            <b-icon
                                                :icon="device.detailsVisible ? 'chevron-down' : 'chevron-right'"></b-icon>
                                        </b-button>
                                        <b-button @click="removeDevice(hut.hutId, index)" size="sm"
                                            variant="outline-danger">
                                            Remove
                                        </b-button>
                                    </div>
                                </div>


                                <div v-show="device.detailsVisible" class="device-details-content">
                                    <p><strong>Device ID:</strong> {{ device.deviceid }}</p>
                                    <p><strong>Device Name:</strong> {{ device.name }}</p>

                                    <div v-if="device.devicetype === 'AC Voltage'" class="ac-voltage-content">
                                        <div class="d-flex align-items-center"
                                            v-for="(deviceData, index) in device.devices" :key="'ac-voltage-' + index">
                                            <b-form-group :label="'Channels'" class="mb-3 mr-3 padding_bottom">
                                                <b-form-group :label="'CH-' + (index + 1)"
                                                    class="mb-3 mr-3"></b-form-group>
                                            </b-form-group>

                                            <b-form-group :label="'Gear Type'" class="mb-3 mr-3"
                                                style="margin-left:25px;">
                                                <b-form-select
                                                    v-model="deviceData['acVoltageGears' + device.hutId + device.deviceid + (index + 1)]"
                                                    :options="gearOptions"
                                                    :id="'ac-voltage-gears-' + (index + 1)"></b-form-select>

                                            </b-form-group>

                                            <b-form-group label="Value Range" class="mb-3 ml-3 div_margin_left"
                                                style="width: 21.5%;">
                                                <div class="d-flex align-items-center">
                                                    <b-form-input
                                                        v-model="deviceData['acVoltageValueRange' + device.hutId + device.deviceid + (index + 1) + 'Min']"
                                                        placeholder="Min"
                                                        :id="'ac-voltage-value-range-' + (index + 1) + '-min'"
                                                        style="width: 40%; margin-right: 4%;"></b-form-input>
                                                    <span style="margin: 0 8px;">-</span>
                                                    <b-form-input
                                                        v-model="deviceData['acVoltageValueRange' + device.hutId + device.deviceid + (index + 1) + 'Max']"
                                                        placeholder="Max"
                                                        :id="'ac-voltage-value-range-' + (index + 1) + '-max'"
                                                        style="width: 40%;"></b-form-input>
                                                </div>
                                            </b-form-group>

                                            <b-form-group label="Parameter Name:" class="mb-3 div_margin_left">
                                                <b-form-input
                                                    v-model="deviceData['acVoltageChannelsParameter' + device.hutId + device.deviceid + (index + 1)]"
                                                    placeholder="Enter Parameter"
                                                    :id="'ac-voltage-input-' + (index + 1)"></b-form-input>
                                            </b-form-group>
                                        </div>
                                    </div>


                                    <!-- 
                                    <div v-if="device.devicetypeee === 'AC Voltage'" class="ac-voltage-content">
                                        <div class="d-flex align-items-center" v-for="(deviceData, index) in 2"
                                            :key="'ac-voltage-' + index">
                                            <b-form-group :label="'Channels'" class="mb-3 mr-3 padding_bottom">
                                                <b-form-group :label="'CH-' + (index + 1)"
                                                    class="mb-3 mr-3"></b-form-group>
                                            </b-form-group>

                                            <b-form-group :label="'Gear Type'" class="mb-3 mr-3"
                                                style="margin-left:25px;">
                                                <b-form-select
                                                    v-model="deviceData['acVoltageGears' + device.hutId + device.deviceid + (index + 1)]"
                                                    :options="gearOptions"
                                                    :id="'ac-voltage-gears-' + (index + 1)"></b-form-select>

                                            </b-form-group>

                                            <b-form-group label="Value Range" class="mb-3 ml-3 div_margin_left"
                                                style="width: 21.5%;">
                                                <div class="d-flex align-items-center">
                                                    <b-form-input
                                                        v-model="deviceData['acVoltageValueRange' + device.hutId + device.deviceid + (index + 1) + 'Min']"
                                                        placeholder="Min"
                                                        :id="'ac-voltage-value-range-' + (index + 1) + '-min'"
                                                        style="width: 40%; margin-right: 4%;"></b-form-input>
                                                    <span style="margin: 0 8px;">-</span>
                                                    <b-form-input
                                                        v-model="deviceData['acVoltageValueRange' + device.hutId + device.deviceid + (index + 1) + 'Max']"
                                                        placeholder="Max"
                                                        :id="'ac-voltage-value-range-' + (index + 1) + '-max'"
                                                        style="width: 40%;"></b-form-input>
                                                </div>
                                            </b-form-group>

                                            <b-form-group label="Parameter Name:" class="mb-3 div_margin_left">
                                                <b-form-input
                                                    v-model="deviceData['acVoltageChannelsParameter' + device.hutId + device.deviceid + (index + 1)]"
                                                    placeholder="Enter Parameter"
                                                    :id="'ac-voltage-input-' + (index + 1)"></b-form-input>
                                            </b-form-group>
                                        </div>
                                    </div> -->


                                    <!-- <pre>{{ device }}</pre> -->

                                    <div v-if="device.devicetype === 'AC Current'" class="ac-current-content">
                                        <div class="d-flex align-items-center"
                                            v-for="(deviceData, index) in device.devices" :key="'ac-current-' + index">
                                            <b-form-group :label="'Channels'" class="mb-3 mr-3 padding_bottom">
                                                <b-form-group :label="'CH-' + (index + 1)"
                                                    class="mb-3 mr-3"></b-form-group>
                                            </b-form-group>

                                            <b-form-group :label="'Gear Type'" class="mb-3 mr-3"
                                                style="margin-left:25px;">
                                                <b-form-select
                                                    v-model="deviceData['acCurrentGears' + device.hutId + device.deviceid + (index + 1)]"
                                                    :options="gearOptions"
                                                    :id="'ac-current-gears-' + (index + 1)"></b-form-select>
                                            </b-form-group>

                                            <b-form-group label="Value Range" class="mb-3 ml-3 div_margin_left"
                                                style="width: 21.5%;">
                                                <div class="d-flex align-items-center">
                                                    <b-form-input
                                                        v-model="deviceData['acCurrentValueRange' + device.hutId + device.deviceid + (index + 1) + 'Min']"
                                                        placeholder="Min"
                                                        :id="'ac-current-value-range-' + (index + 1) + '-min'"
                                                        style="width: 40%; margin-right: 4%;"></b-form-input>
                                                    <span style="margin: 0 8px;">-</span>
                                                    <b-form-input
                                                        v-model="deviceData['acCurrentValueRange' + device.hutId + device.deviceid + (index + 1) + 'Max']"
                                                        placeholder="Max"
                                                        :id="'ac-current-value-range-' + (index + 1) + '-max'"
                                                        style="width: 40%;"></b-form-input>
                                                </div>
                                            </b-form-group>

                                            <b-form-group label="Parameter Name:" class="mb-3 div_margin_left">
                                                <b-form-input
                                                    v-model="deviceData['acCurrentChannelsParameter' + device.hutId + device.deviceid + (index + 1)]"
                                                    placeholder="Enter Parameter"
                                                    :id="'ac-current-input-' + (index + 1)"></b-form-input>
                                            </b-form-group>
                                        </div>
                                    </div>

                                    <div v-if="device.devicetype === 'DC Voltage'" class="dc-voltage-content">
                                        <div class="d-flex align-items-center"
                                            v-for="(deviceData, index) in device.devices" :key="'dc-voltage-' + index">
                                            <b-form-group :label="'Channels'" class="mb-3 mr-3 padding_bottom">
                                                <b-form-group :label="'CH-' + (index + 1)"
                                                    class="mb-3 mr-3"></b-form-group>
                                            </b-form-group>

                                            <b-form-group :label="'Gear Type'" class="mb-3 mr-3"
                                                style="margin-left:25px;">
                                                <b-form-select
                                                    v-model="deviceData['dcVoltageGears' + device.hutId + device.deviceid + (index + 1)]"
                                                    :options="gearOptions"
                                                    :id="'dc-voltage-gears-' + (index + 1)"></b-form-select>
                                            </b-form-group>

                                            <b-form-group label="Value Range" class="mb-3 ml-3 div_margin_left"
                                                style="width: 21.5%;">
                                                <div class="d-flex align-items-center">
                                                    <b-form-input
                                                        v-model="deviceData['dcVoltageValueRange' + device.hutId + device.deviceid + (index + 1) + 'Min']"
                                                        placeholder="Min"
                                                        :id="'dc-voltage-value-range-' + (index + 1) + '-min'"
                                                        style="width: 40%; margin-right: 4%;"></b-form-input>
                                                    <span style="margin: 0 8px;">-</span>
                                                    <b-form-input
                                                        v-model="deviceData['dcVoltageValueRange' + device.hutId + device.deviceid + (index + 1) + 'Max']"
                                                        placeholder="Max"
                                                        :id="'dc-voltage-value-range-' + (index + 1) + '-max'"
                                                        style="width: 40%;"></b-form-input>
                                                </div>
                                            </b-form-group>

                                            <b-form-group label="Parameter Name:" class="mb-3 div_margin_left">
                                                <b-form-input
                                                    v-model="deviceData['dcVoltageChannelsParameter' + device.hutId + device.deviceid + (index + 1)]"
                                                    placeholder="Enter Parameter"
                                                    :id="'dc-voltage-input-' + (index + 1)"></b-form-input>
                                            </b-form-group>
                                        </div>
                                    </div>

                                    <div v-if="device.devicetype === 'DC Current'" class="dc-current-content">
                                        <div v-for="(deviceData, index) in device.devices" :key="'dc-current-' + index"
                                            class="d-flex align-items-center">
                                            <b-form-group :label="'Channels'" class="mb-3 mr-3 padding_bottom">
                                                <b-form-group :label="'CH-' + (index + 1)"
                                                    class="mb-3 mr-3"></b-form-group>
                                            </b-form-group>

                                            <b-form-group :label="'Gear Type'" class="mb-3 mr-3"
                                                style="margin-left:25px;">
                                                <b-form-select
                                                    v-model="deviceData['dcCurrentGears' + device.hutId + device.deviceid + (index + 1)]"
                                                    :options="gearOptions"
                                                    :id="'dc-current-gears-' + (index + 1)"></b-form-select>
                                            </b-form-group>

                                            <b-form-group label="Value Range" class="mb-3 ml-3 div_margin_left"
                                                style="width: 21.5%;">
                                                <div class="d-flex align-items-center">
                                                    <b-form-input
                                                        v-model="deviceData['dcCurrentValueRange' + device.hutId + device.deviceid + (index + 1) + 'Min']"
                                                        placeholder="Min" style="width: 40%; margin-right: 4%;"
                                                        :id="'dc-range-input1-' + (index + 1)"></b-form-input>
                                                    <span style="margin: 0 8px;">-</span>
                                                    <b-form-input
                                                        v-model="deviceData['dcCurrentValueRange' + device.hutId + device.deviceid + (index + 1) + 'Max']"
                                                        placeholder="Max" style="width: 40%;"
                                                        :id="'dc-range-input2-' + (index + 1)"></b-form-input>
                                                </div>
                                            </b-form-group>

                                            <b-form-group label="Parameter Name:" class="mb-3 div_margin_left">
                                                <b-form-input
                                                    v-model="deviceData['dcCurrentChannelsParameter' + device.hutId + device.deviceid + (index + 1)]"
                                                    placeholder="Enter Parameter"
                                                    :id="'dc-current-input-' + (index + 1)"></b-form-input>
                                            </b-form-group>
                                        </div>
                                    </div>


                                    <div v-if="device.devicetype === 'Digital Input'" class="digital-input-content">
                                        <div v-for="(deviceData, index) in device.devices"
                                            :key="'digital-input-' + index" class="d-flex align-items-center mb-3">
                                            <b-form-group :label="'Channels'" class="mb-3 mr-3 padding_bottom"
                                                style="padding-bottom:0px !important;">
                                                <b-form-group :label="'Input Option (' + (index + 1) + '):'"
                                                    class="mb-3 mr-3"></b-form-group>
                                            </b-form-group>

                                            <b-form-group :label="'Gear Type'" class="mb-3 mr-3"
                                                style="margin-left:25px;">
                                                <b-form-select
                                                    v-model="deviceData['digitalInputGears' + device.hutId + device.deviceid + (index + 1)]"
                                                    :options="gearOptions"
                                                    :id="'dig-ip-gears-' + (index + 1)"></b-form-select>
                                            </b-form-group>

                                            <b-form-group label="Parameter Name:" class="mb-3 div_margin_left">
                                                <b-form-input
                                                    v-model="deviceData['digitalInputParam' + device.hutId + device.deviceid + (index + 1)]"
                                                    placeholder="Enter Parameter"
                                                    :id="'dig-ip-input-' + (index + 1)"></b-form-input>
                                            </b-form-group>

                                            <b-form-group label="Channel Value:" class="mb-3 ml-3 div_margin_left">
                                                <b-form-select
                                                    v-model="deviceData['digitalInputValue' + device.hutId + device.deviceid + (index + 1)]"
                                                    :options="ChannelValueOptions"
                                                    :id="'dig-ip-value-' + (index + 1)"></b-form-select>
                                            </b-form-group>
                                        </div>
                                    </div>

                                    <!-- </div> -->
                                </div>
                            </li>
                        </ul>
                    </div>
                </li>
                <b-button variant="primary" @click="saveHutData">Update Hut</b-button>
                <p><strong>Custom HUT ID:</strong> {{ customHutId }}</p>
                <pre>{{ jsonData }}</pre>
            </ul>
        </b-card>


    </main>
</template>



<script>
import { useToast } from 'vue-toast-notification';
import ApiGatewayServies from '../../Services/ApiGatewayServies';
export default {

    data() {
        return {
            acVoltageVisible: false,
            isAcCurrentVisible: false,
            isDcVoltVisible: false,
            isDcCurrentVisible: false,
            isDigIpVisible: false,

            deviceNames: [
                { name: '', devicetype: '', parameter: '' } // Initial row for devices
            ],

            huts: [],

            gearOptions: [
                { value: '', text: "Select Gears" },
                "Signals", "Points", "DC Track Circuits", "Axle Counters", "AF Track Circuits",
                "Level Crossing Gates", "Relays", "Electronic Interlocking", "Integrated Power Supply (IPS) / Battery Charger", "Earth Leakage Detector (ELD)", "Cables", "Block Instruments", "UFSBI",
                "Ambient Temperature and Humidity"
            ],

            ChannelValueOptions: [
                { value: '', text: "Select Channel Value" },
                { value: true, text: "Active" },
                { value: false, text: "In Active" },
            ],

            // Master options for device types like IMEI, MAC, etc.
            masterOptions: [
                { value: '', text: "Select Master Type" },
                { value: "IMEI", text: "IMEI" },
                { value: "MAC", text: "MAC" },
            ],

            selectedMaster: '',
            masterInput: '',
            customHutId: '',

            // Location and station info
            stationCode: '',
            location: '',
            name: '',

            // Raw data (change name to reflect the purpose)
            jsonData: '',

            // Device types available
            DeviceType: [
                { value: '', text: "Select Device Type" },
                { value: 'AC Voltage', text: "AC Voltage" },
                { value: 'AC Current', text: "AC Current" },
                { value: 'DC Voltage', text: "DC Voltage" },
                { value: 'DC Current', text: "DC Current" },
                { value: 'Digital Input', text: "Digital Input" }
            ],

            updateDeviceChannels(device) {
                let channelCount = 0;

                if (["AC Voltage", "DC Voltage"].includes(device.devicetype)) {
                    channelCount = 2; // 2 rows for AC Voltage & DC Voltage
                } else if (["AC Current", "DC Current"].includes(device.devicetype)) {
                    channelCount = 6; // 6 rows for AC Current & DC Current
                } else if (device.devicetype === "Digital Input") {
                    channelCount = 16; // 16 rows for Digital Input
                }

                device.devices = Array.from({ length: channelCount }, (_, index) => ({
                    gearType: "",
                    minValue: "",
                    maxValue: "",
                    parameterName: "",
                    [`${device.devicetype.replace(" ", "")}Gears${device.hutId}${device.deviceid}${index + 1}`]: "",
                    [`${device.devicetype.replace(" ", "")}Param${device.hutId}${device.deviceid}${index + 1}`]: "",
                    [`${device.devicetype.replace(" ", "")}Value${device.hutId}${device.deviceid}${index + 1}`]: ""
                }));
            },
        };
    },
    name: 'EditDevices',

    watch: {
        "hut.devices": {
            handler(newDevices) {
                if (newDevices.length > 0) {
                    this.customHutId = newDevices[0].hutId;
                } else {
                    this.customHutId = '';
                }
            },
            deep: true
        }
    },


    methods: {

        addHut() {
            const newHutId = this.huts.length + 1;
            this.huts.push({
                hutId: newHutId,
                name: `Hut ${newHutId}`,
                param: "",
                devices: [{
                    name: '',
                    devicetype: '',
                    deviceId: '',
                    detailsVisible: false,
                    channels: []
                },],
                showDetails: false,
            });
        },

        async editItemAndNavigate() {
            try {
                const imeiMac = this.$route.query.imeiMac;

                if (!imeiMac) {
                    console.error("imeiMac not provided in query params.");
                    return;
                }

                // Fetch data from the API
                const response = await ApiGatewayServies.get(`Master/${imeiMac}`);
                console.log("Fetched data for editing:", response.data);

                if (response.data) {
                    const data = response.data;
                    const hutconfig = data.hutconfig;
                    // Map master details
                    this.selectedMaster = data.masterdto?.masterDetails?.masterType || "";
                    this.masterInput = data.masterdto?.masterDetails?.imeimac || "";
                    this.name = data.masterdto?.masterDetails?.stationName || "";
                    this.stationCode = data.masterdto?.masterDetails?.stationCode || "";
                    this.location = data.masterdto?.masterDetails?.location || "";

                    // Initialize the hut object
                    const hut = {
                        hutId: data.masterdto?.hutDetails?.hutId || 1, // Use actual hutId from response if available
                        name: data.masterdto?.hutDetails?.hutName || "Hut 1",
                        param: "",
                        devices: [],
                        showDetails: false,
                    };

                    // Extract devices from response data
                    const devicesData = hutconfig; // Assuming `devices` contains the array of device data

                    // Function to map device attributes based on the device type and channel count
                    const mapDeviceAttributes = (device, tableName, channelCount) => {
                        let mappedDevice = {
                            deviceid: device.deviceId,
                            parameter: "",
                            detailsVisible: false,
                        };

                        // Append specific details for device types
                        switch (tableName) {
                            case "AC Voltage":
                                for (let n = 1; n <= channelCount; n++) {
                                    // Mapping specific attributes for AC Voltage
                                    mappedDevice[`acVoltageGears${device.hutId}${device.deviceId}${n}`] = device.gearType || "";
                                    mappedDevice[`acVoltageValueRange${device.hutId}${device.deviceId}${n}Min`] = device.channelValueRange1 || null;
                                    mappedDevice[`acVoltageValueRange${device.hutId}${device.deviceId}${n}Max`] = device.channelValueRange2 || null;
                                    mappedDevice[`acVoltageChannelsParameter${device.hutId}${device.deviceId}${n}`] = device.channelsParameter || "";
                                }
                                break;

                            case "DC Voltage":
                                for (let n = 1; n <= channelCount; n++) {
                                    // Mapping specific attributes for DC Voltage
                                    mappedDevice[`dcVoltageGears${device.hutId}${device.deviceId}${n}`] = device.gearType || "";
                                    mappedDevice[`dcVoltageValueRange${device.hutId}${device.deviceId}${n}Min`] = device.channelValueRange1 || null;
                                    mappedDevice[`dcVoltageValueRange${device.hutId}${device.deviceId}${n}Max`] = device.channelValueRange2 || null;
                                    mappedDevice[`dcVoltageChannelsParameter${device.hutId}${device.deviceId}${n}`] = device.channelsParameter || "";
                                }
                                break;

                            case "AC Current":
                                for (let n = 1; n <= channelCount; n++) {
                                    // Mapping specific attributes for AC Current
                                    mappedDevice[`acCurrentGears${device.hutId}${device.deviceId}${n}`] = device.gearType || "";
                                    mappedDevice[`acCurrentValueRange${device.hutId}${device.deviceId}${n}Min`] = device.channelValueRange1 || null;
                                    mappedDevice[`acCurrentValueRange${device.hutId}${device.deviceId}${n}Max`] = device.channelValueRange2 || null;
                                    mappedDevice[`acCurrentChannelsParameter${device.hutId}${device.deviceId}${n}`] = device.channelsParameter || "";
                                }
                                break;

                            case "DC Current":
                                for (let n = 1; n <= channelCount; n++) {
                                    // Mapping specific attributes for DC Current
                                    mappedDevice[`dcCurrentGears${device.hutId}${device.deviceId}${n}`] = device.gearType || "";
                                    mappedDevice[`dcCurrentValueRange${device.hutId}${device.deviceId}${n}Min`] = device.channelValueRange1 || null;
                                    mappedDevice[`dcCurrentValueRange${device.hutId}${device.deviceId}${n}Max`] = device.channelValueRange2 || null;
                                    mappedDevice[`dcCurrentChannelsParameter${device.hutId}${device.deviceId}${n}`] = device.channelsParameter || "";
                                }
                                break;

                            case "Digital Input":
                                for (let n = 1; n <= 16; n++) {  // Assuming the number of channels is 16 as in the given code
                                    // Mapping specific attributes for Digital Input with the updated structure
                                    mappedDevice[`digitalInputGears${device.hutId}${device.deviceId}${n}`] = device.gearType || "";
                                    mappedDevice[`digitalInputParam${device.hutId}${device.deviceId}${n}`] = device.channelsParameter || "";
                                    mappedDevice[`digitalInputValue${device.hutId}${device.deviceId}${n}`] = device.channelValue ? true : false;
                                }
                                break;

                            default:
                                // Handle any other device types if needed
                                break;
                        }

                        return mappedDevice;
                    };


                    // Example device tables (adjust to match the structure in `response.data`)
                    const deviceTableConfigs = [
                        { name: "AC Voltage", key: "acVoltageTable", channels: 2 },
                        { name: "DC Voltage", key: "dcVoltageTable", channels: 2 },
                        { name: "AC Current", key: "acCurrentTable", channels: 6 },
                        { name: "DC Current", key: "dcCurrentTable", channels: 6 },
                        { name: "Digital Input", key: "digitalInputTable", channels: 16 }
                    ];

                    const deviceTables = deviceTableConfigs.map(config => {
                        const channelData = Array.from({ length: config.channels }, (_, channelIndex) => {
                            const filteredData = devicesData
                                .filter(d => d[config.key] && d[config.key][channelIndex])
                                .map(d => d[config.key][channelIndex]); // Extract only the channel data, not the whole device object

                            // console.log(`Data for ${config.name} - Channel ${channelIndex + 1}:`, filteredData);
                            return filteredData;
                        });

                        return {
                            name: config.name,
                            data: channelData,
                            channels: config.channels
                        };
                    });

                    console.log("Final device tables:", deviceTables);

                    // console.log("Device Tables:", deviceTables);

                    // Iterate over each device table and process the data
                    deviceTables.forEach((table) => {
                        // Ensure that table.data is an array
                        if (table.data && Array.isArray(table.data)) {
                            table.data.forEach((deviceData, channelIndex) => {
                                // Assuming deviceData is an array containing devices for that channel
                                deviceData.forEach((device) => {
                                    // Creating a device group with its name, type, and ID
                                    const deviceGroup = {
                                        name: device.deviceName, // Assuming device has a 'deviceName' property
                                        devicetype: table.name,  // Device type based on table name (AC Voltage, DC Voltage, etc.)
                                        deviceid: device.deviceId, // Assuming device has a 'deviceId' property
                                        hutId: device.hutId,
                                        devices: []
                                    };

                                    // Map device attributes based on device type and channel count
                                    const mappedDevice = mapDeviceAttributes(device, table.name, table.channels);

                                    // Add the mapped device to the device group
                                    deviceGroup.devices.push(mappedDevice);

                                    // Check if device already exists in the hut's devices array
                                    const existingDeviceGroup = hut.devices.find(d => d.deviceid === device.deviceId);

                                    if (existingDeviceGroup) {
                                        // Update the existing device by adding the mapped device to its devices array
                                        existingDeviceGroup.devices.push(mappedDevice);
                                    } else {
                                        // If the device doesn't exist, add a new device group to the hut's devices list
                                        hut.devices.push(deviceGroup);
                                    }
                                });
                            });
                        }
                    });


                    // Assign the updated hut data to the component state
                    this.huts = [hut]; // Reassign the updated hut object to this.huts

                    console.log("Updated component state:", {
                        selectedMaster: this.selectedMaster,
                        masterInput: this.masterInput,
                        name: this.name,
                        stationCode: this.stationCode,
                        location: this.location,
                        huts: this.huts,
                    });

                } else {
                    console.error("No data found for the selected item.");
                }
            } catch (error) {
                console.error("Error editing item:", error);
            }
<<<<<<< HEAD
        },
=======
        }

        ,
>>>>>>> e0ad36401195423255db1e02af8817fe8efaedae


        async saveHutData() {
            this.loading = true;
            const toast = useToast();

            const dataToSend = {
                masterDetails: {
                    sno: 0,
                    masterType: this.selectedMaster || "defaultType",
                    imeiMac: this.masterInput || "defaultImeiMac",
                    stationCode: this.stationCode || "defaultStationCode",
                    stationName: this.name || "defaultName",
                    location: this.location || "defaultLocation",
                },
                hutConfiguration: this.huts.flatMap((hut) =>
                    hut.devices.map((device) => ({
                        sno: 0,
                        imeiMac: this.masterInput,
                        hutId: device.hutId,           // Reference the hut's param
                        deviceType: device.devicetype,  // Access device's devicetype
                        deviceName: device.name,    // Access device's name
                        deviceId: device.deviceid,  // Access device's deviceid
                    }))
                ),
                digitalInputTable: [],
                dcVoltageTables: [],
                dcCurrentTable: [],
                acVoltageTable: [],
                acCurrentTable: [],
            };

            this.huts.forEach((hut) => {
<<<<<<< HEAD
                hut.devices.forEach((device, index) => {
                    console.log("Device Type:", device.devicetype);
                    if (device.devicetype === "AC Voltage" && Array.isArray(device.devices)) {
                        device.devices.forEach((deviceData) => {
                            for (let n = 1; n <= 2; n++) {
                                const channelData = {
                                    sno: 0,
                                    imeiMac: this.masterInput,
                                    hutId: device.hutId,
                                    deviceId: device.deviceid,
                                    deviceName: device.name,
                                    channels: `CH${n}`,
                                    gearType: deviceData[`acVoltageGears${device.hutId}${device.deviceid}${n}`] || "N/A", // Default value if not set
                                    channelValueRange1: deviceData[`acVoltageValueRange${device.hutId}${device.deviceid}${n}Min`] || null, // Min value
                                    channelValueRange2: deviceData[`acVoltageValueRange${device.hutId}${device.deviceid}${n}Max`] || null, // Max value
                                    channelUnit: "V", // Voltage unit
                                    channelsParameter: deviceData[`acVoltageChannelsParameter${device.hutId}${device.deviceid}${n}`] || "", // Input parameter
                                };
=======
                hut.devices.forEach((device, deviceData, index) => {
                    console.log("Device Type:", device.devicetype);
                    if (device.devicetype === "AC Voltage") {
                        for (let n = 1; n <= 2; n++) {
                            const channelData = {
                                sno: 0,
                                imeiMac: this.masterInput,
                                hutId: hut.param,
                                deviceId: device.deviceid,
                                deviceName: device.name,
                                channels: `CH${n}`,
                                gearType: deviceData[`acVoltageGears${device.hutId}${device.deviceId}${n}`],  // Default value if not set
                                channelValueRange1: deviceData[`acVoltageValueRange${device.hutId}${device.deviceId}${n}Min`] || null,  // Min value
                                channelValueRange2: deviceData[`acVoltageValueRange${device.hutId}${device.deviceId}${n}Max`] || null,  // Max value
                                channelUnit: "V",  // Voltage unit
                                channelsParameter: deviceData[`acVoltageChannelsParameter${device.hutId}${device.deviceId}${n}`] || "",  // Input parameter
                            };
>>>>>>> e0ad36401195423255db1e02af8817fe8efaedae

                                // Append to acVoltageTable
                                dataToSend.acVoltageTable.push(channelData);
                            }
                        });
                    }
                    // });

                    else if (device.devicetype === "DC Voltage") {
                        const channelData = [];

                        for (let n = 1; n <= 2; n++) {
                            const channel = {
                                channelNumber: String(n),
                                gearType: deviceData[`dcVoltageGears${device.hutId}${device.deviceId}${n}`],
                                channelValueRange1: deviceData[`dcVoltageValueRange${device.hutId}${device.deviceId}${n}Min`],
                                channelValueRange2: deviceData[`dcVoltageValueRange${device.hutId}${device.deviceId}${n}Max`],
                                channelUnit: "V",
                                channelsParameter: deviceData[`dcVoltageChannelsParameter${device.hutId}${device.deviceId}${n}`],
                                // parameterName: device[`dcVoltageInput${n}`],
                            };

                            channelData.push(channel);
                        }

                        channelData.forEach(channel => {
                            dataToSend.dcVoltageTables.push({
                                sno: 0,
                                imeiMac: this.masterInput,
                                hutId: hut.param,
                                deviceId: device.deviceid,
                                deviceName: device.name,
                                channels: channel.channelNumber,
                                gearType: channel.gearType,
                                channelsParameter: channel.channelsParameter,
                                channelValueRange1: channel.channelValueRange1,
                                channelValueRange2: channel.channelValueRange2,
                                channelUnit: channel.channelUnit,
                                parameterName: channel.parameterName,
                            });
                        });
                    }
                    else if (device.devicetype === "DC Current") {
                        for (let n = 1; n <= 6; n++) {
                            const channelData = {
                                sno: 0,
                                imeiMac: this.masterInput,
                                hutId: hut.param,
                                deviceId: device.deviceid,
                                deviceName: device.name,
                                channels: `CH${n}`,
                                gearType: deviceData[`dcCurrentGears${device.hutId}${device.deviceId}${n}`],
                                channelValueRange1: deviceData[`dcCurrentValueRange${device.hutId}${device.deviceId}${n}Min`] || null,
                                channelValueRange2: deviceData[`dcCurrentValueRange${device.hutId}${device.deviceId}${n}Max`] || null,
                                channelUnit: "A",
                                channelsParameter: deviceData[`dcCurrentChannelsParameter${device.hutId}${device.deviceId}${n}`] || "",
                            };

                            dataToSend.dcCurrentTable.push(channelData);
                        }
                    }

                    else if (device.devicetype === "AC Current") {
                        for (let n = 1; n <= 6; n++) {
                            // Create a separate object for each channe
                            const channelData = {
                                sno: 0,
                                imeiMac: this.masterInput,
                                hutId: hut.param,
                                deviceId: device.deviceid,
                                deviceName: device.name,
                                channels: `CH${n}`,
                                gearType: deviceData[`acCurrentGears${device.hutId}${device.deviceId}${n}`],
                                channelValueRange1: deviceData[`acCurrentValueRange${device.hutId}${device.deviceId}${n}Min`] || null,
                                channelValueRange2: deviceData[`acCurrentValueRange${device.hutId}${device.deviceId}${n}Max`] || null,
                                channelUnit: "A",
                                channelsParameter: deviceData[`acCurrentChannelsParameter${device.hutId}${device.deviceId}${n}`] || "",
                            };

                            dataToSend.acCurrentTable.push(channelData);
                        }
                    }
                    else if (device.devicetype === "Digital Input") {
                        for (let n = 1; n <= 16; n++) {
                            const channelData = {
                                sno: 0,
                                imeiMac: this.masterInput,
                                hutId: hut.param,
                                deviceId: device.deviceid,
                                deviceName: device.name,
                                channels: `CH${n}`, // Convert channel number to string
                                gearType: deviceData[`digitalInputGears${device.hutId}${device.deviceId}${n}`],
                                channelsParameter: deviceData[`digitalInputParam${device.hutId}${device.deviceId}${n}`],
                                channelValue: deviceData[`digitalInputValue${device.hutId}${device.deviceId}${n}`] !== '' ? device[`digitalInputValue${device.hutId}${device.deviceId}${n}`] : null, // Send as true/false/null
                            };

                            // Push each channel as a separate object
                            dataToSend.digitalInputTable.push(channelData);
                        }
                    }
                });
            });

            console.log(dataToSend);

            try {
                // Retrieve token from localStorage
                const token = localStorage.getItem('authToken');

                // Make sure token is present before proceeding
                if (!token) {
                    throw new Error('Authentication token is missing.');
                }

                // Add token to the request headers
                const response = await ApiGatewayServies.put('Master', dataToSend, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`, // Attach token here
                    },
                });

                toast.success(response.data || 'HUT Data submitted successfully!');
                // Optionally reset form here if needed
                this.resetForm();
            } catch (error) {
                console.error('Error:', error);
                toast.error(error.response?.data || 'An unexpected error occurred while saving HUT data.');
            } finally {
                this.loading = false;
            }
        },


        // deleteHut(index) {
        //     this.huts.splice(index, 1);
        // },
        deleteHut(index) {
            this.huts.splice(index, 1);

            // Rassign names to all huts in ascending order
            this.huts.forEach((hut, i) => {
                hut.name = `HUT ${i + 1}`; // Set the name based on the index (1-based)
            });
        },
        toggleHutDetails(index) {
            this.huts[index].showDetails = !this.huts[index].showDetails;
        },
        removeDeviceRow(index) {
            this.deviceNames.splice(index, 1);
        },
        toggleACVoltageDetails(index) {
            this.huts[index].acVoltageVisible = !this.huts[index].acVoltageVisible;
        },
        addDeviceRow(hutId) {
            const hut = this.huts.find((h) => h.hutId === hutId);
            hut.devices.push({
                name: '',
                devicetype: '',
                parameter: '',
                detailsVisible: false,
            });
        },
        removeDeviceRow(hutId, deviceIndex) {
            const hut = this.huts.find((h) => h.hutId === hutId);
            hut.devices.splice(deviceIndex, 1);
        },
        toggleDeviceDetails(hutId, index) {
            const hut = this.huts.find((h) => h.hutId === hutId);
            hut.devices[index].detailsVisible = !hut.devices[index].detailsVisible;
        },
        removeDevice(hutId, index) {
            this.removeDeviceRow(hutId, index);
        },
    },

    created() {
        // Automatically call editItemAndNavigate when the component is created
        this.editItemAndNavigate();
    },
    // mounted() {
    //     this.editItemAndNavigate(); // Fetch data when the component is mounted
    // },
    // watch: {
    //     // Re-trigger the method if query params change
    //     '$route.query': 'editItemAndNavigate',
    // },
};
</script>

<style>
.tree ul {
    list-style-type: none;
    margin-left: 20px;
    padding-left: 20px;
    position: relative;
}

.tree ul::before {
    content: '';
    border-left: 1px solid #ccc;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
}

.tree li {
    margin: 10px 0;
    padding-left: 20px;
    position: relative;
}

.tree li::before {
    content: '';
    border-top: 1px solid #ccc;
    position: absolute;
    top: 15px;
    left: 0;
    width: 20px;
}

.padding_bottom .bv-no-focus-ring {
    padding-bottom: 3px !important;
}

#Delete_Btn {
    margin-top: 12px;
    margin-left: 25px;
}

.div_styling {
    display: flex;
    justify-content: space-between;
    align-items: center;
    /* width: 64%; */
}

.AddBtn_width {
    width: 58px;
    background-color: var(--primary) !important;
    border: none !important;
}

#toggle-ac-voltage-btn {
    color: white;
    background-color: grey;
    text-decoration: none;
}

#toggle-ac-voltage-btn:hover {
    color: #0056b3;
    /* Darker shade when hovered */
}

.li_div {
    width: 62.2%;
}

.DeviceName_div {
    display: flex;
    margin-left: 20px;
    margin-bottom: 7px;
}

#Add_Device_Btn {
    margin-left: 20px;
}

#Device_Type_DDL {
    width: 22%;
    margin-left: 8px;
}


.tree {
    list-style-type: none;
    padding: 0;
    margin: 0;
}

.div_styling {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    padding: 0.5rem;
    background-color: #f8f9fa;
    border: 1px solid #ddd;
    border-radius: 5px;
}

.hut-details {
    margin-left: 2rem;
    padding: 1rem;
    border-left: 2px solid #007bff;
}

.DeviceName_div {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
}

.DeviceName_div input {
    margin-right: 1rem;
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 4px;
}

#Device_Type_DDL {
    margin-right: 1rem;
}

button {
    margin-left: 7px;
}

.div_margin_left {
    margin-left: 30px;
}
</style>
