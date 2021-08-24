<template>
  <div class="main">
    <div class="Server_info">
      <div class="Server_cpu box padding">
        <div class="info">
          <p class="info_title">CPU INFO</p>
          <svg
            class="info_svg"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M8 1C8.55228 1 9 1.44772 9 2V3H11V2C11 1.44772 11.4477 1 12 1C12.5523 1 13 1.44772 13 2V3H15V2C15 1.44772 15.4477 1 16 1C16.5523 1 17 1.44772 17 2V3H18C19.6569 3 21 4.34315 21 6V7H22C22.5523 7 23 7.44772 23 8C23 8.55228 22.5523 9 22 9H21V11H22C22.5523 11 23 11.4477 23 12C23 12.5523 22.5523 13 22 13H21V15H22C22.5523 15 23 15.4477 23 16C23 16.5523 22.5523 17 22 17H21V18C21 19.6569 19.6569 21 18 21H17V22C17 22.5523 16.5523 23 16 23C15.4477 23 15 22.5523 15 22V21H13V22C13 22.5523 12.5523 23 12 23C11.4477 23 11 22.5523 11 22V21H9V22C9 22.5523 8.55228 23 8 23C7.44772 23 7 22.5523 7 22V21H6C4.34315 21 3 19.6569 3 18V17H2C1.44772 17 1 16.5523 1 16C1 15.4477 1.44772 15 2 15H3V13H2C1.44772 13 1 12.5523 1 12C1 11.4477 1.44772 11 2 11H3V9H2C1.44772 9 1 8.55228 1 8C1 7.44772 1.44772 7 2 7H3V6C3 4.34315 4.34315 3 6 3H7V2C7 1.44772 7.44772 1 8 1ZM6 5C5.44772 5 5 5.44772 5 6V18C5 18.5523 5.44772 19 6 19H18C18.5523 19 19 18.5523 19 18V6C19 5.44772 18.5523 5 18 5H6ZM7 8C7 7.44772 7.44772 7 8 7H16C16.5523 7 17 7.44772 17 8V16C17 16.5523 16.5523 17 16 17H8C7.44772 17 7 16.5523 7 16V8ZM9 9V15H15V9H9Z"
              fill="#293644"
            />
          </svg>
        </div>
        <div class="details">
          <p class="cores">{{ server.cores }} Core</p>
          <p class="cpu">{{ server.cpu }}</p>
        </div>
      </div>
      <div class="Server_memory box padding">
        <div class="info">
          <p class="info_title">MEMORY USAGE</p>
          <svg
            class="info_svg"
            version="1.1"
            id="Capa_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            width="946px"
            height="946px"
            viewBox="0 0 946 946"
            style="enable-background:new 0 0 946 946;"
            xml:space="preserve"
          >
            <g>
              <g>
                <rect x="431.7" y="589.899" width="82.6" height="77.9" />
                <rect x="304.2" y="589.899" width="82.6" height="77.9" />
                <rect x="52.7" y="589.899" width="79" height="77.9" />
                <rect x="176.6" y="589.899" width="82.6" height="77.9" />
                <rect x="814.4" y="589.899" width="79" height="77.9" />
                <rect x="559.3" y="589.899" width="82.601" height="77.9" />
                <rect x="686.8" y="589.899" width="82.601" height="77.9" />
                <path
                  d="M896,278.2H50c-27.6,0-50,22.4-50,50v34.3c29.1,0,52.7,23.6,52.7,52.7C52.7,444.3,29.1,467.9,0,467.9v84.3h946v-84.3
			c-29.1,0-52.7-23.6-52.7-52.699c0-29.101,23.601-52.7,52.7-52.7v-34.3C946,300.5,923.6,278.2,896,278.2z M253.1,434.1
			c0,27.601-22.4,50-50,50h-38c-27.6,0-50-22.4-50-50v-38c0-27.6,22.4-50,50-50h38c27.6,0,50,22.4,50,50V434.1z M542,434.1
			c0,27.601-22.4,50-50,50h-38c-27.6,0-50-22.4-50-50v-38c0-27.6,22.4-50,50-50h38c27.6,0,50,22.4,50,50V434.1z M829.9,434.1
			c0,27.601-22.4,50-50,50h-38c-27.601,0-50-22.4-50-50v-38c0-27.6,22.399-50,50-50h38c27.6,0,50,22.4,50,50V434.1z"
                />
              </g>
            </g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
          </svg>
        </div>
        <div class="details">
          <div class="bar">
            <div
              class="bar_used bar_text"
              :style="{ width: percentMemory + '%' }"
            >
              {{ percentMemory }}%
            </div>
          </div>
          <div class="bar_usage">
            <p>0</p>
            <p>{{ Number(server.totalMemory / 1000).toFixed(2) + "GB" }}</p>
          </div>
        </div>
      </div>
      <div class="Server_disk box padding">
        <div class="info">
          <p class="info_title">DISK USAGE</p>
          <svg
            class="info_svg"
            version="1.1"
            id="Capa_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            width="870px"
            height="870px"
            viewBox="0 0 870 870"
            style="enable-background:new 0 0 870 870;"
            xml:space="preserve"
          >
            <g>
              <g>
                <path
                  d="M180,870h510c27.6,0,50-22.4,50-50V50c0-27.6-22.4-50-50-50H180c-27.6,0-50,22.4-50,50v770C130,847.6,152.4,870,180,870z M653.9,808.6c-16.601,0-30-13.399-30-30c0-16.6,13.399-30,30-30c16.6,0,30,13.4,30,30C683.9,795.2,670.5,808.6,653.9,808.6z M653.9,68c16.6,0,30,13.4,30,30s-13.4,30-30,30c-16.601,0-30-13.4-30-30S637.3,68,653.9,68z M435,90.4
			c129.6,0,234.7,105.1,234.7,234.7S564.6,559.8,435,559.8c-20.4,0-40.2-2.6-59.1-7.5l44.1-74.8c13.1-22.2-12-47.4-34.2-34.2
			l-102.3,60.3c-0.2,0.101-0.3,0.2-0.4,0.301c-50.6-43-82.7-107.2-82.7-178.8C200.3,195.5,305.4,90.4,435,90.4z M222.1,68
			c16.6,0,30,13.4,30,30s-13.399,30-30,30s-30-13.4-30-30S205.5,68,222.1,68z M222.1,748.6c16.6,0,30,13.4,30,30
			c0,16.601-13.399,30-30,30s-30-13.399-30-30C192.1,762.1,205.5,748.6,222.1,748.6z"
                />
                <circle cx="435" cy="325.1" r="62.7" />
              </g>
            </g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
          </svg>
        </div>
        <div class="details">
          <div class="bar">
            <div
              class="bar_used bar_text"
              :style="{ width: percentDisk + '%' }"
            >
              {{ percentDisk }}%
            </div>
          </div>
          <div class="bar_usage">
            <p>0</p>
            <p>{{ parseInt(server.totalDisk) + "GB" }}</p>
          </div>
        </div>
      </div>
      <div class="Server_band box padding">
        <div class="info">
          <p class="info_title">DATA USAGE</p>
          <svg
            class="info_svg"
            version="1.1"
            id="Capa_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 382.169 382.169"
            style="enable-background:new 0 0 382.169 382.169;"
            xml:space="preserve"
          >
            <path
              d="M191.084,0C85.72,0,0,85.72,0,191.084s85.72,191.084,191.084,191.084c105.365,0,191.084-85.72,191.084-191.084
	S296.449,0,191.084,0z M366.998,183.584H328.06c-0.993-36.182-9.156-70.613-23.534-100.029c5.258-3.894,10.338-8.08,15.227-12.542
	C347.554,100.786,365.169,140.176,366.998,183.584z M235.969,59.18c-4.794-16.515-10.369-29.696-16.591-39.397
	c26.124,8.974,49.019,30.085,65.649,58.963c-12.658,8.013-26.239,14.332-40.454,18.847C242.229,83.745,239.351,70.833,235.969,59.18
	z M230.042,101.533c-12.644,2.845-25.69,4.31-38.954,4.31c-13.266,0-26.314-1.466-38.961-4.312
	C161.302,46.523,177.969,15,191.084,15C204.2,15,220.867,46.523,230.042,101.533z M145.342,183.584
	c0.281-24.778,1.945-47.273,4.571-67.176c13.379,2.927,27.165,4.435,41.175,4.435c14.008,0,27.792-1.508,41.168-4.434
	c2.626,19.903,4.289,42.398,4.571,67.174H145.342z M236.827,198.584c-0.281,24.78-1.945,47.277-4.572,67.182
	c-13.376-2.926-27.16-4.433-41.167-4.433c-14.009,0-27.795,1.508-41.174,4.435c-2.627-19.906-4.291-42.403-4.572-67.184H236.827z
	M162.792,19.783c-6.222,9.701-11.797,22.882-16.591,39.397c-3.383,11.653-6.26,24.563-8.603,38.41	c-14.214-4.515-27.795-10.833-40.453-18.846C113.774,49.867,136.669,28.757,162.792,19.783z M135.317,112.602
	c-2.988,22.089-4.69,46.115-4.976,70.983H69.115c0.988-33.82,8.617-65.203,21.057-91.497
	C104.291,100.898,119.451,107.781,135.317,112.602z M130.342,198.584c0.286,24.871,1.988,48.9,4.977,70.991
	c-15.865,4.82-31.025,11.702-45.144,20.513c-12.442-26.296-20.072-57.681-21.06-91.504H130.342z M137.599,284.586
	c2.343,13.844,5.22,26.752,8.602,38.403c4.794,16.515,10.369,29.696,16.591,39.397c-26.121-8.974-49.015-30.082-65.644-58.955
	C109.805,295.419,123.385,289.101,137.599,284.586z M152.128,280.646c12.646-2.846,25.694-4.312,38.959-4.312
	c13.263,0,26.309,1.465,38.953,4.31c-9.176,55.005-25.841,86.525-38.956,86.525C177.969,367.169,161.304,335.649,152.128,280.646z
	M219.377,362.386c6.222-9.701,11.797-22.882,16.591-39.396c3.382-11.651,6.26-24.56,8.602-38.405
	c14.214,4.515,27.795,10.833,40.452,18.845C268.393,332.303,245.499,353.412,219.377,362.386z M246.851,269.573
	c2.988-22.09,4.69-46.118,4.976-70.989h61.227c-0.988,33.822-8.618,65.206-21.059,91.502
	C277.877,281.276,262.717,274.393,246.851,269.573z M251.827,183.584c-0.285-24.867-1.987-48.893-4.975-70.981
	c15.867-4.82,31.028-11.703,45.146-20.515c12.44,26.294,20.068,57.676,21.056,91.496H251.827z M309.053,60.475
	c-3.778,3.416-7.682,6.65-11.698,9.701c-2.677-4.563-5.511-8.981-8.51-13.23c-6.429-9.109-13.402-17.199-20.816-24.221
	C283.012,40.035,296.812,49.407,309.053,60.475z M93.324,56.946c-3,4.249-5.834,8.668-8.51,13.23c-4.017-3.051-7.921-6.284-11.7-9.7
	c12.242-11.068,26.042-20.441,41.027-27.751C106.726,39.746,99.754,47.837,93.324,56.946z M62.415,71.014
	c4.89,4.461,9.97,8.647,15.229,12.54c-14.378,29.416-22.542,63.847-23.535,100.03H15.171C17,140.176,34.615,100.786,62.415,71.014z
	M15.171,198.584h38.938c0.993,36.185,9.158,70.619,23.537,100.036c-5.258,3.893-10.338,8.078-15.227,12.539
	C34.616,281.386,17,241.995,15.171,198.584z M73.119,321.697c3.778-3.415,7.682-6.648,11.698-9.698
	c2.676,4.56,5.509,8.977,8.507,13.225c6.429,9.108,13.401,17.199,20.816,24.22C99.158,342.135,85.36,332.763,73.119,321.697z
	M288.844,325.224c2.999-4.248,5.832-8.665,8.508-13.225c4.016,3.051,7.92,6.284,11.697,9.7
	c-12.24,11.066-26.038,20.437-41.02,27.746C275.443,342.422,282.415,334.332,288.844,325.224z M319.749,311.16
	c-4.889-4.461-9.968-8.647-15.226-12.54c14.38-29.417,22.544-63.851,23.537-100.035h38.938
	C365.169,241.996,347.552,281.387,319.749,311.16z"
            />
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
          </svg>
        </div>
        <div class="details">{{ server.bandwidth }}</div>
      </div>
    </div>
    <div class="Server_summary">
      <server-summary></server-summary>
    </div>
  </div>
</template>

<script>
import ServerSummary from "./ServerSummary.vue";

export default {
  components: { ServerSummary },
  props: ["server"],
  data() {
    return {
      percentMemory: Math.round(
        (this.$props.server.usedMemory / this.$props.server.totalMemory) * 100
      ),
      percentDisk: Math.round(
        (parseFloat(this.$props.server.usedDisk) /
          parseFloat(this.$props.server.totalDisk)) *
          100
      ),
    };
  },
  watch: {
    server() {
      this.percentMemory = Math.round(
        (this.$props.server.usedMemory / this.$props.server.totalMemory) * 100
      );
      this.percentDisk = Math.round(
        (parseFloat(this.$props.server.usedDisk) /
          parseFloat(this.$props.server.totalDisk)) *
          100
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.Server {
  &_info {
    padding: 1rem;
    padding-left: 0;
    display: flex;
  }
  &_cpu {
    display: flex;
    flex-direction: column;
    flex: 1;
  }
  &_memory {
    flex: 1;
  }
  &_disk {
    flex: 1;
  }
  &_band {
    flex: 1;
  }
  &_summary {
    display: grid;
    grid-template-columns: [first] 50% [line2] auto [end];
    grid-template-rows: [row1-start] auto [row1-end] auto [third-line] auto [last-line];
  }
}

.box {
  padding: 1rem;
  margin-right: 1rem;
  background-color: white;
  border-radius: 3px;
  box-shadow: 0px 2px 5px 1px rgba(64, 60, 67, 0.16);
}
.bar {
  width: 100%;
  background-color: #e3e0e0;
  height: 30px;
  border-radius: 5px;
  box-shadow: inset 0px 0px 4px rgba(2, 2, 2, 0.3);
}

.bar_text {
  color: white;
  font-size: var(--font-size-primary);
  display: flex;
  align-items: center;
  float: left;
  flex-direction: row-reverse;
}

.bar_used {
  background-color: royalblue;
  height: 30px;
  border-bottom-left-radius: 5px;
  border-top-left-radius: 5px;
} /* Green */

.bar_usage {
  display: flex;
  justify-content: space-between;
  font-size: var(--font-size-primary);
}

.details {
  margin-top: 1rem;
  font-size: 2rem;
  text-align: center;
}

.info {
  display: flex;
  justify-content: space-between;
  &_title {
    font-size: var(--font-size-small-header);
    color: royalblue;
    align-self: center;
    font-weight: bolder;
  }
  &_svg {
    height: 3rem;
    width: 3rem;
  }
}
</style>
