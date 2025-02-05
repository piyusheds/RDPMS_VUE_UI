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
      <template #cell(sno)="row">
        {{ row.index + 1 }}
      </template>
      <template #cell(active_status)="row">
        <b-badge :variant="row.value ? 'success' : 'danger'">
          {{ row.value ? 'Active' : 'Inactive' }}
        </b-badge>
      </template>
      <template #cell(action)="row">
        <b-button variant="primary" size="sm" @click="editItemAndNavigate(row.item)">
          Edit
        </b-button>
        <b-button variant="danger" size="sm" class="ml-2" style="margin-left: 10px;"
          @click="showConfirmation(row.item)">
          Delete
        </b-button>
      </template>
    </b-table>


    <!-- Confirmation Modal for Deletion -->
    <div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="deleteModalLabel">Confirm Deletion</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            Are you sure you want to delete IMEI/MAC: {{ itemToDelete?.imeimac }}?
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="hideModal">Cancel</button>
            <button type="button" class="btn btn-danger" @click="deleteConfirmed">Delete</button>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import ApiGatewayServices from "../../Services/ApiGatewayServies";
import { useToast } from "vue-toastification"; // Import useToast

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
      fields: [
        { key: "sno", label: "S.No" },
        { key: "masterType", label: "Master Type" },
        { key: "imeimac", label: "IMEI/MAC" },
        { key: "stationCode", label: "Station Code" },
        { key: "stationName", label: "Station Name" },
        { key: "location", label: "Location" },
        { key: "createdDate", label: "Created Date" },
        { key: "action", label: "Action" },
      ],
      items: [],
      showModal: false,
      itemToDelete: null, // Track the item to be deleted
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
          (item) => item.stationName === this.selectedDivision
        );
      }

      return filtered;
    },
  },
  methods: {
    async fetchItems() {
      try {
        const response = await ApiGatewayServices.get("Master/Tabledetails");
        console.log("API Response:", response.data);

        if (response.data && Array.isArray(response.data.masterDetails)) {
          this.items = response.data.masterDetails.map((device, index) => ({
            sno: index + 1,  // Add Sno based on the index
            masterType: device.masterType,
            imeimac: device.imeimac,
            stationCode: device.stationCode,
            stationName: device.stationName,
            location: device.location,
            createdDate: new Date(device.createdDate).toLocaleString(),
          }));
        } else {
          console.error("Unexpected response format or missing 'masterDetails':", response.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },

    showConfirmation(item) {
      this.itemToDelete = item; // Set the item to delete
      this.showModal = true; // Open the confirmation modal
      this.$nextTick(() => {
        const modal = new bootstrap.Modal(document.getElementById("deleteModal"));
        modal.show(); // Show the Bootstrap modal
      });
    },
    editItemAndNavigate(item) {
      const imeiMac = item.imeimac; // Ensure this is the unique identifier
      this.$router.push({ name: 'EditDevices', query: { imeiMac } });
    },

    hideModal() {
      this.showModal = false; // Close the modal
      this.itemToDelete = null; // Clear the item
    },
    async deleteConfirmed() {
      if (this.itemToDelete) {
        try {
          const url = `Master/${this.itemToDelete.imeimac}`;
          console.log("API URL:", url);
          const response = await ApiGatewayServices.delete(url);
          console.log("Delete Response:", response.data);

          this.items = this.items.filter((item) => item.imeimac !== this.itemToDelete.imeimac);

          const toast = useToast();
          toast.success(`"${this.itemToDelete.masterType}" "${this.itemToDelete.imeimac}" deleted successfully.`, {
            timeout: 2000,
          });
          const modal = bootstrap.Modal.getInstance(document.getElementById("deleteModal"));
          modal.hide();  // Hide the modal

        } catch (error) {
          console.error("Error during delete operation:", error);
          alert("Failed to delete the item. Please try again.");
        } finally {
          this.itemToDelete = null; // Clear the item
        }
      }
    }
  },
  mounted() {
    this.fetchItems();
  },
};
</script>





<style scoped>
.modal-dialog {
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  max-width: 500px;
  width: 100%;
}

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