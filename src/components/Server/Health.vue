<template>
  <div class="bg-white w-full shadow rounded">
    <div class="flex flex-col divide-y-2">
      <div>
        <h1 class="text-xl font-semibold p-5">Server Health</h1>
        <p class="pb-5 px-5 text-gray-500">
          Metrics of server health are collected every 1 minute. CPU usage
          greater than 80%, Load greater than number of cores, Memory usage
          greater than 80% of available memory indicates that the server needs
          to be upgraded.
        </p>
      </div>
      <div class="flex flex-col divide-y-2">
        <div class="">
          <h1 class="text-xl font-semibold p-5">CPU Usage</h1>
          <apexchart
            :is="Component"
            :key="$route.fullPath"
            height="400"
            type="area"
            :options="chartOptions.cpuChartOptions"
            :series="$store.state.cpuMetrics"
            v-if="renderChart"
          ></apexchart>
        </div>
        <div class="">
          <h1 class="text-xl font-semibold p-5">Load</h1>
          <apexchart
            height="400px"
            type="area"
            :options="chartOptions.loadChartOptions"
            :series="this.metrics.load"
            v-if="renderChart"
          ></apexchart>
        </div>
        <div class="">
          <h1 class="text-xl font-semibold p-5">Memory Usage</h1>
          <apexchart
            height="400px"
            type="area"
            :options="memoryOptions"
            :series="this.metrics.memory"
            v-if="renderChart"
          ></apexchart>
        </div>
        <div class="">
          <h1 class="text-xl font-semibold p-5">Disk Usage</h1>
          <apexchart
            height="400px"
            type="area"
            :options="chartOptions.diskChartOptions"
            :series="this.metrics.disk"
            v-if="renderChart"
          ></apexchart>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueApexCharts from "vue3-apexcharts";
import { useToast } from "vue-toastification";
import ApexCharts from "apexcharts";

export default {
  name: "health",
  components: {
    apexchart: VueApexCharts,
  },
  setup() {
    const toast = useToast();
    return { toast };
  },
  data() {
    return {
      // server: {
      //   stats: {
      //     totalMemory: 0,
      //     totalDisk: 0,
      //     cores: 0,
      //   },
      // },
      renderChart: false,
      fetchError: false,
      chartOptions: {
        cpuChartOptions: {
          chart: {
            id: "cpu",
            toolbar: { show: false },
          },
          xaxis: {
            type: "datetime",
          },
          yaxis: {
            min: 0,
            max: 100,
            tickAmount: 1,
            labels: {
              formatter: function (value) {
                return value + "%";
              },
            },
          },
          animations: {
            enabled: false,
            easing: "easeinout",
            speed: 800,
            animateGradually: {
              enabled: false,
              delay: 150,
            },
            dynamicAnimation: {
              enabled: false,
              speed: 350,
            },
          },
          noData: {
            text: "Loaing",
            align: "center",
            verticalAlign: "middle",
            offsetX: 0,
            offsetY: 0,
            style: {
              color: undefined,
              fontSize: "14px",
              fontFamily: undefined,
            },
          },
          colors: ["#3730a3"],
          stroke: {
            curve: "smooth",
          },
          dataLabels: {
            enabled: false,
          },
        },
        memoryChartOptions: {
          chart: {
            id: "Memory",
            toolbar: { show: false },
          },
          xaxis: {
            type: "datetime",
          },
          yaxis: {
            min: 0,
            max: parseInt(this.$store.state.currentServer["stats"].totalMemory),
            tickAmount: 1,
            labels: {
              formatter: function (value) {
                return value + " MB";
              },
            },
          },
          colors: ["#3730a3"],

          stroke: {
            curve: "smooth",
          },

          dataLabels: {
            enabled: false,
          },
        },
        loadChartOptions: {
          chart: {
            id: "load",
            toolbar: { show: false },
          },
          xaxis: {
            type: "datetime",
          },
          yaxis: {
            min: 0,
            max: parseInt(this.$store.state.currentServer["stats"].cores),
            tickAmount: 1,
          },
          colors: ["#3730a3"],

          stroke: {
            curve: "smooth",
          },
          dataLabels: {
            enabled: false,
          },
        },
        diskChartOptions: {
          chart: {
            id: "disk",
            toolbar: { show: false },
          },
          xaxis: {
            type: "datetime",
          },
          yaxis: {
            min: 0,
            max: parseInt(this.$store.state.currentServer["stats"].totalDisk),
            tickAmount: 1,
            labels: {
              formatter: function (value) {
                return value + " GB";
              },
            },
          },
          colors: ["#3730a3"],

          stroke: {
            curve: "smooth",
          },
          dataLabels: {
            enabled: false,
          },
        },
      },
      metrics: {
        cpu: [],
        memory: [],
        load: [],
        disk: [],
      },
    };
  },
  methods: {
    fetchMetrics() {
      this.$axios
        .get("/server/" + this.$route.params.serverid + "/health")
        .then((res) => {
          var cpu = res.data["cpu"].map((data) => Object.values(data));
          var memory = res.data["memory"].map((data) => Object.values(data));
          var load = res.data["load"].map((data) => Object.values(data));
          var disk = res.data["disk"].map((data) => Object.values(data));

          this.metrics = {
            cpu: [{ data: cpu }],
            memory: [{ data: memory }],
            load: [{ data: load }],
            disk: [{ data: disk }],
          };
          this.$store.commit("addMetrics", cpu);
        })
        .catch(() => {
          this.fetchError = true;
          this.toast.error("Failed to fetch Server Health", {
            position: "top-right",
            timeout: 5000,
            closeOnClick: false,
            pauseOnFocusLoss: false,
            pauseOnHover: false,
            draggable: false,
            draggablePercent: 0.6,
            showCloseButtonOnHover: true,
            hideProgressBar: true,
            closeButton: "button",
            icon: true,
            rtl: false,
          });
        });
    },
  },
  activated() {
    this.$nextTick(() => {
      this.renderChart = true;
    }),
      this.fetchMetrics();
  },
  deactivated() {
    this.renderChart = false;
  },
  computed: {
    memoryOptions() {
      return this.chartOptions.memoryChartOptions;
    },
  },
  watch: {
    "$store.state.currentServer.stats": {
      deep: true,
      handler(data) {
        console.log("running");
        // console.log(data);
        this.chartOptions.memoryChartOptions = {
          ...this.chartOptions.memoryChartOptions,
          ...{
            yaxis: {
              min: 0,
              max: parseInt(
                this.$store.state.currentServer["stats"].totalMemory
              ),
              tickAmount: 1,
              labels: {
                formatter: function (value) {
                  return value + " MB";
                },
              },
            },
          },
        };
        this.chartOptions.diskChartOptions = {
          ...this.chartOptions.diskChartOptions,
          ...{
            yaxis: {
              min: 0,
              max: parseInt(this.$store.state.currentServer["stats"].totalDisk),
              tickAmount: 1,
              labels: {
                formatter: function (value) {
                  return value + " GB";
                },
              },
            },
          },
        };
        this.chartOptions.loadChartOptions = {
          ...this.chartOptions.loadChartOptions,
          ...{
            yaxis: {
              min: 0,
              max: parseInt(this.$store.state.currentServer["stats"].cores),
              tickAmount: 1,
            },
          },
        };
        // this.chartOptions.memoryChartOptions =
        //   this.chartOptions.memoryChartOptions;
      },
    },
  },
};
</script>

<style lang="scss" scoped></style>
