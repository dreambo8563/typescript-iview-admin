<template>
  <div ref="dom" class="charts chart-bar"></div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import echarts from "echarts";
import tdTheme from "./theme.json";
import { on, off } from "@/libs/tools";
echarts.registerTheme("tdTheme", tdTheme);

@Component
export default class ChartBar extends Vue {
  @Prop({ default: () => ({}) }) readonly value!: object;
  @Prop(String) readonly text!: string | undefined;
  @Prop(String) readonly subtext!: string | undefined;

  name = "ChartBar";

  //data
  dom: echarts.ECharts | null = null;

  resize() {
    this.dom!.resize();
  }

  mounted() {
    this.$nextTick(() => {
      let xAxisData = Object.keys(this.value);
      let seriesData = Object.values(this.value);
      let option = {
        title: {
          text: this.text,
          subtext: this.subtext,
          x: "center"
        },
        xAxis: {
          type: "category",
          data: xAxisData
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: seriesData,
            type: "bar"
          }
        ]
      };
      this.dom = echarts.init(this.$refs.dom as HTMLDivElement, "tdTheme");
      this.dom!.setOption(option as echarts.EChartOption);
      on(window, "resize", this.resize);
    });
  }

  beforeDestroy() {
    off(window, "resize", this.resize);
  }
}
</script>
