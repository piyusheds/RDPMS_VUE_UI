<template>
    <div class="container-xxl position-relative bg-white d-flex p-0">
        <!-- Form Start -->
        <div class="container-fluid">
            <div class="row h-100 align-items-center justify-content-center" style="min-height: 100vh">
                <div class="col-12 col-sm-8 col-md-10 col-lg-10 col-xl-9">
                    <div class="bg-light rounded p-4 p-sm-5 my-4 mx-3" style="margin-top: 10px !important;">
                        <!-- Header -->
                        <div class="d-flex align-items-center justify-content-between mb-4">
                            <h3 class="text-primary">HOWRAH</h3>
                            <h3>Signal Form</h3>
                        </div>

                        <form @submit.prevent="submitForm">
                            <!-- Signal Type Row -->
                            <div class="row mb-4">
                                <div class="col-md-6">
                                    <div class="form-floating">
                                        <input v-model="formData.signalType" type="text" class="form-control"
                                            id="signalType" placeholder="Signal Type" />
                                        <label for="signalType">Signal Type</label>
                                    </div>
                                </div>
                            </div>

                            <!-- Status Row -->
                            <div class="row mb-4">
                                <div class="col-md-6">
                                    <div class="form-floating">
                                        <input v-model="formData.status" type="text" class="form-control"
                                            id="status" placeholder="Status" />
                                        <label for="status">Status</label>
                                    </div>
                                </div>
                            </div>

                            <!-- Create At Row -->
                            <div class="row mb-4">
                                <div class="col-md-6">
                                    <div class="form-floating">
                                        <input v-model="formData.createAt" type="datetime-local" class="form-control"
                                            id="createAt" placeholder="Create At" />
                                        <label for="createAt">Create At</label>
                                    </div>
                                </div>
                            </div>

                            <!-- Update At Row -->
                            <div class="row mb-4">
                                <div class="col-md-6">
                                    <div class="form-floating">
                                        <input v-model="formData.updateAt" type="datetime-local" class="form-control"
                                            id="updateAt" placeholder="Update At" />
                                        <label for="updateAt">Update At</label>
                                    </div>
                                </div>
                            </div>
                            <!-- Submit Button -->
                            <div class="row mb-4">
                                <div class="col-12">
                                    <button type="submit" class="btn btn-primary w-100 py-3">Submit</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.btn-primary {
    transition: all 0.3s ease;
}

.btn-primary:active {
    transform: scale(0.95);
    background-color: #004085;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.mb-4 {
    margin-bottom: 1rem !important;
}
</style>
<script>
import ApiGatewayServies from '../Services/ApiGatewayServies';
import { useToast } from 'vue-toastification';  // Import useToast if you're using vue-toastification

export default {
    data() {
        return {
            formData: {
                createAt: '',
                updateAt: '',
            },
            loading: false,
            successMessage: '',
            errorMessage: '',
        };
    },
    methods: {
        async submitForm() {
            this.loading = true;
            this.successMessage = '';
            this.errorMessage = '';

            // Prepare data to match API schema
            const formDataToSend = {
                signalType: this.formData.signalType,
                status: this.formData.status,
                createAt: this.formData.createAt,
                updateAt: this.formData.updateAt,
            };

            console.log('Form Data to Send:', formDataToSend);

            // Get the toast instance
            const toast = useToast();

            try {
                // Sending POST request with custom header
                const response = await ApiGatewayServies.post(
                    'YourApiEndpoint',
                    formDataToSend,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                );

                // Show success toast
                toast.success('Data Submitted Successfully !');

                // Reset the form after success
                this.resetForm();
            } catch (error) {
                // Show error toast
                const errorMessage = error.response?.data?.message || 'Something went wrong!';
                toast.error(errorMessage);

                console.error('Error:', error);
            } finally {
                this.loading = false;
            }
        },

        // Reset Form Fields
        resetForm() {
            Object.keys(this.formData).forEach((key) => {
                this.formData[key] = '';
            });
        },
    },
};
</script>