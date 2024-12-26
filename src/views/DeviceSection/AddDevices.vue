<template>
    <main>
        <div class="container mt-4">
            <div class="row">
                <!-- Master Card -->
                <div class="col-6">
                    <b-card class="mb-3">
                        <h4 class="mb-3">Master Label</h4>

                        <!-- IMEI/MAC Selection -->
                        <b-form-group label="Select Master Type:" label-for="master-type" class="mb-4">
                            <b-form-select v-model="selectedMaster" :options="masterOptions" id="master-type"
                                required></b-form-select>
                        </b-form-group>

                        <!-- IMEI/MAC Input -->
                        <b-form-group v-if="selectedMaster" :label="`Enter ${selectedMaster}:`"
                            :label-for="`${selectedMaster}-input`" class="mb-4">
                            <b-form-input v-model="masterInput" :id="`${selectedMaster}-input`"
                                :placeholder="`Enter ${selectedMaster}`" required></b-form-input>
                        </b-form-group>
                    </b-card>
                </div>

                <!-- Station Information Card -->
                <div class="col-6">
                    <b-card class="mb-3">
                        <h4 class="mb-3">Station Information</h4>

                        <!-- Station Code -->
                        <b-form-group label="Station Code:" label-for="station-code" class="mb-4">
                            <b-form-input id="station-code" v-model="stationCode"
                                placeholder="Enter Station Code"></b-form-input>
                        </b-form-group>

                        <!-- Location -->
                        <b-form-group label="Location:" label-for="location" class="mb-4">
                            <b-form-input id="location" v-model="location" placeholder="Enter Location"></b-form-input>
                        </b-form-group>
                        <!-- Name -->

                        <b-form-group label="Name:" label-for="name" class="mb-4">
                            <b-form-input id="name" v-model="name" placeholder="Enter Name"></b-form-input>
                        </b-form-group>
                    </b-card>
                </div>
            </div>

            <b-card class="mt-3">
                <h4 class="mb-3">Tree Structure</h4>
                <ul class="tree">
                    <li v-for="(hut, index) in huts" :key="index">
                        <div class="div_styling">
                            <b>{{ hut.name }}</b>
                            <div>
                                <b-button @click="addHut" size="sm">Add More HUT</b-button>
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

                            <div v-for="(device, deviceIndex) in deviceNames" :key="deviceIndex" class="DeviceName_div">
                                <input v-model="device.name" placeholder="Device Name" />
                                <b-form-select v-model="device.devicetype" :options="DeviceType"
                                    id="Device_Type_DDL"></b-form-select>
                                <input v-model="device.parameter" placeholder="Enter Device Id"
                                    style="margin-left: 7px;" />

                                <b-button v-if="deviceIndex === 0" @click="addDeviceRow" variant="outline-success"
                                    size="sm" style="margin-left: 7px;">
                                    Add Device
                                </b-button>

                                <b-button @click="removeDeviceRow(deviceIndex)" variant="outline-danger" size="sm"
                                    style="margin-left: 7px;">
                                    Remove
                                </b-button>
                            </div>

                            <ul>
                                <li v-for="(device, index) in addedDevices" :key="index">
                                    <div class="d-flex align-items-center li_div"
                                        style="width: 70%; justify-content: space-between;">
                                        <div style="flex: 1;">
                                            <b><strong>{{ device.devicetype }}</strong></b>
                                        </div>
                                        <div style="display: flex; justify-content: flex-end;">
                                            <b-button @click="toggleDeviceDetails(index)" size="sm"
                                                variant="outline-primary" style="margin-right: 8px;">
                                                {{ device.detailsVisible ? 'Hide' : 'Show' }}
                                                <b-icon
                                                    :icon="device.detailsVisible ? 'chevron-down' : 'chevron-right'"></b-icon>
                                            </b-button>
                                            <b-button @click="removeDevice(index)" size="sm" variant="outline-danger">
                                                Remove
                                            </b-button>
                                        </div>
                                    </div>


                                    <div v-show="device.detailsVisible" class="device-details-content">
                                        <p><strong>Device ID:</strong> {{ device.parameter }}</p>
                                        <p><strong>Device Name:</strong> {{ device.name }}</p>

                                        <div v-if="device.devicetype === 'AC Volt'" class="ac-voltage-content">
                                            <div class="d-flex align-items-center">
                                                <b-form-group label="CH-1:" class="mb-3 mr-3">
                                                    <b-form-select v-model="device.acVoltageGears"
                                                        :options="gearOptions" id="ac-voltage-gears-1"></b-form-select>
                                                </b-form-group>
                                                <b-form-group label="Parameter:" class="mb-3">
                                                    <b-form-input v-model="device.acVoltageInput"
                                                        placeholder="Enter Parameter"
                                                        id="ac-voltage-input-1"></b-form-input>
                                                </b-form-group>
                                            </div>
                                            <div class="d-flex align-items-center">
                                                <b-form-group label="CH-2:" class="mb-3 mr-3">
                                                    <b-form-select v-model="device.acVoltageGears2"
                                                        :options="gearOptions" id="ac-voltage-gears-2"></b-form-select>
                                                </b-form-group>
                                                <b-form-group label="Parameter:" class="mb-3">
                                                    <b-form-input v-model="device.acVoltageInput2"
                                                        placeholder="Enter Parameter"
                                                        id="ac-voltage-input-2"></b-form-input>
                                                </b-form-group>
                                            </div>
                                        </div>

                                        <div v-if="device.devicetype === 'AC Current'" class="ac-current-content">
                                            <div class="d-flex align-items-center" v-for="n in 6"
                                                :key="'ac-current-' + n">
                                                <b-form-group :label="'CH-' + n + ':'" class="mb-3 mr-3">
                                                    <b-form-select v-model="device['acCurrentGears' + n]"
                                                        :options="gearOptions"
                                                        :id="'ac-current-gears-' + n"></b-form-select>
                                                </b-form-group>
                                                <b-form-group label="Parameter:" class="mb-3">
                                                    <b-form-input v-model="device['acCurrentInput' + n]"
                                                        placeholder="Enter Parameter"
                                                        :id="'ac-current-input-' + n"></b-form-input>
                                                </b-form-group>
                                            </div>
                                        </div>

                                        <div v-if="device.devicetype === 'DC Volt'" class="dc-voltage-content">
                                            <div class="d-flex align-items-center" v-for="n in 2"
                                                :key="'dc-voltage-' + n">
                                                <b-form-group :label="'CH-' + n + ':'" class="mb-3 mr-3">
                                                    <b-form-select v-model="device['dcVoltageGears' + n]"
                                                        :options="gearOptions"
                                                        :id="'dc-voltage-gears-' + n"></b-form-select>
                                                </b-form-group>
                                                <b-form-group label="Parameter:" class="mb-3">
                                                    <b-form-input v-model="device['dcVoltageInput' + n]"
                                                        placeholder="Enter Parameter"
                                                        :id="'dc-voltage-input-' + n"></b-form-input>
                                                </b-form-group>
                                            </div>
                                        </div>
                                        <div v-if="device.devicetype === 'DC Current'" class="dc-current-content">
                                            <div v-for="n in 6" :key="'dc-current-' + n"
                                                class="d-flex align-items-center">
                                                <b-form-group :label="'CH-' + n + ':'" class="mb-3 mr-3">
                                                    <b-form-select v-model="device['dcCurrentGears' + n]"
                                                        :options="gearOptions"
                                                        :id="'dc-current-gears-' + n"></b-form-select>
                                                </b-form-group>
                                                <b-form-group label="Parameter:" class="mb-3">
                                                    <b-form-input v-model="device['dcCurrentInput' + n]"
                                                        placeholder="Enter Parameter"
                                                        :id="'dc-current-input-' + n"></b-form-input>
                                                </b-form-group>
                                            </div>
                                        </div>

                                        <div v-if="device.devicetype === 'Digital Input'" class="digital-input-content">
                                            <div v-for="n in 16" :key="'digital-input-' + n"
                                                class="d-flex align-items-center mb-3">
                                                <b-form-group :label="'Input Option (' + n + '):'" class="mb-3 mr-3">
                                                    <b-form-select v-model="device['digIpGears' + n]"
                                                        :options="gearOptions"
                                                        :id="'dig-ip-gears-' + n"></b-form-select>
                                                </b-form-group>
                                                <b-form-group label="Parameter:" class="mb-3">
                                                    <b-form-input v-model="device['digIpInputs' + n]"
                                                        placeholder="Enter Parameter"
                                                        :id="'dig-ip-input-' + n"></b-form-input>
                                                </b-form-group>
                                            </div>
                                        </div>

                                    </div>
                                </li>

                                <!-- <li>
                                    <div class="d-flex justify-content-between align-items-center li_div">
                                        <b><strong>Ac Current</strong></b>
                                        <b-button @click="isAcCurrentVisible = !isAcCurrentVisible"
                                            variant="outline-primary" size="sm">
                                            {{ isAcCurrentVisible ? 'Hide' : 'Show' }}
                                        </b-button>
                                    </div>
                                    <div v-show="isAcCurrentVisible">
                                        <div v-for="(row, index) in 6" :key="index"
                                            class="d-flex align-items-center mb-3">
                                            <b-form-group :label="'CH-' + (index + 1) + ':'" class="mb-3 mr-3">
                                                <b-form-select v-model="hut.acCurrentGears[index]"
                                                    :options="gearOptions"></b-form-select>
                                            </b-form-group>
                                            <b-form-group label="Parameter:" class="mb-3">
                                                <b-form-input v-model="hut.acCurrentInput[index]"
                                                    placeholder="Enter Parameter"></b-form-input>
                                            </b-form-group>
                                        </div>
                                    </div>
                                </li>

                                <li>
                                    <div class="d-flex justify-content-between align-items-center li_div">
                                        <b><strong>DC Volt</strong></b>
                                        <b-button @click="isDcVoltVisible = !isDcVoltVisible" variant="outline-primary"
                                            size="sm">
                                            {{ isDcVoltVisible ? 'Hide' : 'Show' }}
                                        </b-button>
                                    </div>
                                    <div v-show="isDcVoltVisible">
                                        <div class="d-flex align-items-center">
                                            <b-form-group label="CH-1:" class="mb-3 mr-3">
                                                <b-form-select v-model="hut.dcVoltGears"
                                                    :options="gearOptions"></b-form-select>
                                            </b-form-group>
                                            <b-form-group label="Parameter:" class="mb-3">
                                                <b-form-input v-model="hut.dcVoltInput"
                                                    placeholder="Enter Parameter"></b-form-input>
                                            </b-form-group>
                                        </div>
                                        <div class="d-flex align-items-center">
                                            <b-form-group label="CH-2:" class="mb-3 mr-3">
                                                <b-form-select v-model="hut.dcVoltGears2"
                                                    :options="gearOptions"></b-form-select>
                                            </b-form-group>
                                            <b-form-group label="Parameter:" class="mb-3">
                                                <b-form-input v-model="hut.dcVoltInput2"
                                                    placeholder="Enter Parameter"></b-form-input>
                                            </b-form-group>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div class="d-flex justify-content-between align-items-center li_div">
                                        <b><strong>Dc Current</strong></b>
                                        <b-button @click="isDcCurrentVisible = !isDcCurrentVisible"
                                            variant="outline-primary" size="sm">
                                            {{ isDcCurrentVisible ? 'Hide' : 'Show' }}
                                        </b-button>
                                    </div>
                                    <div v-show="isDcCurrentVisible">
                                        <div v-for="(row, index) in 6" :key="index"
                                            class="d-flex align-items-center mb-3">
                                            <b-form-group :label="'CH-' + (index + 1) + ':'" class="mb-3 mr-3">
                                                <b-form-select v-model="hut.dcCurrentGears[index]"
                                                    :options="gearOptions"></b-form-select>
                                            </b-form-group>
                                            <b-form-group label="Parameter:" class="mb-3">
                                                <b-form-input v-model="hut.dcCurrentInput[index]"
                                                    placeholder="Enter Parameter"></b-form-input>
                                            </b-form-group>
                                        </div>
                                    </div>
                                </li>

                                <li>
                                    <div class="d-flex justify-content-between align-items-center li_div">
                                        <b><strong>Digital Input</strong></b>
                                        <b-button @click="isDigIpVisible = !isDigIpVisible" variant="outline-primary"
                                            size="sm">
                                            {{ isDigIpVisible ? 'Hide' : 'Show' }}
                                        </b-button>
                                    </div>
                                    <div v-show="isDigIpVisible">
                                        <div v-for="(row, index) in 16" :key="index"
                                            class="d-flex align-items-center mb-3">
                                            <b-form-group :label="'Input Option (' + (index + 1) + '):'"
                                                class="mb-3 mr-3">
                                                <b-form-select v-model="hut.digIpGears[index]"
                                                    :options="gearOptions"></b-form-select>
                                            </b-form-group>
                                            <b-form-group label="Parameter:" class="mb-3">
                                                <b-form-input v-model="hut.digIpInputs[index]"
                                                    placeholder="Enter Parameter"></b-form-input>
                                            </b-form-group>
                                        </div>
                                    </div>
                                </li>
                                 -->

                            </ul>
                        </div>
                    </li>
                </ul>
            </b-card>

        </div>
    </main>
</template>

<!-- <script>
export default {
    data() {
        return {
            acVoltageVisible: false,
            isAcCurrentVisible: false,
            isDcVoltVisible: false,
            isDcCurrentVisible: false,
            isDigIpVisible: false,
            selectedMaster: null,
            masterOptions: ["IMEI", "MAC"],
            masterInput: "",

            // Station Information
            stationCode: "",
            location: "",
            name: "",
            deviceNames: [{ name: '', parameter: '' }], // Initialize with one row

            // HUT Data
            huts: [{
                name: 'HUT 1',
                param: "",

                acVoltageGears: null,
                acVoltageInput: "",
                acVoltageGears2: null,
                acVoltageInput2: "",
                acCurrentGears: Array(6).fill(null),
                acCurrentInput: Array(6).fill(""),
                dcVoltGears: null,
                dcVoltInput: "",
                dcVoltGears2: null,
                dcVoltInput2: "",
                dcCurrentGears: Array(6).fill(null),
                dcCurrentInput: Array(6).fill(""),
                digIpGears: Array(16).fill(null),
                digIpInputs: Array(16).fill(""),
                showDetails: false
            }],

            // Parameter Options
            DeviceType: [
                { value: null, text: "Select Device Type" },
                "Ac Voltage", "Ac Current", "DC Volt", "Dc Current", "Digital Input"
            ],
            gearOptions: [
                { value: null, text: "Select Gears" },
                "Signals",
                "Points",
                "DC Track Circuits",
                "Axle Counters",
                "AF Track Circuits",
                "Level Crossing Gates",
                "Relays",
                "Electronic Interlocking",
                "Integrated Power Supply (IPS) / Battery Charger",
                "Earth Leakage Detector (ELD)",
                "Cables",
                "Block Instruments",
                "UFSBI",
                "Ambient Temperature and Humidity",
            ],
        };
    },
    methods: {
        addHut() {
            const hutCount = this.huts.length + 1;
            const newHut = {
                name: `HUT ${hutCount}`,
                param: "",
                devicetype: null,
                acVoltageGears: null,
                acVoltageInput: "",
                acVoltageGears2: null,
                acVoltageInput2: "",
                acCurrentGears: Array(6).fill(null),
                acCurrentInput: Array(6).fill(""),
                dcVoltGears: null,
                dcVoltInput: "",
                dcVoltGears2: null,
                dcVoltInput2: "",
                dcCurrentGears: Array(6).fill(null),
                dcCurrentInput: Array(6).fill(""),
                digIpGears: Array(16).fill(null),
                digIpInputs: Array(16).fill(""),
                showDetails: false
            };
            this.huts.push(newHut);
        },
        deleteHut(index) {
            this.huts.splice(index, 1);
        },
        toggleHutDetails(index) {
            this.huts[index].showDetails = !this.huts[index].showDetails;
        },
        toggleACVoltageDetails() {
            this.acVoltageVisible = !this.acVoltageVisible;
        },
        addDeviceRow(index) {
            // Add a new device row to the current hut (at the given index)
            this.huts[index].deviceNames.push({ name: '', parameter: '' });
        },
        removeDeviceRow(hutIndex, deviceIndex) {
            // Remove the device row at the given deviceIndex for the given hutIndex
            this.huts[hutIndex].deviceNames.splice(deviceIndex, 1);
        },
        addDeviceRow() {
            this.deviceNames.push({ name: '', parameter: '' });
        },

        // Remove a device row
        removeDeviceRow(deviceIndex) {
            if (this.deviceNames.length > 1) {
                this.deviceNames.splice(deviceIndex, 1);
            } else {
                console.error("Cannot remove the last row");
            }
        },
    }
};

</script> -->

<script>
export default {
    data() {
        return {
            acVoltageVisible: false,

            deviceNames: [
                { name: '', devicetype: '', parameter: '' } // Initial row
            ],
            addedDevices: [],
            isAcCurrentVisible: false,
            isDcVoltVisible: false,
            isDcCurrentVisible: false,
            isDigIpVisible: false,
            selectedMaster: null,
            masterOptions: ["IMEI", "MAC"],
            masterInput: "",
            stationCode: "",
            location: "",
            name: "",
            deviceNames: [{ name: '', parameter: '' }], // Initialize with one row
            huts: [{
                name: 'HUT 1',
                param: "",
                acVoltageVisible: false,
                acVoltageGears: null,
                acVoltageInput: "",
                acVoltageGears2: null,
                acVoltageInput2: "",
                acCurrentGears: Array(6).fill(null),
                acCurrentInput: Array(6).fill(""),
                dcVoltGears: null,
                dcVoltInput: "",
                dcVoltGears2: null,
                dcVoltInput2: "",
                dcCurrentGears: Array(6).fill(null),
                dcCurrentInput: Array(6).fill(""),
                digIpGears: Array(16).fill(null),
                digIpInputs: Array(16).fill(""),
                showDetails: false
            }],
            DeviceType: [
                { value: null, text: "Select Device Type" },
                "AC Volt", "AC Current", "DC Volt", "DC Current", "Digital Input"
            ],
            gearOptions: [
                { value: null, text: "Select Gears" },
                "Signals", "Points", "DC Track Circuits", "Axle Counters", "AF Track Circuits",
                "Level Crossing Gates", "Relays", "Electronic Interlocking", "Integrated Power Supply (IPS)",
                "Battery Charger", "Earth Leakage Detector (ELD)", "Cables", "Block Instruments", "UFSBI",
                "Ambient Temperature and Humidity"
            ],
        };
    },
    methods: {
        addHut() {
            const hutCount = this.huts.length + 1;
            this.huts.push({
                name: `HUT ${hutCount}`,
                param: "",
                acVoltageVisible: false,
                acVoltageGears: null,
                acVoltageInput: "",
                acVoltageGears2: null,
                acVoltageInput2: "",
                acCurrentGears: Array(6).fill(null),
                acCurrentInput: Array(6).fill(""),
                dcVoltGears: null,
                dcVoltInput: "",
                dcVoltGears2: null,
                dcVoltInput2: "",
                dcCurrentGears: Array(6).fill(null),
                dcCurrentInput: Array(6).fill(""),
                digIpGears: Array(16).fill(null),
                digIpInputs: Array(16).fill(""),
                showDetails: false
            });
        },
        deleteHut(index) {
            this.huts.splice(index, 1);
        },
        toggleHutDetails(index) {
            this.huts[index].showDetails = !this.huts[index].showDetails;
        },
        addDeviceRow() {
            this.deviceNames.push({ name: '', parameter: '' });
        },
        removeDeviceRow(index) {
            this.deviceNames.splice(index, 1);
        },
        toggleACVoltageDetails(index) {
            this.huts[index].acVoltageVisible = !this.huts[index].acVoltageVisible;
        },

        addDeviceRow() {
            const newDevice = {
                ...this.deviceNames[0],
                detailsVisible: false,
                acVoltageGears: '', // Additional fields for AC Current
                acVoltageInput: '',
                acVoltageGears2: '',
                acVoltageInput2: ''
            };
            this.addedDevices.push(newDevice);

            // Clear the input fields
            this.deviceNames[0].name = '';
            this.deviceNames[0].devicetype = '';
            this.deviceNames[0].parameter = '';
        },
        removeDeviceRow(index) {
            if (index === 0 && this.deviceNames.length === 1) {
                this.deviceNames[0] = { name: '', devicetype: '', parameter: '' }; // Clear the fields
            } else {
                this.deviceNames.splice(index, 1);
            }
        },
        toggleDeviceDetails(index) {
            this.addedDevices[index].detailsVisible = !this.addedDevices[index].detailsVisible;
        },
        removeDevice(index) {
            this.addedDevices.splice(index, 1);
        }
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
    content: "";
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
    content: "";
    border-top: 1px solid #ccc;
    position: absolute;
    top: 15px;
    left: 0;
    width: 20px;
}

#Delete_Btn {
    margin-top: 12px;
    margin-left: 25px;
}

.div_styling {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 64%;
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
</style>
