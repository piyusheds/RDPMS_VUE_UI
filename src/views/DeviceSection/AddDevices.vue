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
                        <b-form-group label="HUT ID:" class="mb-3 ml-3">
                            <b-form-input v-model="hut.param" placeholder="Enter HUT"
                                style="width: 22%;"></b-form-input>
                        </b-form-group>
                        <div v-for="(device, deviceIndex) in hut.devices" :key="deviceIndex" class="DeviceName_div">
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


                                    <div v-if="device.devicetype === 'Ac Voltage'" class="ac-voltage-content">
                                        <div class="d-flex align-items-center" v-for="n in 2" :key="'ac-voltage-' + n">
                                            <b-form-group :label="'Channels'" class="mb-3 mr-3 padding_bottom">
                                                <b-form-group :label="'CH-' + n" class="mb-3 mr-3"></b-form-group>
                                            </b-form-group>

                                            <!-- Gear Type -->
                                            <b-form-group :label="'Gear Type'" class="mb-3 mr-3"
                                                style="margin-left:25px;">
                                                <b-form-select v-model="device['acVoltageGears' + n]"
                                                    :options="gearOptions"
                                                    :id="'ac-voltage-gears-' + n"></b-form-select>
                                            </b-form-group>

                                            <!-- Value Range -->
                                            <b-form-group label="Value Range" class="mb-3 ml-3 div_margin_left"
                                                style="width: 21.5%;">
                                                <div class="d-flex align-items-center">
                                                    <b-form-input v-model="device['acVoltageValueRange' + n + 'Min']"
                                                        placeholder="Min" :id="'ac-voltage-value-range-' + n + '-min'"
                                                        style="width: 40%; margin-right: 4%;"></b-form-input>
                                                    <span style="margin: 0 8px;">-</span>
                                                    <b-form-input v-model="device['acVoltageValueRange' + n + 'Max']"
                                                        placeholder="Max" :id="'ac-voltage-value-range-' + n + '-max'"
                                                        style="width: 40%;"></b-form-input>
                                                </div>
                                            </b-form-group>

                                            <!-- Parameter Name -->
                                            <b-form-group label="Parameter Name:" class="mb-3 div_margin_left">
                                                <b-form-input v-model="device['acVoltageInput' + n]"
                                                    placeholder="Enter Parameter"
                                                    :id="'ac-voltage-input-' + n"></b-form-input>
                                            </b-form-group>
                                        </div>
                                    </div>


                                    <div v-if="device.devicetype === 'Ac Current'" class="ac-current-content">
                                        <div class="d-flex align-items-center" v-for="n in 6" :key="'ac-current-' + n">
                                            <b-form-group :label="'Channels'" class="mb-3 mr-3 padding_bottom">
                                                <b-form-group :label="'CH-' + n + ':'" class="mb-3 mr-3"></b-form-group>
                                            </b-form-group>
                                            <b-form-group :label="'Gear Type'" class="mb-3 mr-3"
                                                style="margin-left:25px;">
                                                <b-form-select v-model="device['acCurrentGears' + n]"
                                                    :options="gearOptions"
                                                    :id="'ac-current-gears-' + n"></b-form-select>
                                            </b-form-group>

                                            <!-- Value Range-->
                                            <b-form-group label="Value Range" class="mb-3 ml-3 div_margin_left"
                                                style="width: 21.5%;">
                                                <div class="d-flex align-items-center">
                                                    <b-form-input v-model="device['acCurrentValueRange' + n + 'Min']"
                                                        placeholder="Min" id="ac-current-value-range-min"
                                                        style="width: 40%; margin-right: 4%;"></b-form-input>
                                                    <span style="margin: 0 8px;">-</span>
                                                    <b-form-input v-model="device['acCurrentValueRange' + n + 'Max']"
                                                        placeholder="Max" id="ac-current-value-range-max"
                                                        style="width: 40%;"></b-form-input>
                                                </div>
                                            </b-form-group>

                                            <!-- Parameter Name -->
                                            <b-form-group label="Parameter Name:" class="mb-3 div_margin_left">
                                                <b-form-input v-model="device['acCurrentParam' + n]"
                                                    placeholder="Enter Parameter"
                                                    :id="'ac-current-input-' + n"></b-form-input>
                                            </b-form-group>
                                        </div>
                                    </div>


                                    <div v-if="device.devicetype === 'Dc Voltage'" class="dc-voltage-content">
                                        <div class="d-flex align-items-center" v-for="n in 2" :key="'dc-voltage-' + n">
                                            <b-form-group :label="'Channels'" class="mb-3 mr-3 padding_bottom">
                                                <b-form-group :label="'CH-' + n" class="mb-3 mr-3"></b-form-group>
                                            </b-form-group>
                                            <b-form-group :label="'Gear Type'" class="mb-3 mr-3"
                                                style="margin-left:25px;">
                                                <b-form-select v-model="device['dcVoltageGears' + n]"
                                                    :options="gearOptions"
                                                    :id="'dc-voltage-gears-' + n"></b-form-select>
                                            </b-form-group>
                                            <b-form-group label="Value Range" class="mb-3 ml-3 div_margin_left"
                                                style="width: 21.5%;">
                                                <div class="d-flex align-items-center">
                                                    <b-form-input v-model="device['dcVoltageValueRange' + n + 'Min']"
                                                        placeholder="Min" id="ac-voltage-value-range-1"
                                                        style="width: 40%; margin-right: 4%;"></b-form-input>
                                                    <span style="margin: 0 8px;">-</span>
                                                    <b-form-input v-model="device['dcVoltageValueRange' + n + 'Max']"
                                                        placeholder="Max" id="ac-voltage-value-range-2"
                                                        style="width: 40%;"></b-form-input>
                                                </div>
                                            </b-form-group>
                                            <b-form-group label="Parameter Name:" class="mb-3 div_margin_left">
                                                <b-form-input v-model="device['dcVoltageInput' + n]"
                                                    placeholder="Enter Parameter"
                                                    :id="'dc-voltage-input-' + n"></b-form-input>
                                            </b-form-group>
                                        </div>
                                    </div>

                                    <div v-if="device.devicetype === 'Dc Current'" class="dc-current-content">
                                        <div v-for="n in 6" :key="'dc-current-' + n" class="d-flex align-items-center">
                                            <b-form-group :label="'Channels'" class="mb-3 mr-3 padding_bottom">
                                                <b-form-group :label="'CH-' + n + ':'" class="mb-3 mr-3"></b-form-group>
                                            </b-form-group>
                                            <b-form-group :label="'Gear Type'" class="mb-3 mr-3"
                                                style="margin-left:25px;">
                                                <b-form-select v-model="device['dcCurrentGears' + hut.name + n]"
                                                    :options="gearOptions"
                                                    :id="'dc-current-gears-' + n"></b-form-select>
                                            </b-form-group>
                                            <b-form-group label="Value Range" class="mb-3 ml-3 div_margin_left"
                                                style="width: 21.5%;">
                                                <div class="d-flex align-items-center">
                                                    <b-form-input
                                                        v-model="device['dcCurrentValueRange' + hut.name + n + 'Min']"
                                                        placeholder="Min" style="width: 40%; margin-right: 4%;"
                                                        :id="'dc-range-input1-' + hut.name + n"></b-form-input>
                                                    <span style="margin: 0 8px;">-</span>
                                                    <b-form-input
                                                        v-model="device['dcCurrentValueRange' + hut.name + n + 'Max']"
                                                        placeholder="Max" style="width: 40%;"
                                                        :id="'dc-range-input2-' + hut.name + n"></b-form-input>
                                                </div>
                                            </b-form-group>
                                            <b-form-group label="Parameter Name:" class="mb-3 div_margin_left">
                                                <b-form-input v-model="device['dcCurrentInput' + hut.name + n]"
                                                    placeholder="Enter Parameter"></b-form-input>
                                            </b-form-group>
                                        </div>
                                    </div>


                                    <div v-if="device.devicetype === 'Digital Input'" class="digital-input-content">
                                        <div v-for="n in 16" :key="'digital-input-' + n"
                                            class="d-flex align-items-center mb-3">
                                            <b-form-group :label="'Channels'" class="mb-3 mr-3 padding_bottom"
                                                style="padding-bottom:0px !important;">
                                                <b-form-group :label="'Input Option (' + n + '):'"
                                                    class="mb-3 mr-3"></b-form-group>
                                            </b-form-group>
                                            <b-form-group :label="'Gear Type'" class="mb-3 mr-3 "
                                                style="margin-left:25px;">
                                                <b-form-select v-model="device['digitalInputGears' + n]"
                                                    :options="gearOptions" :id="'dig-ip-gears-' + n"></b-form-select>
                                            </b-form-group>
                                            <b-form-group label="Parameter Name:" class="mb-3 div_margin_left">
                                                <b-form-input v-model="device['digitalInputParam' + n]"
                                                    placeholder="Enter Parameter"
                                                    :id="'dig-ip-input-' + n"></b-form-input>
                                            </b-form-group>
                                            <b-form-group label="Channel Value:" class="mb-3 ml-3 div_margin_left">
                                                <b-form-select v-model="device['digitalInputValue' + n]"
                                                    :options="ChannelValueOptions" :id="'dig-ip-value-' + n">
                                                </b-form-select>
                                            </b-form-group>
                                        </div>
                                    </div>


                                </div>
                            </li>
                        </ul>
                    </div>
                </li>
                <b-button variant="primary" @click="saveHutData">Save Hut</b-button>
                <pre>{{ jsonData }}</pre>
            </ul>
        </b-card>


    </main>
</template>
<script>
import { useToast } from 'vue-toastification';
import ApiGatewayServies from '../../Services/ApiGatewayServies';
export default {

    data() {
        return {
            acVoltageVisible: false,

            huts: [
                {
                    hutId: 1, name: "Hut 1", param: "", devices: [{
                        name: '',
                        devicetype: '',
                        deviceid: '',
                        parameter: '',
                        detailsVisible: false,
                    },], showDetails: false
                },
            ],
            deviceNames: [
                { name: '', devicetype: '', parameter: '' } // Initial row
            ],
            addedDevices: [],
            isAcCurrentVisible: false,
            isDcVoltVisible: false,
            isDcCurrentVisible: false,
            isDigIpVisible: false,
            selectedMaster: "IMEI",
            masterOptions: [
                { value: '', text: "Select Master Type" },
                { value: "IMEI", text: "IMEI" },
                { value: "MAC", text: "MAC" },
            ],
            selectedMaster: '',
            masterInput: '',
            stationCode: '',
            location: '',
            name: '',
            jsonData: '',
            deviceNames: [{ name: '', parameter: '' }], // Initialize with one row
            DeviceType: [
                { value: '', text: "Select Device Type" },
                "Ac Voltage", "Ac Current", "Dc Voltage", "Dc Current", "Digital Input"
            ],
            gearOptions: [
                { value: '', text: "Select Gears" },
                "Signals", "Points", "DC Track Circuits", "Axle Counters", "AF Track Circuits",
                "Level Crossing Gates", "Relays", "Electronic Interlocking", "Integrated Power Supply (IPS)",
                "Battery Charger", "Earth Leakage Detector (ELD)", "Cables", "Block Instruments", "UFSBI",
                "Ambient Temperature and Humidity"
            ],
            ChannelValueOptions: [
                { value: '', text: "Select Channel Value" },
                { value: true, text: "True" },
                { value: false, text: "False" },
            ],
            // digitalInputValue: Array(16).fill(true),
            hutData: {
                masterDetails: {
                    sno: 0,
                    masterType: '',
                    imeimac: '',
                    stationCode: '',
                    stationName: '',
                    location: '',
                },
                hutConfiguration: [],
                digitalInputTable: [],
                dcVoltTable: [],
                dcCurrentTable: [],
                acVoltageTable: [],
                acCurrentTable: [],
            },
        };
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
                },],
                showDetails: false,
            });
        },

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
                        hutId: hut.param,           // Reference the hut's param
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
                hut.devices.forEach((device) => {
                    console.log("Device Type:", device.devicetype);
                    const hutId = `6.${hut.param}`;
                    const ACVoltDeviceId = `2.${device.deviceid}`;
                    if (device.devicetype === "Ac Voltage") {
                        for (let n = 1; n <= 2; n++) {
                            const channelData = {
                                sno: 0,
                                imeiMac: this.masterInput,
                                hutId: hutId,
                                deviceId: ACVoltDeviceId,
                                deviceType: device.devicetype,
                                deviceName: device.name,
                                channels: `CH${n}`,
                                gearType: device[`acVoltageGears${n}`],  // Default value if not set
                                channelValueRange1: device[`acVoltageValueRange${n}Min`] || null,  // Min value
                                channelValueRange2: device[`acVoltageValueRange${n}Max`] || null,  // Max value
                                channelUnit: "V",  // Voltage unit
                                channelsParameter: device[`acVoltageInput${n}`] || "",  // Input parameter
                            };

                            dataToSend.acVoltageTable.push(channelData);
                        }
                    }
                    else if (device.devicetype === "Dc Voltage") {
                        const channelData = [];

                        for (let n = 1; n <= 2; n++) {
                            const channel = {
                                channelNumber: String(n),
                                gearType: device[`dcVoltageGears${n}`],
                                channelsParameter: device[`dcVoltageInput${n}`],
                                channelValueRange1: device[`dcVoltageValueRange${n}Min`],
                                channelValueRange2: device[`dcVoltageValueRange${n}Max`],
                                channelUnit: "V",
                                parameterName: device[`dcVoltageInput${n}`],
                            };

                            channelData.push(channel);
                        }

                        const hutId = `6.${hut.param}`;
                        const DCVoltDeviceId = `3.${device.deviceid}`;
                        channelData.forEach(channel => {
                            dataToSend.dcVoltageTables.push({
                                sno: 0,
                                imeiMac: this.masterInput,
                                hutId: hutId,
                                deviceId: DCVoltDeviceId,
                                deviceName: device.name,
                                deviceType: device.devicetype,
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
                    else if (device.devicetype === "Dc Current") {
                        const hutId = `6.${hut.param}`;
                        const DCCurrentDeviceId = `5.${device.deviceid}`;
                        for (let n = 1; n <= 6; n++) {
                            const channelData = {
                                sno: 0,
                                imeiMac: this.masterInput,
                                hutId: hutId,
                                deviceId: DCCurrentDeviceId,
                                deviceName: device.name,
                                channels: `CH${n}`,
                                gearType: device[`dcCurrentGears${hut.name}${n}`] || "Dc Current",
                                channelValueRange1: device[`dcCurrentValueRange${hut.name}${n}Min`] || null,
                                channelValueRange2: device[`dcCurrentValueRange${hut.name}${n}Max`] || null,
                                channelUnit: "A",
                                channelsParameter: device[`dcCurrentInput${hut.name}${n}`] || "",
                            };

                            dataToSend.dcCurrentTable.push(channelData);
                        }
                    }

                    else if (device.devicetype === "Ac Current") {
                        const ACCurrentDeviceId = `4.${device.deviceid}`;
                        for (let n = 1; n <= 6; n++) {
                            const hutId = `6.${hut.param}`;
                            const channelData = {
                                sno: 0,
                                imeiMac: this.masterInput,
                                hutId: hutId,
                                deviceId: ACCurrentDeviceId,
                                deviceName: device.name,
                                deviceType: device.devicetype,
                                channels: `CH${n}`,
                                gearType: device[`acCurrentGears${n}`] || "Ac Current",
                                // channelsParameter: "Current Parameter",
                                channelValueRange1: device[`acCurrentValueRange${n}Min`] || null,
                                channelValueRange2: device[`acCurrentValueRange${n}Max`] || null,
                                channelUnit: "A",
                                channelsParameter: device[`acCurrentParam${n}`] || "",
                            };

                            dataToSend.acCurrentTable.push(channelData);
                        }
                    }
                    else if (device.devicetype === "Digital Input") {
                        const hutId = `6.${hut.param}`;
                        const DigitalInputDeviceId = `1.${device.deviceid}`;
                        for (let n = 1; n <= 16; n++) {
                            const channelData = {
                                sno: 0,
                                imeiMac: this.masterInput,
                                hutId: hutId,
                                deviceId: DigitalInputDeviceId,
                                deviceName: device.name,
                                deviceType: device.devicetype,
                                channels: `CH${n}`, // Convert channel number to string
                                gearType: device[`digitalInputGears${n}`] || "Digital Input",
                                channelsParameter: device[`digitalInputParam${n}`] || "Digital Parameter",
                                channelValue: device[`digitalInputValue${n}`] !== '' ? device[`digitalInputValue${n}`] : null, // Send as true/false/null
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
                const response = await ApiGatewayServies.post('Master', dataToSend, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`, // Attach token here
                    },
                });

                toast.success('HUT Data submitted successfully!', {
                    timeout: 2000,
                });
                // Optionally reset form here if needed
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
                // this.resetForm(); 
            } catch (error) {
                console.error('Error:', error);
                toast.error(error.response?.data || 'An unexpected error occurred while saving HUT data.');
                toast.error(errorMessage);
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
        // addDeviceRow() {
        //     this.deviceNames.push({ name: '', parameter: '' });
        // },
        removeDeviceRow(index) {
            this.deviceNames.splice(index, 1);
        },
        toggleACVoltageDetails(index) {
            this.huts[index].acVoltageVisible = !this.huts[index].acVoltageVisible;
        },

        // addDeviceRow(hutName) {
        //     // Find the hut by name
        //     const hut = this.huts.find(h => h.name === hutName);

        //     if (hut) {
        //         // Ensure that the hut has an addedDevices array
        //         if (!hut.addedDevices) {
        //             hut.addedDevices = [];
        //         }

        //         // Create the new device object
        //         const newDevice = {
        //             devicename: '',
        //             devicetype: '',
        //             parameter: '',
        //             detailsVisible: false,
        //             acVoltageGears: '',
        //             acVoltageInput: '',
        //             acVoltageGears2: '',
        //             acVoltageInput2: ''
        //         };

        //         // Push the new device to the appropriate hut's addedDevices array
        //         hut.addedDevices.push(newDevice);

        //         // Clear the input fields (optional)
        //         this.deviceNames[0].name = '';
        //         this.deviceNames[0].devicetype = '';
        //         this.deviceNames[0].parameter = '';
        //     }
        // },

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
            const toast = useToast();
            // Prevent removing the last device row
            if (hut.devices.length > 1) {
                hut.devices.splice(deviceIndex, 1);
            } else {
                toast.error("Cannot remove the last device row!", {
                    timeout: 1000,
                });
            }
        },

        toggleDeviceDetails(hutId, index) {
            const hut = this.huts.find((h) => h.hutId === hutId);
            hut.devices[index].detailsVisible = !hut.devices[index].detailsVisible;
        },
        removeDevice(hutId, index) {
            this.removeDeviceRow(hutId, index);
        },
    }
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
