<template>
  <main id="about-page" style="padding-top: 0px">

    <div class="container-fluid px-4">
      <div class="row">
        <div class="col-sm-6 col-xl-3">
          <div class="bg-light rounded d-flex align-items-center justify-content-between p-4">
            <i class="fa fa-cogs fa-3x text-primary" style="font-size: 2.5em"></i>
            <div class="ms-3">
              <p class="mb-2">Total Point Machine</p>
              <h6 class="mb-0">21</h6>
            </div>
          </div>
        </div>
        <div class="col-sm-6 col-xl-3">
          <div class="bg-light rounded d-flex align-items-center justify-content-between p-4">
            <i class="fa fa-road fa-3x text-primary" style="font-size: 2.5em"></i>
            <div class="ms-3">
              <p class="mb-2">Total Track Circuits</p>
              <h6 class="mb-0">26</h6>
            </div>
          </div>
        </div>
        <div class="col-sm-6 col-xl-3">
          <div class="bg-light rounded d-flex align-items-center justify-content-between p-4">
            <i class="fa fa-database fa-3x text-primary" style="font-size: 2.5em"></i>
            <div class="ms-3">
              <p class="mb-2">Total MSDAC</p>
              <h6 class="mb-0">52</h6>
            </div>
          </div>
        </div>
        <div class="col-sm-6 col-xl-3">
          <div class="bg-light rounded d-flex align-items-center justify-content-between p-4">
            <i class="fa fa-broadcast-tower fa-3x text-primary" style="font-size: 2.5em"></i>
            <div class="ms-3">
              <p class="mb-2">Total signals</p>
              <h6 class="mb-0">40</h6>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Sales Chart Start -->
    <div class="container-fluid pt-4 px-4">
      <div class="row g-4">
        <!-- Bar Chart -->
        <div class="col-sm-12 col-xl-6">
          <div class="bg-light text-center rounded p-4">
            <div class="d-flex align-items-center justify-content-between mb-4">
              <h6 class="mb-0">Signals</h6>
              <!-- <a href="">Show All</a> -->
            </div>
            <b-card>
              <h5 class="card-title">Signals</h5>
              <div>
                <BarChart :data="barChartData" :options="barChartOptions" />
              </div>
            </b-card>
          </div>
        </div>

        <!-- Line Chart -->
        <div class="col-sm-12 col-xl-6">
          <div class="bg-light text-center rounded p-4">
            <div class="d-flex align-items-center justify-content-between mb-4">
              <h6 class="mb-0">Point Machine</h6>
              <!-- <a href="">Show All</a> -->
            </div>
            <b-card>
              <h5 class="card-title">Point Machine</h5>
              <div>
                <LineChart :data="lineChartData" :options="lineChartOptions" />
              </div>
            </b-card>
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Sales Start -->
    <div class="container-fluid pt-4 px-4">
      <div class="bg-light text-center rounded p-4">
        <div class="d-flex align-items-center justify-content-between mb-4">
          <h6 class="mb-0">Recent Activities</h6>
          <!-- <a href="">Show All</a> -->
        </div>
        <div class="table-responsive">
          <table class="table text-start align-middle table-bordered table-hover mb-0">
            <thead>
              <tr class="text-dark">
                <th scope="col">
                  <input class="form-check-input" type="checkbox" />
                </th>
                <th scope="col">Date</th>
                <th scope="col">Invoice</th>
                <th scope="col">Customer</th>
                <th scope="col">Amount</th>
                <th scope="col">Status</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><input class="form-check-input" type="checkbox" /></td>
                <td>01 Jan 2025</td>
                <td>INV-0123</td>
                <td>EEC</td>
                <td>1000</td>
                <td>Paid</td>
                <td><a class="btn btn-sm btn-primary" href="">Detail</a></td>
              </tr>
              <tr>
                <td><input class="form-check-input" type="checkbox" /></td>
                <td>01 Jan 2025</td>
                <td>INV-0123</td>
                <td>EEC</td>
                <td>1000</td>
                <td>Paid</td>
                <td><a class="btn btn-sm btn-primary" href="">Detail</a></td>
              </tr>
              <tr>
                <td><input class="form-check-input" type="checkbox" /></td>
                <td>01 Jan 2025</td>
                <td>INV-0123</td>
                <td>EEC</td>
                <td>1000</td>
                <td>Paid</td>
                <td><a class="btn btn-sm btn-primary" href="">Detail</a></td>
              </tr>
              <tr>
                <td><input class="form-check-input" type="checkbox" /></td>
                <td>01 Jan 2025</td>
                <td>INV-0123</td>
                <td>EEC</td>
                <td>1000</td>
                <td>Paid</td>
                <td><a class="btn btn-sm btn-primary" href="">Detail</a></td>
              </tr>
              <tr>
                <td><input class="form-check-input" type="checkbox" /></td>
                <td>01 Jan 2025</td>
                <td>INV-0123</td>
                <td>EEC</td>
                <td>1000</td>
                <td>Paid</td>
                <td><a class="btn btn-sm btn-primary" href="">Detail</a></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Footer Start -->
    <div class="container-fluid pt-4 px-4">
      <div class="bg-light rounded-top p-4">
        <div class="row">
          <div class="col-12 col-sm-6 text-center text-sm-start">
            &copy; <a href="#">RDPMS</a>, All Right Reserved.
          </div>
          <div class="col-12 col-sm-6 text-center text-sm-end">
            <!--/*** This template is free as long as you keep the footer author’s credit link/attribution link/backlink. If you'd like to use the template without the footer author’s credit link/attribution link/backlink, you can purchase the Credit Removal License from "https://htmlcodex.com/credit-removal". Thank you for your support. ***/-->
            Designed By <a href="">EDS INDIA</a>

            Distributed By
            <a class="border-bottom" href="#" target="_blank">EDS Software Team</a>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<script>
import { defineComponent } from 'vue';
import { Bar, Line } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  LineElement,
  Filler,
  PointElement // Add this line to register the point element
} from 'chart.js';

// Register necessary components from chart.js
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  LineElement,
  Filler,
  PointElement // Register PointElement here
);

export default defineComponent({
  components: {
    BarChart: Bar,
    LineChart: Line,
  },
  data() {
    return {
      // Bar chart data
      barChartData: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        datasets: [
          {
            label: 'Green',
            data: [1, 2, 3, 4, 5, 6, 7],
            backgroundColor: 'green', // Red
            borderColor: 'green',
            borderWidth: 1,
          },
          {
            label: 'Yellow',
            data: [1, 3, 8, 11, 2, 7, 5],
            backgroundColor: 'rgb(255, 255, 0)',  /* Yellow */
            borderColor: 'black', /* Dark Yellow */
            borderWidth: 1,
          },

          {
            label: 'Red',
            data: [5, 8, 13, 10, 7, 1, 5],
            backgroundColor: 'red', // Blue
            borderColor: 'red',
            borderWidth: 1,
          },
        ],
      },
      barChartOptions: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Signals',
          },
        },
        scales: {
          x: {
            beginAtZero: true,
          },
          y: {
            beginAtZero: true,
          },
        },
      },

      // Line chart data
      lineChartData: {
        labels: ['10:10', '10:30', '11:00', '11:30', '12:00', '12:30', '01:00'],
        datasets: [
          {
            label: 'Forward',
            data: [1, 2, 3, 4, 5, 6, 7],
            fill: true, // Fill the area under the line
            backgroundColor: 'rgba(0, 123, 255, 0.2)', // Light blue fill color
            borderColor: 'rgba(0, 123, 255, 1)', // Blue line color
            borderWidth: 2,
            tension: 0.4, // Smoothing the line
          },
          {
            label: 'Reverse',
            data: [1, 3, 8, 11, 14, 17, 21],
            fill: true, // Fill the area under the line
            backgroundColor: 'rgba(255, 99, 132, 0.2)', // Light red fill color
            borderColor: 'rgba(255, 99, 132, 1)', // Red line color
            borderWidth: 2,
            tension: 0.4, // Smoothing the line
          },
        ],
      },
      lineChartOptions: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Point Machine (Current)',
          },
        },
      },
    };
  },
});

</script>

<!-- 
<style>
.navbar{
	margin: 0px 24px;

}
</style> -->