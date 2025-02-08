<template>
    <div class="container-xxl position-relative bg-white d-flex p-0">
        <!-- Forget Password Start -->
        <div class="container-fluid">
            <div class="row h-100 align-items-center justify-content-center" style="min-height: 100vh">
                <div class="col-12 col-sm-8 col-md-10 col-lg-10 col-xl-9">
                    <div class="bg-light rounded p-4 p-sm-5 my-4 mx-3" style="margin-top: 10px !important;">
                        <!-- Header -->
                        <div class="d-flex align-items-center justify-content-between mb-4">
                            <a href="index.html" class="">
                                <h3 class="text-primary">HOWRAH</h3>
                            </a>
                            <h3>Forgot Password</h3>
                        </div>

                        <form @submit.prevent="submitForm">
                            <!-- Email Input -->
                            <div class="row mb-4">
                                <div class="col-12">
                                    <div class="form-floating">
                                        <input v-model="formData.email" type="email" class="form-control" id="email"
                                            placeholder="Enter your email address" required />
                                        <label for="email">Email Address</label>
                                    </div>
                                </div>
                            </div>

                            <!-- Token Input -->
                            <div class="row mb-4" v-if="showToken">
                                <div class="col-12">
                                    <div class="form-floating">
                                        <input v-model="formData.token" type="text" class="form-control" id="token"
                                            placeholder="Enter the token sent to your email" required />
                                        <label for="token">Token</label>
                                    </div>
                                </div>
                            </div>

                            <!-- Password Row -->
                            <div class="row mb-4" v-if="showNewPassword">
                                <div class="col-md-6 position-relative">
                                    <div class="form-floating">
                                        <input v-model="formData.password" :type="showPassword ? 'text' : 'password'"
                                            class="form-control" id="password" placeholder="New Password" required />
                                        <label for="password">New Password</label>
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
                                        <input v-model="formData.confirmPassword"
                                            :type="showConfirmPassword ? 'text' : 'password'" class="form-control"
                                            id="confirmPassword" placeholder="Confirm Password" required />
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
                                    <button type="submit" class="btn btn-primary w-100 py-3">
                                        {{ showNewPassword ? 'Reset Password' : 'Send Token' }}
                                    </button>


                                </div>
                            </div>
                        </form>
                        <button @click="showTestToast">Test Toast</button>
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

.mb-4 {
    margin-bottom: 1rem !important;
}
</style>

<script>
import ApiGatewayServies from '../Services/ApiGatewayServies';
// // import { useToast } from 'vue-toastification';
import { useToast } from 'vue-toastification';
export default {
    setup() {
        const toast = useToast();

        const showTestToast = () => {
            toast.success('This is a test toast!');
        };

        return { showTestToast };
    },
    data() {
        return {
            formData: {
                email: '',
                token: '',
                password: '',
                confirmPassword: '',
            },
            showPassword: false,
            showConfirmPassword: false,
            showToken: false,
            showNewPassword: false,
            loading: false,
        };
    },
    methods: {

        async submitForm() {
            // const toast = useToast();
            this.loading = true;

            try {
                if (!this.showToken && !this.showNewPassword) {
                    // Step 1: Request token
                    await ApiGatewayServies.post('UserRegister/forgotPassword', { email: this.formData.email });
                    toast.success('Token has been sent to your email address!');
                    this.showToken = true;
                } else if (this.showToken && !this.showNewPassword) {
                    // Step 2: Verify token
                    await ApiGatewayServies.post('UserRegister/verifyToken', {
                        email: this.formData.email,
                        token: this.formData.token,
                    });
                    toast.success('Token verified! You can now reset your password.');
                    this.showNewPassword = true;
                } else {
                    // Step 3: Reset password
                    if (this.formData.password !== this.formData.confirmPassword) {
                        toast.error('Passwords do not match!');
                        return;
                    }

                    await ApiGatewayServies.post('UserRegister/resetPassword', {
                        email: this.formData.email,
                        token: this.formData.token,
                        newPassword: this.formData.password,
                    });

                    toast.success('Password reset successfully!');
                    this.resetForm();
                }
            } catch (error) {
                if (error.response && error.response.data) {
                    toast.error(error.response.data || 'Something went wrong!');
                } else {
                    toast.error('An unexpected error occurred!');
                }
            } finally {
                this.loading = false;
            }
        },

        resetForm() {
            this.formData = {
                email: '',
                token: '',
                password: '',
                confirmPassword: '',
            };
            this.showToken = false;
            this.showNewPassword = false;
        },

        togglePassword(type) {
            if (type === 'password') {
                this.showPassword = !this.showPassword;
            } else {
                this.showConfirmPassword = !this.showConfirmPassword;
            }
        },
    },
};
</script>
