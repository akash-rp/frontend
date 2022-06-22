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
          <div class="flex flex-row justify-between items-center">
            <h1 class="text-xl font-semibold p-5">CPU Usage</h1>
            <div class="pr-5">
              <a-select
                ref="select"
                v-model:value="time.cpu"
                style="width: 120px"
                :options="timeOptions"
                @change="fetchIndividualMetrics('cpu', time.cpu)"
              ></a-select>
            </div>
          </div>
          <apexchart
            :is="Component"
            :key="$route.fullPath"
            height="400"
            type="area"
            :options="chartOptions.cpuChartOptions"
            :series="this.metrics.cpu"
            v-if="renderChart"
          ></apexchart>
        </div>
        <div class="">
          <div class="flex flex-row justify-between items-center">
            <h1 class="text-xl font-semibold p-5">Load</h1>
            <div class="pr-5">
              <a-select
                ref="select"
                v-model:value="time.load"
                style="width: 120px"
                :options="timeOptions"
                @change="fetchIndividualMetrics('load', time.load)"
              ></a-select>
            </div>
          </div>
          <apexchart
            height="400px"
            type="area"
            :options="chartOptions.loadChartOptions"
            :series="this.metrics.load"
            v-if="renderChart"
          ></apexchart>
        </div>
        <div class="">
          <div class="flex flex-row justify-between items-center">
            <h1 class="text-xl font-semibold p-5">Memory Usage</h1>
            <div class="pr-5">
              <a-select
                ref="select"
                v-model:value="time.memory"
                style="width: 120px"
                :options="timeOptions"
                @change="fetchIndividualMetrics('memory', time.memory)"
              ></a-select>
            </div>
          </div>
          <apexchart
            height="400px"
            type="area"
            :options="memoryOptions"
            :series="this.metrics.memory"
            v-if="renderChart"
          ></apexchart>
        </div>
        <div class="">
          <div class="flex flex-row justify-between items-center">
            <h1 class="text-xl font-semibold p-5">Disk Usage</h1>
            <div class="pr-5">
              <a-select
                ref="select"
                v-model:value="time.disk"
                style="width: 120px"
                :options="timeOptions"
                @change="fetchIndividualMetrics('disk', time.disk)"
              ></a-select>
            </div>
          </div>
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
import { object } from "vue-types";
// import ApexCharts from "apexcharts";

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
          tooltip: {
            y: {
              title: {
                formatter: () => "",
              },
            },
            x: {
              show: false,
              formatter: (a) => {
                return new Date(a).toLocaleTimeString("en-US", {
                  hour12: false,
                  hour: "2-digit",
                  minute: "2-digit",
                });
              },
            },
            marker: {
              show: false,
            },
          },
          chart: {
            id: "cpu",
            toolbar: { show: false },
            animations: {
              enabled: true,
              easing: "linear",
              speed: 100,
              animateGradually: {
                enabled: false,
                delay: 150,
              },
              dynamicAnimation: {
                enabled: true,
                speed: 800,
              },
            },
          },
          xaxis: {
            type: "datetime",
            labels: {
              datetimeFormatter: {
                year: "yyyy",
                month: "MMM 'yy",
                day: "dd MMM",
                hour: "HH:mm",
                minute: "HH:mm",
              },
              datetimeUTC: false,
            },
            crosshairs: {
              show: false,
            },
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

          noData: {
            text: "Loading",
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
          tooltip: {
            y: {
              title: {
                formatter: () => "",
              },
            },
            x: {
              show: false,
              formatter: (a) => {
                return new Date(a).toLocaleTimeString("en-US", {
                  hour12: false,
                  hour: "2-digit",
                  minute: "2-digit",
                });
              },
            },
            marker: {
              show: false,
            },
          },
          chart: {
            id: "Memory",
            toolbar: { show: false },
          },
          xaxis: {
            type: "datetime",
            labels: {
              datetimeFormatter: {
                year: "yyyy",
                month: "MMM 'yy",
                day: "dd MMM",
                hour: "HH:mm",
                minute: "HH:mm",
              },
              datetimeUTC: false,
            },
            crosshairs: {
              show: false,
            },
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
          tooltip: {
            y: {
              title: {
                formatter: () => "",
              },
            },
            x: {
              show: false,
              formatter: (a) => {
                return new Date(a).toLocaleTimeString("en-US", {
                  hour12: false,
                  hour: "2-digit",
                  minute: "2-digit",
                });
              },
            },
            marker: {
              show: false,
            },
          },
          chart: {
            id: "load",
            toolbar: { show: false },
          },
          xaxis: {
            type: "datetime",
            labels: {
              datetimeFormatter: {
                year: "yyyy",
                month: "MMM 'yy",
                day: "dd MMM",
                hour: "HH:mm",
                minute: "HH:mm",
              },
              datetimeUTC: false,
            },
            crosshairs: {
              show: false,
            },
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
          tooltip: {
            y: {
              title: {
                formatter: () => "",
              },
            },
            x: {
              show: false,
              formatter: (a) => {
                return new Date(a).toLocaleTimeString("en-US", {
                  hour12: false,
                  hour: "2-digit",
                  minute: "2-digit",
                });
              },
            },
            marker: {
              show: false,
            },
          },
          chart: {
            id: "disk",
            toolbar: { show: false },
          },
          xaxis: {
            type: "datetime",
            labels: {
              datetimeFormatter: {
                year: "yyyy",
                month: "MMM 'yy",
                day: "dd MMM",
                hour: "HH:mm",
                minute: "HH:mm",
              },
              datetimeUTC: false,
            },
            crosshairs: {
              show: false,
            },
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
      time: {
        cpu: "1hr",
        memory: "1hr",
        disk: "1hr",
        load: "1hr",
      },
      timeOptions: [
        {
          value: "1hr",
          label: "1 Hour",
        },
        {
          value: "3hr",
          label: "3 Hours",
        },
        {
          value: "6hr",
          label: "6 Hours",
        },
        {
          value: "12hr",
          label: "12 Hours",
        },
        {
          value: "1day",
          label: "1 Day",
        },
        {
          value: "3days",
          label: "3 Days",
        },
        {
          value: "7days",
          label: "7 Days",
        },
        {
          value: "14days",
          label: "14 Days",
        },
      ],
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
        })
        .catch(() => {
          this.fetchError = true;
          this.toast.error("Failed to fetch Server Health");
        });
    },
    fetchIndividualMetrics(metric, duration) {
      this.$axios
        .get(
          "/server/" +
            this.$route.params.serverid +
            "/health/" +
            metric +
            "/" +
            duration
        )
        .then((res) => {
          this.metrics[metric] = [
            { data: res.data.map((data) => Object.values(data)) },
          ];
        })
        .catch(() => {
          this.$toast.error("Failed to fetch metrics");
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
    this.metrics = {
      cpu: [],
      memory: [],
      load: [],
      disk: [],
    };
    this.time = {
      cpu: "1hr",
      memory: "1hr",
      disk: "1hr",
      load: "1hr",
    };
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
