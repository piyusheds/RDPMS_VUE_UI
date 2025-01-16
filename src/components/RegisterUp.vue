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

                        <form @submit.prevent="submitForm">
                            <!-- First Row -->
                            <div class="row mb-4">
                                <div class="col-md-4">
                                    <div class="form-floating">
                                        <input v-model="formData.railwayStationCode" type="text" class="form-control"
                                            id="stationCode" placeholder="Station Code" />
                                        <label for="stationCode">Station Code</label>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-floating">
                                        <input v-model="formData.railwayStationName" type="text" class="form-control"
                                            id="railwayStation" placeholder="Railway Station Name" />
                                        <label for="railwayStation">Railway Station Name</label>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-floating">
                                        <input v-model="formData.railwayDivision" type="text" class="form-control"
                                            id="railwayDivision" placeholder="Railway Division" />
                                        <label for="railwayDivision">Railway Division</label>
                                    </div>
                                </div>
                            </div>

                            <!-- Second Row -->
                            <div class="row mb-4">
                                <div class="col-md-6">
                                    <div class="form-floating">
                                        <input v-model="formData.personName" type="text" class="form-control"
                                            id="userName" placeholder="User Name" />
                                        <label for="userName">User Name</label>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-floating">
                                        <input v-model="formData.companyName" type="text" class="form-control"
                                            id="companyName" placeholder="Company Name" />
                                        <label for="companyName">Company Name</label>
                                    </div>
                                </div>
                            </div>

                            <!-- Third Row -->
                            <div class="row mb-4">
                                <div class="col-md-6">
                                    <div class="form-floating">
                                        <input v-model="formData.departmentName" type="text" class="form-control"
                                            id="departmentName" placeholder="Department Name" />
                                        <label for="departmentName">Department Name</label>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-floating">
                                        <input v-model="formData.designation" type="text" class="form-control"
                                            id="designation" placeholder="Designation" />
                                        <label for="designation">Designation</label>
                                    </div>
                                </div>
                            </div>

                            <!-- Fourth Row -->
                            <div class="row mb-4">
                                <div class="col-md-6">
                                    <div class="form-floating">
                                        <input v-model="formData.email" type="email" class="form-control" id="email"
                                            placeholder="Email" />
                                        <label for="email">E-Mail</label>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-floating">
                                        <input v-model="formData.mobileNo" type="text" class="form-control" id="mobile"
                                            placeholder="Mobile Number" />
                                        <label for="mobile">Mobile Number</label>
                                    </div>
                                </div>
                            </div>

                            <!-- Fifth Row -->
                            <div class="row mb-4">
                                <div class="col-md-6">
                                    <div class="form-floating">
                                        <input v-model="formData.userId" type="text" class="form-control" id="userId"
                                            placeholder="User ID" />
                                        <label for="userId">User ID</label>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-floating">
                                        <input v-model="formData.token" type="text" class="form-control" id="token"
                                            placeholder="Token" />
                                        <label for="token">Token</label>
                                    </div>
                                </div>
                            </div>

                            <!-- Password Row -->
                            <div class="row mb-4">
                                <div class="col-md-6 position-relative">
                                    <div class="form-floating">
                                        <input v-model="formData.password" :type="showPassword ? 'text' : 'password'"
                                            class="form-control" id="password" placeholder="Password" />
                                        <label for="password">Password</label>
                                        <button type="button"
                                            class="btn position-absolute end-0 top-50 translate-middle-y me-2"
                                            @click="togglePassword('password')">
                                            <i :class="showPassword ? 'bi bi-eye' : 'bi bi-eye-slash'"></i>
                                        </button>
                                    </div>
                                </div>

                                <!-- Confirm Password Row -->
                                <div class="col-md-6 position-relative">
                                    <div class="form-floating">
                                        <input v-model="formData.confirmPassword" :type="showConfirmPassword ? 'text' : 'password'"
                                            class="form-control" id="confirmPassword" placeholder="Confirm Password" />
                                        <label for="confirmPassword">Confirm Password</label>
                                        <button type="button"
                                            class="btn position-absolute end-0 top-50 translate-middle-y me-2"
                                            @click="togglePassword('confirmPassword')">
                                            <i :class="showConfirmPassword ? 'bi bi-eye' : 'bi bi-eye-slash'"></i>
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

<style strict>
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
import { useToast } from 'vue-toastification';

export default {
    data() {
        return {
            formData: {
                railwayStationCode: '',
                railwayStationName: '',
                railwayDivision: '',
                userName: '',
                companyName: '',
                departmentName: '',
                designation: '',
                email: '',
                mobileNo: '',
                userId: '',
                token: '',
                password: '',
                confirmPassword: '',
                rememberMe: false,
            },
            loading: false,
            showPassword: false,
            showConfirmPassword: false,
        };
    },
    methods: {
        async submitForm() {
            this.loading = true;
            const toast = useToast();

            // Prepare data to send to backend
            const formDataToSend = {
                userName: this.formData.personName,
                companyName: this.formData.companyName,
                railwayDivision: this.formData.railwayDivision,
                railwayStationName: this.formData.railwayStationName,
                railwayStationCode: this.formData.railwayStationCode,
                departmentName: this.formData.departmentName,
                designation: this.formData.designation,
                token: this.formData.token,
                email: this.formData.email,
                mobileNo: this.formData.mobileNo,
                userId: this.formData.userId,
                password: this.formData.password,
                createdAt: new Date().toISOString(), 
                isActive: true,
            };

            try {
                // Call the API to register user
                const response = await ApiGatewayServies.post('User/register', formDataToSend, {
                    headers: { 'Content-Type': 'application/json' },
                });

                // If successful, show a success toast
                toast.success(response.data || 'User registered successfully and database created!');
                this.resetForm();
            } catch (error) {
                // Handle error from the backend
                if (error.response && error.response.data) {
                    const errorMessage = error.response.data || 'Something went wrong!';
                    toast.error(errorMessage);
                } else {
                    // Handle any unexpected error
                    toast.error('An unexpected error occurred!');
                }
            } finally {
                this.loading = false;
            }
        },

        resetForm() {
            Object.keys(this.formData).forEach((key) => {
                this.formData[key] = '';
            });
        },

        togglePassword(type) {
            if (type === 'password') {
                this.showPassword = !this.showPassword;
            } else {
                this.showConfirmPassword = !this.showConfirmPassword;
            }
        },

        // Validate the form
        isFormValid() {
            return this.formData.password === this.formData.confirmPassword && this.formData.password.length > 0;
        },
    },
};
</script>