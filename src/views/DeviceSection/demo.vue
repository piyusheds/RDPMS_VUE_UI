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


                                <div class="device-details-content">
                                    <p><strong>Device ID:</strong> {{ device.deviceid }}</p>
                                    <p><strong>Device Name:</strong> {{ device.name }}</p>


                                    <!-- For AC Voltage -->
                                    <div v-if="device.devicetype === 'AC Voltage'" class="ac-voltage-content">
                                        <div class="d-flex align-items-center" v-for="n in 2" :key="'ac-voltage-' + n">
                                            <!-- Channels -->
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

                                    <div v-if="device.devicetype === 'AC Current'" class="ac-current-content">
                                        <div class="d-flex align-items-center" v-for="n in 6" :key="'ac-current-' + n">
                                            <!-- Channels -->
                                            <b-form-group :label="'Channels'" class="mb-3 mr-3 padding_bottom">
                                                <b-form-group :label="'CH-' + n + ':'" class="mb-3 mr-3"></b-form-group>
                                            </b-form-group>
                                            <b-form-group :label="'Gear Type'" class="mb-3 mr-3"
                                                style="margin-left:25px;">
                                                <b-form-select v-model="device['acCurrentGears' + n]"
                                                    :options="gearOptions"
                                                    :id="'ac-current-gears-' + n"></b-form-select>
                                            </b-form-group>

                                            <!-- Value Range -->
                                            <b-form-group label="Value Range" class="mb-3 ml-3 div_margin_left"
                                                style="width: 21.5%;">
                                                <div class="d-flex align-items-center">
                                                    <b-form-input v-model="device['acCurrentValueRange' + n + 'Min']"
                                                        placeholder="Min" :id="'ac-current-value-range-' + n + '-min'"
                                                        style="width: 40%; margin-right: 4%;"></b-form-input>
                                                    <span style="margin: 0 8px;">-</span>
                                                    <b-form-input v-model="device['acCurrentValueRange' + n + 'Max']"
                                                        placeholder="Max" :id="'ac-current-value-range-' + n + '-max'"
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




                                    <div v-if="device.devicetype === 'DC Voltage'" class="dc-voltage-content">
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

                                    <div v-if="device.devicetype === 'DC Current'" class="dc-current-content">
                                        <div v-for="n in 6" :key="'dc-current-' + n" class="d-flex align-items-center">
                                            <b-form-group :label="'Channels'" class="mb-3 mr-3 padding_bottom">
                                                <b-form-group :label="'CH-' + n + ':'" class="mb-3 mr-3"></b-form-group>
                                            </b-form-group>
                                            <b-form-group :label="'Gear Type'" class="mb-3 mr-3"
                                                style="margin-left:25px;">
                                                <b-form-select v-model="device['dcCurrentGears' + n]"
                                                    :options="gearOptions"
                                                    :id="'dc-current-gears-' + n"></b-form-select>
                                            </b-form-group>
                                            <b-form-group label="Value Range" class="mb-3 ml-3 div_margin_left"
                                                style="width: 21.5%;">
                                                <div class="d-flex align-items-center">
                                                    <b-form-input v-model="device['dcCurrentValueRange' + n + 'Min']"
                                                        placeholder="Min" style="width: 40%; margin-right: 4%;"
                                                        :id="'dc-range-input1-' + n"></b-form-input>
                                                    <span style="margin: 0 8px;">-</span>
                                                    <b-form-input v-model="device['dcCurrentValueRange' + n + 'Max']"
                                                        placeholder="Max" style="width: 40%;"
                                                        :id="'dc-range-input2-' + n"></b-form-input>
                                                </div>
                                            </b-form-group>
                                            <b-form-group label="Parameter Name:" class="mb-3 div_margin_left">
                                                <b-form-input v-model="device['dcCurrentParam' + n]"
                                                    placeholder="Enter Parameter"
                                                    :id="'dc-current-input-' + n"></b-form-input>
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
import { useToast } from 'vue-toast-notification';
import ApiGatewayServies from '../../Services/ApiGatewayServies';
export default {

    data() {
        return {
            // General visibility toggles
            acVoltageVisible: false,
            isAcCurrentVisible: false,
            isDcVoltVisible: false,
            isDcCurrentVisible: false,
            isDigIpVisible: false,

            // Devices and device properties
            huts: [
                {
                    hutId: 1,
                    name: "Hut 1",
                    param: "",
                    devices: [
                        {
                            name: '',
                            devicetype: '',
                            deviceid: '',
                            parameter: '',
                            detailsVisible: false,
                        }
                    ],
                    showDetails: false
                }
            ],

            deviceNames: [
                { name: '', devicetype: '', parameter: '' } // Initial row for devices
            ],

            // Device properties initialized for AC Voltage
            // device: {
            //     devicetype: 'AC Voltage',
            //     acVoltageChannels: [
            //         {
            //             input: '',
            //             gear: '',
            //             valueRangeMin: '',
            //             valueRangeMax: '',
            //             parameter: ''
            //         },
            //         {
            //             input: '',
            //             gear: '',
            //             valueRangeMin: '',
            //             valueRangeMax: '',
            //             parameter: ''
            //         }
            //     ]
            // },

            device: {
                devicetype: 'AC Voltage', // or 'AC Current', 'DC Voltage', etc.
                acVoltageGears1: null,
                acVoltageGears2: null,
                acVoltageValueRange1Min: null,
                acVoltageValueRange1Max: null,
                acVoltageInput1: '',
                acVoltageValueRange2Min: null,
                acVoltageValueRange2Max: null,
                acVoltageInput2: '',

                acCurrentGears1: null,
                acCurrentGears2: null,
                acCurrentGears3: null,
                acCurrentGears4: null,
                acCurrentGears5: null,
                acCurrentGears6: null,
                acCurrentValueRange1Min: null,
                acCurrentValueRange1Max: null,
                acCurrentValueRange2Min: null,
                acCurrentValueRange2Max: null,
                acCurrentValueRange3Min: null,
                acCurrentValueRange3Max: null,
                acCurrentParam1: '',
                acCurrentParam2: '',
                acCurrentParam3: '',
                acCurrentParam4: '',
                acCurrentParam5: '',
                acCurrentParam6: ''
            },

            // Gear options (these can be used in the form fields)
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

            // Master options for device types like IMEI, MAC, etc.
            masterOptions: [
                { value: '', text: "Select Master Type" },
                { value: "IMEI", text: "IMEI" },
                { value: "MAC", text: "MAC" },
            ],

            selectedMaster: '',
            masterInput: '',

            // Location and station info
            stationCode: '',
            location: '',
            name: '',

            // Raw data (change name to reflect the purpose)
            jsonData: '',

            // Device types available
            DeviceType: [
                { value: '', text: "Select Device Type" },
                "AC Voltage", "AC Current", "DC Voltage", "DC Current", "Digital Input"
            ],

            // Hut data structure for storing all relevant information
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
            // };



            // selectedMaster: '',
            // masterInput: '',
            // name: '',
            // stationCode: '',
            // location: '',
            // huts: [],
            // masterOptions: [], // Populate with actual options
            // DeviceType: [], // Populate with actual device types
            // gearOptions: [], // Populate with actual gear options
        };
    },
    name: 'EditDevices',

    mounted() {
        // Assuming you want to initialize properties for AC Voltage (n=1 to 2)
        for (let n = 1; n <= 2; n++) {
            // Set values dynamically for each 'n'
            this.device['acVoltageGears' + n] = "Gear Value " + n;  // Example value
            this.device['acVoltageValueRange' + n + 'Min'] = "Min Value " + n;
            this.device['acVoltageValueRange' + n + 'Max'] = "Max Value " + n;
            this.device['acVoltageInput' + n] = "Parameter Name " + n;
        }
    }

    ,

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

        // async editItemAndNavigate(item) {
        //     try {
        //         // Assuming 'imeiMac' is the unique identifier for editing
        //         const imeiMac = item.imeimac;

        //         // Fetch the data for editing based on imeiMac
        //         const response = await ApiGatewayServies.get(`Master/${imeiMac}`);
        //         console.log("Fetched data for editing:", response.data);

        //         if (response.data) {
        //             const data = encodeURIComponent(JSON.stringify(response.data));
        //             this.$router.push({ name: 'EditDevices', query: { imeiMac } });
        //         } else {
        //             console.error("No data found for the selected item.");
        //         }
        //     } catch (error) {
        //         console.error("Error editing item:", error);
        //     }
        // },

        // async editItemAndNavigate() {
        //     try {
        //         const imeiMac = this.$route.query.imeiMac; // Get the imeiMac from query params

        //         if (!imeiMac) {
        //             console.error("imeiMac not provided in query params.");
        //             return;
        //         }

        //         // Fetch data for editing
        //         const response = await ApiGatewayServies.get(`Master/${imeiMac}`);
        //         console.log("Fetched data for editing:", response.data);

        //         if (response.data) {
        //             const data = encodeURIComponent(JSON.stringify(response.data));
        //             // Handle the fetched data as needed
        //             console.log("Data ready for editing:", data);
        //         } else {
        //             console.error("No data found for the selected item.");
        //         }
        //     } catch (error) {
        //         console.error("Error editing item:", error);
        //     }
        // },


        // Working edit method
        // async editItemAndNavigate() {
        //     try {
        //         const imeiMac = this.$route.query.imeiMac;

        //         if (!imeiMac) {
        //             console.error("imeiMac not provided in query params.");
        //             return;
        //         }

        //         // Fetch data from the API
        //         const response = await ApiGatewayServies.get(`Master/${imeiMac}`);
        //         console.log("Fetched data for editing:", response.data);

        //         if (response.data) {
        //             const data = response.data;

        //             // Map master details
        //             this.selectedMaster = data.masterDetails?.masterType || "";
        //             this.masterInput = data.masterDetails?.imeimac || "";
        //             this.name = data.masterDetails?.stationName || "";
        //             this.stationCode = data.masterDetails?.stationCode || "";
        //             this.location = data.masterDetails?.location || "";

        //             // Initialize huts configuration
        //             this.huts = [];

        //             if (Array.isArray(data.hutConfiguration)) {
        //                 data.hutConfiguration.forEach((hut, index) => {
        //                     const hutId = hut.hutId || index + 1; // Fallback to index if hutId is missing

        //                     // Check if HUT already exists in the array
        //                     let existingHut = this.huts.find((h) => h.hutId === hutId);

        //                     if (!existingHut) {
        //                         // Create a new HUT entry if it doesn't exist
        //                         existingHut = {
        //                             hutId,
        //                             name: `Hut ${hutId}`, // Default name based on hutId
        //                             param: hut.hutId || "",
        //                             devices: [],
        //                             showDetails: false,
        //                         };
        //                         this.huts.push(existingHut);
        //                     }

        //                     // Append devices to the HUT
        //                     if (Array.isArray(hut.devices)) {
        //                         hut.devices.forEach((device) => {
        //                             existingHut.devices.push({
        //                                 name: device.name || "",
        //                                 devicetype: device.devicetype || "",
        //                                 deviceid: device.deviceid || "",
        //                                 parameter: device.parameter || "",
        //                                 detailsVisible: false,
        //                             });
        //                         });
        //                     }
        //                 });
        //             }

        //             console.log("Updated component state with HUTs and devices:", {
        //                 selectedMaster: this.selectedMaster,
        //                 masterInput: this.masterInput,
        //                 name: this.name,
        //                 stationCode: this.stationCode,
        //                 location: this.location,
        //                 huts: this.huts,
        //             });
        //         } else {
        //             console.error("No data found for the selected item.");
        //         }
        //     } catch (error) {
        //         console.error("Error editing item:", error);
        //     }
        // },

        // working code 
        // async editItemAndNavigate() {
        //     try {
        //         const imeiMac = this.$route.query.imeiMac;

        //         if (!imeiMac) {
        //             console.error("imeiMac not provided in query params.");
        //             return;
        //         }

        //         // Fetch data from the API
        //         const response = await ApiGatewayServies.get(`Master/${imeiMac}`);
        //         console.log("Fetched data for editing:", response.data);

        //         if (response.data) {
        //             const data = response.data;

        //             // Map master details
        //             this.selectedMaster = data.masterDetails?.masterType || "";
        //             this.masterInput = data.masterDetails?.imeimac || "";
        //             this.name = data.masterDetails?.stationName || "";
        //             this.stationCode = data.masterDetails?.stationCode || "";
        //             this.location = data.masterDetails?.location || "";

        //             // Prepare the device tables
        //             const deviceTables = [
        //                 { name: "AC Voltage", data: data.acVoltageTable },
        //                 { name: "DC Voltage", data: data.dcVoltageTables },
        //                 { name: "AC Current", data: data.acCurrentTable },
        //                 { name: "DC Current", data: data.dcCurrentTable },
        //                 { name: "Digital Input", data: data.digitalInputTable },
        //             ];

        //             // Initialize huts array
        //             const huts = [];

        //             // Map huts configuration
        //             if (Array.isArray(data.hutConfiguration)) {
        //                 data.hutConfiguration.forEach((hut, index) => {
        //                     // Filter devices for this hut
        //                     const devices = deviceTables.flatMap((table) => {
        //                         return table.data
        //                             .filter((device) => device.hutId === hut.hutId)
        //                             .map((device) => {
        //                                 // Map device data to include GearType, ParameterName, ChannelValue, etc.
        //                                 let mappedDevice = {
        //                                     name: table.name,
        //                                     devicetype: device.deviceName,
        //                                     deviceid: device.deviceId,
        //                                     detailsVisible: false,
        //                                 };

        //                                 // Check and append specific details based on device type
        //                                 if (table.name === "Digital Input") {
        //                                     mappedDevice = {
        //                                         ...mappedDevice,
        //                                         gearType: device.gearType || "",
        //                                         parameterName: device.parameterName || "",
        //                                         channelValue: device.channelValue || "",
        //                                     };
        //                                 } else if (table.name === "AC Voltage" || table.name === "DC Voltage" || table.name === "AC Current" || table.name === "DC Current") {
        //                                     mappedDevice = {
        //                                         ...mappedDevice,
        //                                         gearType: device.gearType || "",
        //                                         min: device.min || "",
        //                                         max: device.max || "",
        //                                         parameterName: device.parameterName || "",
        //                                     };
        //                                 }

        //                                 return mappedDevice;
        //                             });
        //                     });

        //                     // Push hut and its devices to the huts array
        //                     huts.push({
        //                         hutId: hut.hutId || index + 1, // Fallback to index if hutId is missing
        //                         name: `Hut ${hut.hutId || index + 1}`, // Default name based on hutId or index
        //                         param: hut.hutId || "",
        //                         devices: devices.length
        //                             ? devices
        //                             : [
        //                                 {
        //                                     name: "",
        //                                     devicetype: "",
        //                                     deviceid: "",
        //                                     gearType: "",
        //                                     parameterName: "",
        //                                     channelValue: "",
        //                                     min: "",
        //                                     max: "",
        //                                     detailsVisible: false,
        //                                 },
        //                             ],
        //                         showDetails: false,
        //                     });
        //                 });
        //             }

        //             // Assign mapped huts to component state
        //             this.huts = huts;

        //             console.log("Updated component state:", {
        //                 selectedMaster: this.selectedMaster,
        //                 masterInput: this.masterInput,
        //                 name: this.name,
        //                 stationCode: this.stationCode,
        //                 location: this.location,
        //                 huts: this.huts,
        //             });
        //         } else {
        //             console.error("No data found for the selected item.");
        //         }
        //     } catch (error) {
        //         console.error("Error editing item:", error);
        //     }
        // }

        async editItemAndNavigate() {
            try {
                const imeiMac = this.$route.query.imeiMac;

                if (!imeiMac) {
                    console.error("imeiMac not provided in query params.");
                    return;
                }

                // Initialize dataToSend object
                const dataToSend = {};

                // Fetch data from the API
                const response = await ApiGatewayServies.get(`Master/${imeiMac}`);
                console.log("Fetched data for editing:", response.data);

                if (response.data) {
                    const data = response.data;

                    // Map master details
                    this.selectedMaster = data.masterDetails?.masterType || "";
                    this.masterInput = data.masterDetails?.imeiMac || "";
                    this.name = data.masterDetails?.stationName || "";
                    this.stationCode = data.masterDetails?.stationCode || "";
                    this.location = data.masterDetails?.location || "";

                    // Prepare the device tables
                    const deviceTables = [
                        { name: "AC Voltage", data: data.acVoltageTable, channels: 2 },
                        { name: "DC Voltage", data: data.dcVoltageTables, channels: 2 },
                        { name: "AC Current", data: data.acCurrentTable, channels: 6 },
                        { name: "DC Current", data: data.dcCurrentTable, channels: 6 },
                        { name: "Digital Input", data: data.digitalInputTable, channels: 0 }, // No channels for Digital Input
                    ];

                    // Initialize the hut
                    const hut = {
                        hutId: 1,
                        name: "Hut 1",
                        param: "",
                        devices: [],
                        showDetails: false,
                    };

                    // Function to map device attributes based on the device type
                    const mapDeviceAttributes = (device, tableName, channelCount) => {
                        let mappedDevice = {
                            deviceid: device.deviceId,
                            parameter: "",
                            gearType: "",
                            min: "",
                            max: "",
                            detailsVisible: false,
                        };

                        // Append specific details for device types
                        switch (tableName) {
                            case "Digital Input":
                                mappedDevice = {
                                    ...mappedDevice,
                                    parameter: device.parameterName || "",
                                };
                                break;
                            case "AC Voltage":
                            case "DC Voltage":
                            case "AC Current":
                            case "DC Current":
                                mappedDevice = {
                                    ...mappedDevice,
                                    channelsParameter: device.channelsParameter || "",
                                    gearType: device.gearType || "",
                                };
                                break;
                            default:
                                break;
                        }

                        // Initialize the table array if it doesn't exist
                        if (!dataToSend[`${tableName}Table`]) {
                            dataToSend[`${tableName}Table`] = [];
                        }

                        // For AC/DC Voltage or Current, map based on channel count
                        if (channelCount > 0) {
                            for (let n = 1; n <= channelCount; n++) {
                                const channelData = {
                                    sno: 0,
                                    imeiMac: this.masterInput,
                                    hutId: hut.param,
                                    deviceId: device.deviceId,
                                    deviceName: device.deviceName,
                                    channels: `CH${n}`,
                                    gearType: device[`gearType${n}`] || "Default", // Dynamic field access
                                    channelValueRange1: device[`valueRange${n}Min`] || null, // Dynamic field access
                                    channelValueRange2: device[`valueRange${n}Max`] || null, // Dynamic field access
                                    channelUnit: "V", // Set to unit (example: "V")
                                    channelsParameter: device[`inputParam${n}`] || "", // Dynamic field access
                                };

                                // Push each channel as a separate object
                                dataToSend[`${tableName}Table`].push(channelData);
                            }
                        }

                        return mappedDevice;
                    };

                    // Map devices to the hut
                    deviceTables.forEach((table) => {
                        if (table.data && Array.isArray(table.data)) {
                            table.data.forEach((device) => {
                                const deviceGroup = {
                                    name: device.deviceName,
                                    devicetype: table.name,
                                    deviceid: device.deviceId,
                                    devices: [],
                                };

                                // Map device attributes based on device type and channel count
                                const mappedDevice = mapDeviceAttributes(device, table.name, table.channels);

                                // Check if device already exists in the hut and update or add new devices
                                const existingDeviceGroup = hut.devices.find(d => d.deviceid === device.deviceId);
                                if (existingDeviceGroup) {
                                    // Update the existing device
                                    existingDeviceGroup.devices.push(mappedDevice);
                                } else {
                                    // Add a new device group
                                    deviceGroup.devices.push(mappedDevice);
                                    hut.devices.push(deviceGroup);
                                }
                            });
                        }
                    });

                    // Assign the hut to the component state
                    this.huts = [hut];

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
        }





        //   },
        // 
        ,


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
                    if (device.devicetype === "AC Voltage") {
                        for (let n = 1; n <= 2; n++) {
                            const channelData = {
                                sno: 0,
                                imeiMac: this.masterInput,
                                hutId: hut.param,
                                deviceId: device.deviceid,
                                deviceName: device.name,
                                channels: `CH${n}`,
                                gearType: device[`acVoltageGears${n}`] || "AC Voltage",  // Default value if not set
                                channelValueRange1: device[`acVoltageValueRange${n}Min`] || null,  // Min value
                                channelValueRange2: device[`acVoltageValueRange${n}Max`] || null,  // Max value
                                channelUnit: "V",  // Voltage unit
                                channelsParameter: device[`acVoltageInput${n}`] || "",  // Input parameter
                            };

                            dataToSend.acVoltageTable.push(channelData);
                        }
                    }
                    else if (device.devicetype === "DC Voltage") {
                        const channelData = [];

                        for (let n = 1; n <= 2; n++) {
                            const channel = {
                                channelNumber: String(n),
                                gearType: "DC Voltage",
                                channelsParameter: "Voltage Parameter",
                                channelValueRange1: device[`dcVoltageValueRange${n}Min`],
                                channelValueRange2: device[`dcVoltageValueRange${n}Max`],
                                channelUnit: "V",
                                parameterName: device[`dcVoltageInput${n}`],
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
                                gearType: device[`dcCurrentGears${hut.name}${n}`] || "DC Current",
                                channelValueRange1: device[`dcCurrentValueRange${hut.name}${n}Min`] || null,
                                channelValueRange2: device[`dcCurrentValueRange${hut.name}${n}Max`] || null,
                                channelUnit: "A",
                                channelsParameter: device[`dcCurrentInput${hut.name}${n}`] || "",
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
                                gearType: device[`acCurrentGears${n}`] || "AC Current",
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
                        for (let n = 1; n <= 16; n++) {
                            const channelData = {
                                sno: 0,
                                imeiMac: this.masterInput,
                                hutId: hut.param,
                                deviceId: device.deviceid,
                                deviceName: device.name,
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
    