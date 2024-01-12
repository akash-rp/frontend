<template>
  <div>
    <a-form
      :model="settings"
      name="phpSettings"
      :label-col="{ span: 8 }"
      :wrapper-col="{ span: 16 }"
      autocomplete="off"
      layout="vertical"
      :hideRequiredMark="true"
      @finish="updatePhpSettings"
    >
      <a-form-item
        label="LSPHP Mode"
        name="PHP_LSAPI_CHILDREN"
        :rules="[{ required: true, message: 'This Field Is Required' }]"
      >
        <a-select ref="select" v-model:value="mode" class="w-40">
          <a-select-option value="processgroup">ProcessGroup</a-select-option>
          <a-select-option value="worker">Worker</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
        label="PHP LSAPI CHILDREN"
        name="PHP_LSAPI_CHILDREN"
        :rules="[{ required: true, message: 'This Field Is Required' }]"
      >
        <a-input-number
          v-model:value="settings['PHP_LSAPI_CHILDREN']"
          class="w-40"
          :min="childrenMin"
          :disabled="childrenDisable"
        />
      </a-form-item>
      <a-form-item
        label="PHP LSAPI MAX IDLE"
        name="PHP_LSAPI_MAX_IDLE"
        :rules="[{ required: true, message: 'This Field Is Required' }]"
      >
        <a-input-number
          v-model:value="settings['PHP_LSAPI_MAX_IDLE']"
          class="w-40"
          :min="1"
        />
      </a-form-item>
      <a-form-item
        label="PHP LSAPI MAX PROCESS TIME"
        name="PHP_LSAPI_MAX_PROCESS_TIME"
        :rules="[{ required: true, message: 'This Field Is Required' }]"
      >
        <a-input-number
          v-model:value="settings['PHP_LSAPI_MAX_PROCESS_TIME']"
          class="w-40"
          :min="1"
        />
      </a-form-item>
      <a-form-item
        label="PHP LSAPI MAX REQUESTS"
        name="PHP_LSAPI_MAX_REQUESTS"
        :rules="[{ required: true, message: 'This Field Is Required' }]"
      >
        <a-input-number
          v-model:value="settings['PHP_LSAPI_MAX_REQUESTS']"
          class="w-40"
          :min="1"
        />
      </a-form-item>
      <a-form-item
        label="Initial Request Timeout"
        name="initTimeout"
        :rules="[{ required: true, message: 'This Field Is Required' }]"
      >
        <a-input-number
          v-model:value="settings.initTimeout"
          class="w-40"
          :min="1"
        />
      </a-form-item>
      <a-form-item
        label="Retry Timeout"
        name="retryTimeout"
        :rules="[{ required: true, message: 'This Field Is Required' }]"
      >
        <a-input-number
          v-model:value="settings.retryTimeout"
          class="w-40"
          :min="0"
        />
      </a-form-item>
      <a-form-item
        label="Instances"
        name="instances"
        :rules="[{ required: true, message: 'This Field Is Required' }]"
      >
        <a-input-number
          v-model:value="settings.instances"
          class="w-40"
          :min="1"
          :disabled="instancesDisable"
        />
      </a-form-item>
      <a-form-item
        label="Max Connections"
        name="maxConns"
        :rules="[{ required: true, message: 'This Field Is Required' }]"
      >
        <a-input-number
          v-model:value="settings.maxConns"
          class="w-40"
          :min="1"
        />
      </a-form-item>
      <a-form-item label="LSPHP Slowlog" name="enableSlowlog">
        <a-switch
          v-model:checked="slowlog"
          checked-children="On"
          un-checked-children="Off"
        />
      </a-form-item>
      <a-form-item
        label="PHP LSAPI SLOW REQ MSECS"
        name="PHP_LSAPI_SLOW_REQ_MSECS"
        :rules="[
          {
            required: true,
            validator: this.validateSlowlog,
          },
        ]"
        v-if="slowlog"
      >
        <a-input-number
          v-model:value="settings['PHP_LSAPI_SLOW_REQ_MSECS']"
          class="w-40"
          :min="0"
          addon-after="MilliSeconds"
        />
      </a-form-item>

      <a-form-item>
        <a-button type="primary" html-type="submit">Update</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      settings: {
        PHP_LSAPI_CHILDREN: "",
        PHP_LSAPI_MAX_REQUESTS: "",
        PHP_LSAPI_MAX_IDLE: "",
        initTimeout: "",
        instances: "",
        maxConns: "",
        retryTimeout: "",
      },
      mode: "",
      instancesDisable: false,
      childrenDisable: false,
      childrenMin: 2,
      slowlog: false,
    };
  },
  created() {
    this.$axios
      .get("/site/" + this.$route.params.siteid + "/php/settings")
      .then((res) => {
        this.settings = res.data;
      });
  },
  watch: {
    settings: {
      deep: true,
      handler(data) {
        if (data.instances === 1 && data["PHP_LSAPI_CHILDREN"] > 1) {
          this.mode = "processgroup";
        } else this.mode = "worker";

        if (this.mode === "processgroup") {
          this.settings.maxConns = this.settings.PHP_LSAPI_CHILDREN;
        } else {
          this.settings.maxConns = this.settings.instances;
        }
      },
    },
    mode(data) {
      if (data === "processgroup") {
        this.instancesDisable = true;
        this.settings.instances = 1;
        this.childrenDisable = false;
        this.childrenMin = 2;

        if (this.settings.PHP_LSAPI_CHILDREN < 2) {
          this.settings.PHP_LSAPI_CHILDREN = 5;
        }
      } else if (data === "worker") {
        this.instancesDisable = false;

        this.childrenDisable = true;
        this.settings.PHP_LSAPI_CHILDREN = 1;
        this.childrenMin = 1;
      }
    },
    slowlog(data) {
      console.log(data);
      if (data) {
        this.settings["PHP_LSAPI_SLOW_REQ_MSECS"] = 1;
      } else {
        delete this.settings["PHP_LSAPI_SLOW_REQ_MSECS"];
      }
    },
  },
  methods: {
    updatePhpSettings() {
      console.log(this.settings);
      this.$axios
        .patch("/site/" + this.$route.params.siteid + "/php/settings", {
          settings: this.settings,
        })
        .then((res) => {
          this.settings = res.data;
          this.$toast.success("Updated PHP Settings");
        })
        .catch(() => {
          this.$toast.error("Failed To Update PHP Settings");
        });
    },
    async validateSlowlog(_rule, value) {
      console.log(value);
      if (value <= 0) {
        return Promise.reject("Value cannot be less than 1");
      } else {
        return Promise.resolve();
      }
    },
  },
};
</script>

<style lang="scss">
.ant-form-item-label {
  padding: 0 !important;
}
</style>
