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
          :disabled="!backupSettings['automatic']"
        ></a-select>
      </div>
      <div class="flex flex-row items-center mt-4">
        <span class="w-38">Backup Time</span>
        <a-select
          ref="select"
          v-model:value="backupSettings['time']['hour']"
          style="width: 70px"
          :options="this.time.hour"
          :disabled="
            backupSettings['frequency'] == 'Hourly' ||
            !backupSettings['automatic']
          "
        >
          <template #suffixIcon><div id="suffix">HH</div></template>
        </a-select>
        <span class="mx-2 text-xl">:</span>
        <a-select
          ref="select"
          v-model:value="backupSettings['time']['minute']"
          style="width: 70px"
          :options="this.time.minute"
          :disabled="!backupSettings['automatic']"
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
          :disabled="!backupSettings['automatic']"
        >
          <template #suffixIcon><div id="suffix">Day</div></template>
        </a-select>
        <a-select
          ref="select"
          v-model:value="backupSettings['time']['monthday']"
          style="width: 70px"
          :options="this.time.day"
          v-if="backupSettings.frequency == 'Monthly'"
          :disabled="!backupSettings['automatic']"
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
          :disabled="!backupSettings['automatic']"
        ></a-input-number>

        <a-select
          ref="select"
          v-model:value="backupSettings['retention']['type']"
          style="width: 120px"
          :options="retOptions"
          :disabled="!backupSettings['automatic']"
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
  <hr class="border" />
  <RemoteBackupSettings></RemoteBackupSettings>
</template>

<script>
// import { Switch } from "ant-design-vue";
import { Select } from "ant-design-vue";
// import { useToast } from "vue-toastification";
import RemoteBackupSettings from "./RemoteBackupSettings.vue";

export default {
  name: "backupSettings",

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
          this.$toast.success("Backup settings updated");
        })
        .catch((err) => {
          console.log(err);
          this.$toast.error("Failed to update backup settings");
        });
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
    // ASwitch: Switch,
    ASelect: Select,
    // AButton: Button,
    // AInput: Input,
    // AInputNumber: InputNumber,
    RemoteBackupSettings,
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

// .toggle {
//   position: relative;
//   display: block;
// }

#suffix {
  margin-left: -4px !important;
  font-size: 12px !important;
}

#automatic-backup {
  width: 52px;
}

.ant-switch-inner {
  font-size: 12px !important;
}
</style>
