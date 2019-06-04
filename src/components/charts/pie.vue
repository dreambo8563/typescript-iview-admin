<template>
  <div ref="dom" class="charts chart-pie"></div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import echarts from "echarts";
import tdTheme from "./theme.json";
import { on, off } from "@/libs/tools";
echarts.registerTheme("tdTheme", tdTheme);

@Component
export default class ChartPie extends Vue {
  @Prop({ default: () => [] }) readonly value!: any[];
  @Prop(String) readonly text!: string | undefined;
  @Prop(String) readonly subtext!: string | undefined;

  name = "ChartPie";

  //data
  dom: echarts.ECharts | null = null;

  resize() {
    this.dom!.resize();
  }

  mounted() {
    this.$nextTick(() => {
      let legend = this.value.map(_ => _.name);
      let option = {
        title: {
          text: this.text,
          subtext: this.subtext,
          x: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          left: "left",
          data: legend
        },
        series: [
          {
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: this.value,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      };
      this.dom = echarts.init(this.$refs.dom as HTMLDivElement, "tdTheme");
      this.dom.setOption(option as echarts.EChartOption);
      on(window, "resize", this.resize);
    });
  }

  beforeDestroy() {
    off(window, "resize", this.resize);
  }
}
</script>
