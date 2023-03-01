<template>
  <a-form
    class=""
    :model="remoteBackup"
    name="remoteSettings"
    id="remoteSettings"
    autocomplete="off"
    @finish="updateSettings"
    :hideRequiredMark="true"
    layout="horizontal"
    :colon="false"
  >
    <a-form-item name="automatic" label="Automatic Backup">
      <a-switch
        v-model:checked="remoteBackup.automatic"
        checked-children="ON"
        un-checked-children="OFF"
        id="automatic-backup"
      />
    </a-form-item>
    <a-form-item name="frequency" label="Backup Frequency">
      <a-select
        ref="select"
        v-model:value="remoteBackup['frequency']"
        style="width: 120px"
        :options="freqOptions"
        :disabled="!remoteBackup['automatic']"
      ></a-select>
    </a-form-item>
    <a-form-item-rest name="time" label="Backup Time" class="">
      <div class="flex flex-row items-center mb-5">
        <label class="inline w-38">Backup Time</label>
        <a-select
          ref="select"
          v-model:value="remoteBackup['time']['hour']"
          style="width: 70px"
          :options="this.time.hour"
          :disabled="
            remoteBackup['frequency'] == 'Hourly' || !remoteBackup['automatic']
          "
        >
          <template #suffixIcon><div id="suffix">HH</div></template>
        </a-select>
        <span class="text-xl m-2">:</span>
        <a-select
          ref="select"
          v-model:value="remoteBackup['time']['minute']"
          style="width: 70px"
          :options="this.time.minute"
          :disabled="!remoteBackup['automatic']"
        >
          <template #suffixIcon><div id="suffix">MM</div></template>
        </a-select>
        <span class="text-gray-400 mx-2 text-sm">UTC</span>
        <a-select
          ref="select"
          v-model:value="remoteBackup['time']['weekday']"
          style="width: 130px"
          :options="this.time.day"
          v-if="remoteBackup.frequency == 'Weekly'"
          :disabled="!remoteBackup['automatic']"
        >
          <template #suffixIcon><div id="suffix">Day</div></template>
        </a-select>
        <a-select
          ref="select"
          v-model:value="remoteBackup['time']['monthday']"
          style="width: 70px"
          :options="this.time.day"
          v-if="remoteBackup.frequency == 'Monthly'"
          :disabled="!remoteBackup['automatic']"
        >
          <template #suffixIcon><div id="suffix">Day</div></template>
        </a-select>
      </div>
    </a-form-item-rest>
    <a-form-item-rest>
      <div class="flex flex-row items-center">
        <label class="inline w-38">Retention Period</label>
        <a-input-number
          style="width: 60px"
          id="retention"
          v-model:value="remoteBackup['retention']['time']"
          min="1"
          :max="maxRetention"
          class="mr-2"
          :disabled="!remoteBackup['automatic']"
        ></a-input-number>

        <a-select
          ref="select"
          v-model:value="remoteBackup['retention']['type']"
          style="width: 120px"
          :options="retOptions"
          :disabled="!remoteBackup['automatic']"
        ></a-select>
      </div>
    </a-form-item-rest>
  </a-form>
</template>

<script>
export default {
  props: ["settings"],
  data() {
    return {
      freqOptions: [
        { value: "Hourly", label: "Hourly" },
        { value: "Daily", label: "Daily" },
        { value: "Weekly", label: "Weekly" },
        { value: "Monthly", label: "Monthly" },
      ],
      time: { hour: [], minute: [], day: [] },
      maxRetention: 30,
      remoteBackup: {},
    };
  },
  computed: {
    retOptions() {
      if (
        this.remoteBackup.frequency == "Daily" ||
        this.remoteBackup.frequency == "Hourly"
      ) {
        return [
          { value: "Day", label: "Day" },
          { value: "Week", label: "Week" },
          { value: "Month", label: "Month" },
        ];
      }
      if (this.remoteBackup.frequency == "Weekly") {
        return [
          { value: "Week", label: "Week" },
          { value: "Month", label: "Month" },
        ];
      }
      if (this.remoteBackup.frequency == "Monthly") {
        return [{ value: "Month", label: "Month" }];
      }
      return [];
    },
  },
  methods: {
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
    updateSettings() {
      this.axios
        .post("/site/" + this.$route.params.siteid + "/updateremotebackup", {
          backup: this.remoteBackup,
        })
        .then((res) => {
          this.$toast.success("Updated remote backup settings");
          this.$emit("remoteBackups", res.data);
        })
        .catch(() => {
          this.$toast.error("Failed to update backup settings");
        });
    },
  },
  created() {
    this.hour();
    this.minute();
    this.remoteBackup = JSON.parse(JSON.stringify(this.settings));
  },
  watch: {
    "remoteBackup.retention.type"() {
      if (this.remoteBackup.retention.type == "Day") {
        this.maxRetention = 30;
      } else if (this.remoteBackup.retention.type == "Week") {
        this.maxRetention = 8;
      } else {
        this.maxRetention = 12;
      }
    },

    "remoteBackup.frequency"() {
      if (
        this.remoteBackup.frequency == "Daily" ||
        this.remoteBackup.frequency == "Hourly"
      ) {
        this.remoteBackup.retention.type = "Day";
      }
      if (this.remoteBackup.frequency == "Weekly") {
        this.remoteBackup.retention.type = "Week";
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
      if (this.remoteBackup.frequency == "Monthly") {
        this.remoteBackup.retention.type = "Month";
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
  },
};
</script>

<style scoped>
#suffix {
  margin-left: -10px !important;
  font-size: 12px !important;
}
</style>
