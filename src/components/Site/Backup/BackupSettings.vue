<template>
  <section>
    <div class="p-5" v-if="Object.keys(backupSettings).length !== 0">
      <h2 class="font-semibold text-xl">Local Backup</h2>
      <div class="flex flex-row items-center mt-4">
        <label for="automatic-backup" class="w-38">Automatic Backup</label>
        <a-switch
          v-model:checked="backupSettings['automatic']"
          checked-children="ON"
          un-checked-children="OFF"
          id="automatic-backup"
        />
      </div>
      <!-- <div class="toggle checkcross flex items-center">
        <p class="text-2xl block mr-6 text-gray-700">Automated Backups</p>
        <input
          id="checkcross"
          type="checkbox"
          v-model="backupSettings['automatic']"
        />
        <label class="toggle-item bg-gray-200" for="checkcross">
          <div class="check"></div>
        </label>
      </div> -->
      <div class="flex flex-row items-center mt-4">
        <label class="w-38">Backup Frequency</label>
        <!-- <div
            class="custom-select inline-block w-44"
            :tabindex="tabindex"
            @blur="open = false"
          >
            <div
              class="selected bg-gray-200"
              :class="{ open: open }"
              @click.self="open = !open"
            >
              {{ backupSettings.frequency }}
            </div>
            <div class="items mt-2" :class="{ selectHide: !open }">
              <div
                v-for="(option, i) of backupFrequncy"
                :key="i"
                @click="
                  backupSettings.frequency = option;
                  open = false;
                  $emit('input', option);
                "
                class="hover:bg-gray-100"
              >
                <p>
                  {{ option }}
                </p>
              </div>
            </div>
          </div> -->
        <a-select
          ref="select"
          v-model:value="backupSettings['frequency']"
          style="width: 120px"
          :options="freqOptions"
        ></a-select>
      </div>
      <div class="flex flex-row items-center mt-4">
        <span class="w-38">Backup Time</span>
        <a-select
          ref="select"
          v-model:value="backupSettings['time']['hour']"
          style="width: 70px"
          :options="this.time.hour"
          :disabled="backupSettings['frequency'] == 'Hourly'"
        >
          <template #suffixIcon>HH</template>
        </a-select>
        <span class="mx-2 text-xl">:</span>
        <a-select
          ref="select"
          v-model:value="backupSettings['time']['minute']"
          style="width: 70px"
          :options="this.time.minute"
        >
          <template #suffixIcon><div id="suffix">MM</div></template>
        </a-select>
        <span class="text-gray-400 mx-2 text-sm">UTC</span>
        <a-select
          ref="select"
          v-model:value="backupSettings['time']['weekday']"
          style="width: 130px"
          :options="this.time.day"
          v-if="backupSettings.frequency == 'Weekly'"
        >
          <template #suffixIcon><div id="suffix">Day</div></template>
        </a-select>
        <a-select
          ref="select"
          v-model:value="backupSettings['time']['monthday']"
          style="width: 70px"
          :options="this.time.day"
          v-if="backupSettings.frequency == 'Monthly'"
        >
          <template #suffixIcon><div id="suffix">Day</div></template>
        </a-select>
        <!-- <div
            class="custom-select inline-block"
            :class="{
              'w-44': backupSettings.frequency == 'Weekly',
            }"
            :tabindex="tabindex"
            @blur="openDay = false"
            v-if="backupSettings.frequency == 'Weekly'"
          >
            <div
              class="selected bg-gray-200 day"
              :class="{ open: open }"
              @click.self="openDay = !openDay"
            >
              {{ backupSettings.time.weekday }}
            </div>
            <div
              class="items mt-2 h-40 overflow-auto"
              :class="{
                selectHide: !openDay,
                'w-44': backupSettings.frequency == 'Weekly',
              }"
            >
              <div
                v-for="(option, i) of time['day']"
                :key="i"
                @click="
                  backupSettings.time.weekday = option;
                  openDay = false;
                  $emit('input', option);
                "
                class="hover:bg-gray-100"
              >
                <p>
                  {{ option }}
                </p>
              </div>
            </div>
          </div> -->
        <!-- <div
            class="custom-select inline-block"
            :class="{
              'w-24': backupSettings.frequency != 'Weekly',
            }"
            :tabindex="tabindex"
            @blur="openDay = false"
            v-if="backupSettings.frequency == 'Monthly'"
          >
            <div
              class="selected bg-gray-200 day"
              :class="{ open: open }"
              @click.self="openDay = !openDay"
            >
              {{ backupSettings.time.monthday }}
            </div>
            <div
              class="items mt-2 h-40 overflow-auto"
              :class="{
                selectHide: !openDay,
                'w-24': backupSettings.frequency != 'Weekly',
              }"
            >
              <div
                v-for="(option, i) of time['day']"
                :key="i"
                @click="
                  backupSettings.time.monthday = option;
                  openDay = false;
                  $emit('input', option);
                "
                class="hover:bg-gray-100"
              >
                <p>
                  {{ option }}
                </p>
              </div>
            </div>
          </div> -->
      </div>
      <div class="flex flex-row items-center mt-4">
        <label class="w-38" for="retention">Retention Period</label>
        <a-input-number
          style="width: 60px"
          id="retention"
          v-model:value="backupSettings['retention']['time']"
          min="1"
          :max="maxRetention"
          class="mr-2"
        ></a-input-number>

        <a-select
          ref="select"
          v-model:value="backupSettings['retention']['type']"
          style="width: 120px"
          :options="retOptions"
        ></a-select>
        <!-- <div
          class="custom-select inline-block w-44 ml-4"
          :tabindex="tabindex"
          @blur="openRetention = false"
        >
          <div
            class="selected bg-gray-200"
            :class="{ open: open }"
            @click.self="openRetention = !openRetention"
          >
            {{ backupSettings.retention.type }}
          </div>
          <div class="items mt-2" :class="{ selectHide: !openRetention }">
            <div
              v-for="(option, i) of retention"
              :key="i"
              @click="
                backupSettings.retention.type = option;
                openRetention = false;
                $emit('input', option);
              "
              class="hover:bg-gray-100"
            >
              <p>
                {{ option }}
              </p>
            </div>
          </div>
        </div> -->
      </div>

      <button
        class="bg-blue-700 text-white py-1 mt-4 px-2 rounded"
        @click="updateBackup"
      >
        Update
      </button>
    </div>
  </section>
</template>

<script>
import { Switch } from "ant-design-vue";
import "ant-design-vue/lib/switch/style/index.css";
import { Select } from "ant-design-vue";
import "ant-design-vue/lib/select/style/index.css";
import { Button } from "ant-design-vue";
import "ant-design-vue/lib/button/style/index.css";
import { Input } from "ant-design-vue";
import "ant-design-vue/lib/input/style/index.css";
import { InputNumber } from "ant-design-vue";
import "ant-design-vue/lib/input-number/style/index.css";
import { useToast } from "vue-toastification";

export default {
  name: "backupSettings",
  setup() {
    const toast = useToast();
    return { toast };
  },
  data() {
    return {
      tabindex: 1,
      open: false,
      freqOptions: [
        { value: "Hourly", label: "Hourly" },
        { value: "Daily", label: "Daily" },
        { value: "Weekly", label: "Weekly" },
        { value: "Monthly", label: "Monthly" },
      ],
      openMinute: false,
      openHour: false,
      openDay: false,
      time: { hour: [], minute: [], day: [] },
      oldAutomatic: false,
      openRetention: false,
      // retention: ["Day", "Week", "Month"],

      maxRetention: 30,
      backupSettings: {},
    };
  },
  created() {
    // this.getBackup();
    this.minute();
    this.hour();
    this.getSettings();
  },

  methods: {
    getSettings() {
      if (this.$store.state.currentSite.localbackup) {
        this.oldAutomatic = JSON.parse(
          JSON.stringify(this.$store.state.currentSite.localbackup.automatic)
        );

        this.backupSettings = JSON.parse(
          JSON.stringify(this.$store.state.currentSite.localbackup)
        );
      }
    },
    updateBackup() {
      let backupType;
      let backupSettings = JSON.parse(JSON.stringify(this.backupSettings));
      if (this.oldAutomatic === backupSettings["automatic"]) {
        backupType = "existing";
      } else if (backupSettings["automatic"]) {
        backupType = "enable";
        // backupSettings["automatic"] = this.oldAutomatic;
      } else if (!backupSettings["automatic"]) {
        backupType = "disable";
        // backupSettings["automatic"] = this.oldAutomatic;
      }
      this.$axios
        .post("/site/" + this.$route.params.siteid + "/updatelocalbackup", {
          backup: backupSettings,
          type: backupType,
        })
        .then(() => {
          this.$store.commit("updateBackup", backupSettings);
          this.toast.success("Backup settings updated");
        })
        .catch(() => {
          console.log("failed");
          this.toast.error("Failed to update backup settings");
        });
    },
    takeLocalOndemandBackup() {
      fetch(
        "http://localhost/site/" +
          this.$route.params.siteid +
          "/localondemandbackup"
      );
    },
    minute() {
      for (let i = 0; i < 60; i++) {
        let num = i.toLocaleString("en-US", {
          minimumIntegerDigits: 2,
          useGrouping: false,
        });
        this.time.minute.push({ value: num, label: num });
      }
    },
    hour() {
      for (let i = 0; i < 24; i++) {
        let num = i.toLocaleString("en-US", {
          minimumIntegerDigits: 2,
          useGrouping: false,
        });
        this.time.hour.push({ value: num, label: num });
      }
    },
  },
  watch: {
    "backupSettings.retention.type"() {
      if (this.backupSettings.retention.type == "Day") {
        this.maxRetention = 30;
      } else if (this.backupSettings.retention.type == "Week") {
        this.maxRetention = 8;
      } else {
        this.maxRetention = 12;
      }
    },

    "backupSettings.frequency"() {
      if (
        this.backupSettings.frequency == "Daily" ||
        this.backupSettings.frequency == "Hourly"
      ) {
        this.backupSettings.retention.type = "Day";
      }
      if (this.backupSettings.frequency == "Weekly") {
        this.backupSettings.retention.type = "Week";
        this.time.day = [
          { value: "Monday", label: "Monday" },
          { value: "Tuesday", label: "Tuesday" },
          { value: "Wednesday", label: "Wednesday" },
          { value: "Thursday", label: "Thursday" },
          { value: "Friday", label: "Friday" },
          { value: "Saturday", label: "Saturday" },
          { value: "Sunday", label: "Sunday" },
        ];
      }
      if (this.backupSettings.frequency == "Monthly") {
        this.backupSettings.retention.type = "Month";
        this.time.day = [];
        for (let i = 1; i <= 28; i++) {
          let num = i.toLocaleString("en-US", {
            minimumIntegerDigits: 2,
            useGrouping: false,
          });
          this.time.day.push({ vale: num, label: num });
        }
      }
    },
    automatic() {
      console.log("changed automatic");
    },
    "$store.state.currentSite.localbackup": {
      deep: true,
      handler(data) {
        this.oldAutomatic = JSON.parse(JSON.stringify(data.automatic));
        this.backupSettings = JSON.parse(JSON.stringify(data));
      },
    },
  },
  computed: {
    // backupSettings() {
    //   return JSON.parse(
    //     JSON.stringify(this.$store.state.currentSite.localbackup)
    //   );
    // },
    retOptions() {
      if (
        this.backupSettings.frequency == "Daily" ||
        this.backupSettings.frequency == "Hourly"
      ) {
        return [
          { value: "Day", label: "Day" },
          { value: "Week", label: "Week" },
          { value: "Month", label: "Month" },
        ];
      }
      if (this.backupSettings.frequency == "Weekly") {
        return [
          { value: "Week", label: "Week" },
          { value: "Month", label: "Month" },
        ];
      }
      if (this.backupSettings.frequency == "Monthly") {
        return [{ value: "Month", label: "Month" }];
      }
      return [];
    },
    // backupSettings() {
    //   this.oldAutomatic = this.$store.state.currentSite.localbackup.automatic;
    //   return this.$store.state.currentSite.localbackup;
    // },
  },

  components: {
    ASwitch: Switch,
    ASelect: Select,
    AButton: Button,
    AInput: Input,
    AInputNumber: InputNumber,
  },
};
</script>

<style lang="scss">
* {
  box-sizing: border-box;
  &:before,
  &:after {
    content: "";
    position: absolute;
  }
}

#checkcross {
  //   height: 40px;
  //   left: 0;
  //   opacity: 0;
  //   position: absolute;
  //   top: 0;
  //   width: 40px;
  display: none;
}

// .toggle {
//   position: relative;
//   display: block;
// }

label.toggle-item {
  width: 7em;
  height: 3em;
  display: inline-block;
  border-radius: 50px;
  position: relative;
  transition: all 0.3s ease;
  transform-origin: 20% center;
  cursor: pointer;
  &:before {
    display: block;
    transition: all 0.2s ease;
    width: 2.3em;
    height: 2.3em;
    top: 0.25em;
    left: 0.25em;
    border-radius: 2em;
    border: 2px solid #88cf8f;
    transition: 0.3s ease;
  }
}

.checkcross {
  label:before {
    content: none;
  }
  .check {
    border-radius: 50%;
    width: 2.5em;
    height: 2.5em;
    position: absolute;
    background: #c34a4a;

    transition: 0.4s ease;
    top: 2.5px;
    &:before,
    &:after {
      height: 3px;
      border-radius: 10px;
      background: #fff;
      transition: 0.4s ease;
    }

    &:before {
      width: 20px;
      transform: rotate(-45deg) translate(-6px, 9px);
    }
    &:after {
      width: 20px;
      transform: rotate(45deg) translate(9px, 6px);
    }
    left: 2.5px;
  }
}

#checkcross:checked + label {
  .check {
    transform: rotate(360deg);
    background: #8bc34a;

    &:before {
      width: 14px;
      transform: rotate(-45deg) translate(-3px, 14px);
    }
    &:after {
      width: 10px;
      transform: rotate(45deg) translate(12px, 8px);
    }
    left: 43px;
  }
}

.minute::before {
  content: "Minute";
  top: -23px;
  color: gray;
  left: 0;
}

.hour::before {
  content: "Hour";
  top: -23px;
  color: gray;
  left: 0;
}

.day::before {
  content: "Day";
  top: -23px;
  color: gray;
  left: 0;
}

#suffix {
  margin-left: -4px;
}

#automatic-backup {
  width: 52px;
}
</style>
