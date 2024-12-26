<template>
  <main>
    <!-- Search Box and Dropdown -->
    <div style="display: flex; justify-content: end;">
      <b-input-group class="mb-3" style="width: 25%;">
        <b-form-input v-model="search" placeholder="Search..." />
        <b-form-select v-model="selectedDivision" :options="divisions" />
        <router-link :to="{ name: 'AddDevices' }" class="btn btn-success btn-sm">
          <b-icon icon="plus" aria-hidden="true"></b-icon> Add Device
        </router-link>

      </b-input-group>
    </div>

    <!-- Table -->
    <b-table :items="filteredItems" :fields="fields" responsive="sm" bordered hover striped>
      <template #cell(active_status)="row">
        <b-badge :variant="row.value ? 'success' : 'danger'">
          {{ row.value ? 'Active' : 'Inactive' }}
        </b-badge>
      </template>
      <template #cell(action)="row">
        <b-button variant="primary" size="sm" id="EditBtn" @click="editItem(row.item)">
          Edit
        </b-button>
        <b-button variant="danger" size="sm" class="ml-2" @click="deleteItem(row.item)">
          Delete
        </b-button>
      </template>
    </b-table>

    <!-- Custom Add/Edit Device Modal with Transition -->
    <transition name="fade" @before-enter="beforeEnter" @enter="enter" @before-leave="beforeLeave" @leave="leave">
      <div v-if="showModal" class="custom-modal">
        <div class="modal-content">
          <span class="close" @click="closeModal">&times;</span>
          <h3>{{ isEditing ? 'Edit Device' : 'Add Device' }}</h3>
          <b-form @submit.prevent="submitDevice">
            <b-form-group label="IMEI Number">
              <b-form-input v-model="newDevice.imei_no" required />
            </b-form-group>
            <b-form-group label="Railway Division">
              <b-form-select v-model="newDevice.railway_division" :options="divisions" required />
            </b-form-group>
            <b-form-group label="Gear Type">
              <b-form-select v-model="newDevice.gear_type" :options="DeviceType" required />
            </b-form-group>
            <b-form-group label="Device Type">
              <b-form-select v-model="newDevice.device_type" :options="DeviceCategory" required />
            </b-form-group>
            <b-form-group label="Device Name">
              <b-form-input v-model="newDevice.device_name" required />
            </b-form-group>
            <b-form-group label="Active Status">
              <b-form-checkbox v-model="newDevice.active_status">Active</b-form-checkbox>
            </b-form-group>
            <b-button type="submit" variant="success">{{ isEditing ? 'Update' : 'Save' }}</b-button>
          </b-form>
        </div>
      </div>
    </transition>
  </main>
</template>

<script>
import ApiGatewayServies from "../../Services/ApiGatewayServies";

export default {
  data() {
    return {
      search: "",
      selectedDivision: null,
      divisions: [
        { value: null, text: "All Divisions" },
        "North",
        "South",
        "East",
        "West",
      ],
      DeviceType: [
        { value: null, text: "Select Gear Type" },
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
      DeviceCategory: [
        { value: null, text: "Select Device Type" },
        "AC Current Module",
        "DC Current Module",
        "AC Voltage",
        "DC Voltage",
        "Digital Input",
        "IoT Edge",
        "Wireless Module",
        "GPRS Module",
      ],
      fields: [
        { key: "imei_no", label: "IMEI NO." },
        { key: "device_name", label: "Device Name" },
        { key: "railway_division", label: "Railway Division", sortable: true },
        { key: "date_time", label: "Date/Time" },
        { key: "active_status", label: "Active Status" },
        { key: "action", label: "Action" },
      ],
      items: [
        {
          imei_no: "123456789012345",
          device_name: "Device A",
          railway_division: "North",
          date_time: "2024-12-19 10:30:00",
          active_status: true,
        },
        {
          imei_no: "987654321098765",
          device_name: "Device B",
          railway_division: "South",
          date_time: "2024-12-18 14:15:00",
          active_status: false,
        },
        {
          imei_no: "456789123456789",
          device_name: "Device C",
          railway_division: "East",
          date_time: "2024-12-17 09:45:00",
          active_status: true,
        },
        {
          imei_no: "789123456789123",
          device_name: "Device D",
          railway_division: "West",
          date_time: "2024-12-16 08:20:00",
          active_status: false,
        },
      ],
      showModal: false, // Controls the modal visibility
      newDevice: {
        imei_no: "",
        railway_division: "",
        gear_type: "",
        device_type: "",
        device_name: "",
        active_status: false,
      },
      isEditing: false, // To toggle between "Add" and "Edit" mode
      editingDeviceIndex: null, // Store the index of the device being edited
    };
  },
  computed: {
    filteredItems() {
      let filtered = this.items;

      if (this.search) {
        filtered = filtered.filter((item) =>
          Object.values(item)
            .join(" ")
            .toLowerCase()
            .includes(this.search.toLowerCase())
        );
      }

      if (this.selectedDivision) {
        filtered = filtered.filter(
          (item) => item.railway_division === this.selectedDivision
        );
      }

      return filtered;
    },
  },
  methods: {
    async fetchItems() {
      try {
        const response = await ApiGatewayServies.get("devices", {
          params: { division: this.selectedDivision || "" },
        });
        this.items = response.data.map((device) => ({
          imei_no: device.imei,
          device_name: device.name,
          railway_division: device.division,
          date_time: device.date_time,
          active_status: device.is_active,
        }));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
    editItem(item) {
      // Set the device being edited
      this.isEditing = true;
      this.newDevice = { ...item }; // Copy the data to the modal
      this.showModal = true; // Open the modal
      this.editingDeviceIndex = this.items.indexOf(item); // Store the index for updating
    },
    deleteItem(item) {
      if (confirm(`Are you sure you want to delete IMEI: ${item.imei_no}?`)) {
        this.items = this.items.filter((i) => i.imei_no !== item.imei_no);
      }
    },
    openAddDevice() {
      // Reset modal for adding a new device
      this.isEditing = false;
      this.newDevice = { imei_no: "", railway_division: "", device_name: "", active_status: false };
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    submitDevice() {
      if (this.isEditing) {
        // Update the existing device in the items array
        this.items[this.editingDeviceIndex] = { ...this.newDevice };
      } else {
        // Add a new device
        this.items.push({
          ...this.newDevice,
          date_time: new Date().toLocaleString(),
        });
      }
      this.showModal = false; // Close the modal
      this.newDevice = { imei_no: "", railway_division: "", device_name: "", active_status: false };
    },
    beforeEnter(el) {
      el.style.opacity = 0;
      el.style.transform = "scale(0.9)";
    },
    enter(el, done) {
      el.offsetHeight; // Trigger reflow
      el.style.transition = "opacity 0.3s ease, transform 0.3s ease";
      el.style.opacity = 1;
      el.style.transform = "scale(1)";
      done();
    },
    beforeLeave(el) {
      el.style.transition = "opacity 0.3s ease, transform 0.3s ease";
      el.style.opacity = 1;
      el.style.transform = "scale(1)";
    },
    leave(el, done) {
      el.style.transition = "opacity 0.3s ease, transform 0.3s ease";
      el.style.opacity = 0;
      el.style.transform = "scale(0.9)";
      done();
    },
  },
  mounted() {
    this.fetchItems();
  },
};
</script>

<style scoped>
/* Styling for the custom modal */
.custom-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  width: 400px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.close {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 30px;
  color: #aaa;
  cursor: pointer;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

.b-input-group {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
}

.b-input-group .form-control {
  max-width: 300px;
}

.b-input-group-append .form-select {
  max-width: 200px;
}

#EditBtn {
  margin-right: 10px;
}

/* Transition classes for fading in and out */
.custom-modal .fade-enter-active,
.custom-modal .fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.custom-modal .fade-enter,
.custom-modal .fade-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

.bg-success {
  width: 58px;
}
</style>