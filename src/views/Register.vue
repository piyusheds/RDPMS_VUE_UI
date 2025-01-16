<template>
    <div class="container-xxl position-relative bg-white d-flex p-0">
        <!-- Sign In Start -->
        <div class="container-fluid">
            <div class="row h-100 align-items-center justify-content-center" style="min-height: 100vh">
                <div class="col-12 col-sm-8 col-md-10 col-lg-10 col-xl-9">
                    <div class="bg-light rounded p-4 p-sm-5 my-4 mx-3" style="margin-top: 10px !important;">
                        <!-- Header -->
                        <div class="d-flex align-items-center justify-content-between mb-4">
                            <a href="index.html" class="">
                                <h3 class="text-primary">HOWRAH</h3>
                            </a>
                            <h3>Sign Up</h3>
                        </div>

                        <!-- Form Inputs -->
                        <form @submit.prevent="submitForm">
                            <!-- First Row -->
                            <div class="row mb-4">
                                <div class="col-md-4">
                                    <div class="form-floating">
                                        <input v-model="form.railwayStationCode" type="text" class="form-control"
                                            id="stationCode" placeholder="Station Code" />
                                        <label for="stationCode">Station Code</label>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-floating">
                                        <input v-model="form.railwayStationName" type="text" class="form-control"
                                            id="railwayStation" placeholder="Railway Station Name" />
                                        <label for="railwayStation">Railway Station Name</label>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-floating">
                                        <input v-model="form.railwayDivision" type="text" class="form-control"
                                            id="railwayDivision" placeholder="Railway Division" />
                                        <label for="railwayDivision">Railway Division</label>
                                    </div>
                                </div>
                            </div>

                            <!-- Second Row -->
                            <div class="row mb-4">
                                <div class="col-md-6">
                                    <div class="form-floating">
                                        <input v-model="form.personName" type="text" class="form-control" id="userName"
                                            placeholder="User Name" />
                                        <label for="userName">User Name</label>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-floating">
                                        <input v-model="form.companyName" type="text" class="form-control"
                                            id="companyName" placeholder="Company Name" />
                                        <label for="companyName">Company Name</label>
                                    </div>
                                </div>
                            </div>

                            <!-- Third Row -->
                            <div class="row mb-4">
                                <div class="col-md-6">
                                    <div class="form-floating">
                                        <input v-model="form.departmentName" type="text" class="form-control"
                                            id="departmentName" placeholder="Department Name" />
                                        <label for="departmentName">Department Name</label>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-floating">
                                        <input v-model="form.designation" type="text" class="form-control"
                                            id="designation" placeholder="Designation" />
                                        <label for="designation">Designation</label>
                                    </div>
                                </div>
                            </div>

                            <!-- Fourth Row -->
                            <div class="row mb-4">
                                <div class="col-md-6">
                                    <div class="form-floating">
                                        <input v-model="form.email" type="email" class="form-control" id="email"
                                            placeholder="Email" />
                                        <label for="email">E-Mail</label>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-floating">
                                        <input v-model="form.mobileNo" type="text" class="form-control" id="mobile"
                                            placeholder="Mobile Number" />
                                        <label for="mobile">Mobile Number</label>
                                    </div>
                                </div>
                            </div>

                            <!-- Fifth Row -->
                            <div class="row mb-4">
                                <div class="col-md-6">
                                    <div class="form-floating">
                                        <input v-model="form.userId" type="text" class="form-control" id="userId"
                                            placeholder="User ID" />
                                        <label for="userId">User ID</label>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-floating">
                                        <input v-model="form.token" type="text" class="form-control" id="token"
                                            placeholder="Token" />
                                        <label for="token">Token</label>
                                    </div>
                                </div>
                            </div>

                            <!-- Password Row -->
                            <div class="row mb-4">
                                <div class="col-md-6 position-relative">
                                    <div class="form-floating">
                                        <input v-model="form.passwordHash" :type="showPassword ? 'text' : 'password'"
                                            class="form-control" id="password" placeholder="Password" />
                                        <label for="password">Password</label>
                                        <button type="button"
                                            class="btn position-absolute end-0 top-50 translate-middle-y me-2"
                                            @click="togglePassword('password')">
                                            <i :class="showPassword ? 'bi bi-eye' : 'bi bi-eye-slash'"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <!-- Submit Button -->
                            <div class="row mb-4">
                                <div class="col-12">
                                    <button type="submit" class="btn btn-primary w-100 py-3">Sign Up</button>
                                </div>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.btn-primary {
    transition: all 0.3s ease;
}

.btn-primary:active {
    transform: scale(0.95);
    background-color: #004085;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}


/* .mb-3 {
    margin-bottom: 2rem;
} */

.mb-4 {
    margin-bottom: 1rem !important;
}
</style>


<script>
import ApiGatewayServies from '../Services/ApiGatewayServies';

export default {
    data() {
        return {
            formData: {
                stationCode: '',
                railwayStation: '',
                railwayDivision: '',
                userName: '',
                companyName: '',
                departmentName: '',
                designation: '',
                email: '',
                mobile: '',
                userId: '',
                token: '',
                password: '',
                confirmPassword: '',
                rememberMe: false,
            },
            loading: false,
            successMessage: '',
            errorMessage: '',
        };
    },
    methods: {
        // Submit Form Method
        async submitForm() {
            this.loading = true;
            this.successMessage = '';
            this.errorMessage = '';

            // Validate if passwords match
            if (this.formData.password !== this.formData.confirmPassword) {
                this.errorMessage = 'Passwords do not match!';
                this.loading = false;
                return;
            }

            try {
                // Call the POST method from ApiGatewayServies
                const response = await ApiGatewayServies.post('User/register', this.formData);

                // Handle success response
                this.successMessage = 'Form submitted successfully!';
                console.log('Response:', response.data);

                // Optionally reset form
                this.resetForm();
            } catch (error) {
                // Handle errors
                this.errorMessage = error.response?.data?.message || 'Something went wrong!';
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

        // Toggle Password Visibility Method
        togglePassword(inputId, iconId) {
            const inputField = document.getElementById(inputId);
            const eyeIcon = document.getElementById(iconId);

            if (inputField && eyeIcon) {
                if (inputField.type === 'password') {
                    inputField.type = 'text';
                    eyeIcon.classList.remove('bi-eye-slash');
                    eyeIcon.classList.add('bi-eye');
                } else {
                    inputField.type = 'password';
                    eyeIcon.classList.remove('bi-eye');
                    eyeIcon.classList.add('bi-eye-slash');
                }
            }
        },
    },
};
</script>
