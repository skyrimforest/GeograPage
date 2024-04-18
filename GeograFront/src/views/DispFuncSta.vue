<template>
  <div class="func-container">
    <ElContainer>
      <ElHeader>
        <ElRow>
          <ElCol :span="16"> 无人机事件统计报告 </ElCol>
          <ElCol :span="2">
            日期范围:
          </ElCol>
          <ElCol :span="4">
            <el-date-picker v-model="value1" type="daterange" range-separator="-" start-placeholder="开始日期"
              end-placeholder="截止日期" :size="size" />
          </ElCol>
        </ElRow>
      </ElHeader>

      <ElMain style="--el-main-padding: 0px">
        <ElScrollbar style="height: 700px">
          <!-- 图片部分 -->
          <!-- 总发现 -->
          <ElRow :gutter="30">
            <ElCol :span="6">
              <ElRow>
                <ElCol :span="24">
                  <ElRow>
                    <ElCol :span="24">
                      <ElCard>
                        <ElRow>
                          <ElCol :span="12">
                            <ElIcon style="width: 1em; height: 1em; margin-right: 8px">
                              <Document />
                            </ElIcon>
                          </ElCol>
                          <ElCol :span="12">
                            <ElRow>
                              <ElCol>
                                1970/103
                              </ElCol>
                            </ElRow>
                            <ElRow>
                              <ElCol>
                                总发现架次/架数
                              </ElCol>
                            </ElRow>
                          </ElCol>
                        </ElRow>
                      </ElCard>
                    </ElCol>
                  </ElRow>

                  <!-- 平均每日 -->
                  <ElRow>
                    <ElCol :span="24">
                      <ElCard>
                        <ElRow>
                          <ElCol :span="12">
                            <ElIcon style="width: 1em; height: 1em; margin-right: 8px">
                              <Notebook />
                            </ElIcon>
                          </ElCol>
                          <ElCol :span="12">
                            <ElRow>
                              <ElCol>
                                281/14
                              </ElCol>
                            </ElRow>
                            <ElRow>
                              <ElCol>
                                平均每日架次/架数
                              </ElCol>
                            </ElRow>
                          </ElCol>
                        </ElRow>
                      </ElCard>
                    </ElCol>
                  </ElRow>

                  <!-- 单日最多 -->
                  <ElRow>
                    <ElCol :span="24">
                      <ElCard>
                        <ElRow>
                          <ElCol :span="12">
                            <ElIcon style="width: 1em; height: 1em; margin-right: 8px">
                              <Tickets />
                            </ElIcon>
                          </ElCol>
                          <ElCol :span="12">
                            <ElRow>
                              <ElCol>
                                334/26
                              </ElCol>
                            </ElRow>
                            <ElRow>
                              <ElCol>
                                单日最多架次/架数
                              </ElCol>
                            </ElRow>
                          </ElCol>
                        </ElRow>
                      </ElCard>
                    </ElCol>
                  </ElRow>
                  <!-- 总拦截 -->
                  <ElRow>
                    <ElCol :span="24">
                      <ElCard>
                        <ElRow>
                          <ElCol :span="12">
                            <ElIcon style="width: 1em; height: 1em; margin-right: 8px">
                              <Memo />
                            </ElIcon>
                          </ElCol>
                          <ElCol :span="12">
                            <ElRow>
                              <ElCol>
                                0/0
                              </ElCol>
                            </ElRow>
                            <ElRow>
                              <ElCol>
                                总拦截架次/架数
                              </ElCol>
                            </ElRow>
                          </ElCol>
                        </ElRow>
                      </ElCard>
                    </ElCol>
                  </ElRow>
                </ElCol>
              </ElRow>
            </ElCol>
            <ElCol :span="6">
              <ElCard>
                <ElRow>
                  <ElCol :span="24">
                    <v-chart class="chart" :option="option" />
                  </ElCol>
                </ElRow>
              </ElCard>
            </ElCol>
            <ElCol :span="6">
              <ElCard>
                <ElRow>
                  <ElCol :span="24">
                    <v-chart class="chart" :option="option2" />
                  </ElCol>
                </ElRow>
              </ElCard>
            </ElCol>
            <ElCol :span="6">
              <ElRow>
                <ElCol :span="24">
                  <ElRow>
                    <ElCol :span="24">
                      <ElCard>
                        <ElRow>
                          <ElCol :span="12">
                            <ElIcon style="width: 1em; height: 1em; margin-right: 8px">
                              <Memo />
                            </ElIcon>
                          </ElCol>
                          <ElCol :span="12">
                            <ElRow>
                              <ElCol>
                                21033.3
                              </ElCol>
                            </ElRow>
                            <ElRow>
                              <ElCol>
                                被入侵总时长(分钟)
                              </ElCol>
                            </ElRow>
                          </ElCol>
                        </ElRow>
                      </ElCard>
                    </ElCol>
                  </ElRow>
                  <ElRow>
                    <ElCol :span="24">
                      <ElCard>
                        <ElRow>
                          <ElCol :span="12">
                            <ElIcon style="width: 1em; height: 1em; margin-right: 8px">
                              <Memo />
                            </ElIcon>
                          </ElCol>
                          <ElCol :span="12">
                            <ElRow>
                              <ElCol>
                                1806.4
                              </ElCol>
                            </ElRow>
                            <ElRow>
                              <ElCol>
                                单次最长时间(分钟)
                              </ElCol>
                            </ElRow>
                          </ElCol>
                        </ElRow>
                      </ElCard>
                    </ElCol>
                  </ElRow>
                  <ElRow>
                    <ElCol :span="24">
                      <ElCard>
                        <ElRow>
                          <ElCol :span="12">
                            <ElIcon style="width: 1em; height: 1em; margin-right: 8px">
                              <Memo />
                            </ElIcon>
                          </ElCol>
                          <ElCol :span="12">
                            <ElRow>
                              <ElCol>
                                10.7
                              </ElCol>
                            </ElRow>
                            <ElRow>
                              <ElCol>
                                每次平均时长(分钟)
                              </ElCol>
                            </ElRow>
                          </ElCol>
                        </ElRow>
                      </ElCard>
                    </ElCol>
                  </ElRow>
                </ElCol>
              </ElRow>
            </ElCol>
          </ElRow>

          <!-- 间隔 -->
          <el-row>
            <el-col :span="24">
              <el-col :span="24" :style="{ height: '20px' }"></el-col>
            </el-col>
          </el-row>

          <!-- 波形图部分 -->
          <ElRow>
            <ElCol :span="1">
            </ElCol>
            <ElCol :span="22">
              <ElCard>
                <ElRow>
                  <ElCol :span="24">
                    <v-chart class="chart" :option="option2" />
                  </ElCol>
                </ElRow>
              </ElCard>
            </ElCol>
          </ElRow>

          <!-- 间隔 -->
          <el-row>
            <el-col :span="24">
              <el-col :span="24" :style="{ height: '20px' }"></el-col>
            </el-col>
          </el-row>

          <ElRow>
            <ElCol :span="1">
            </ElCol>
            <ElCol :span="22">
              <ElCard>
                <ElRow>
                  <ElCol>
                    <ElTable :data="droneData" style="width: 100%" :row-class-name="tableRowClassName">
                      <ElTableColumn prop="test1" label="列1" width="180" />
                      <ElTableColumn prop="test2" label="列2" width="180" />
                      <ElTableColumn prop="lookInfo" label="查看详情">
                        <template #default="scope">
                          <el-button link type="primary" size="small" @click="handleClick(scope.$index)">展示1</el-button>
                          <el-button link type="primary" size="small" @click="handleClick(scope.$index)">展示2</el-button>
                        </template>
                      </ElTableColumn>
                      <ElTableColumn prop="test3" label="列3" width="180" />
                    </ElTable>
                  </ElCol>
                </ElRow>
              </ElCard>
            </ElCol>
          </ElRow>


        </ElScrollbar>
      </ElMain>
    </ElContainer>
  </div>
</template>



<script setup>
import { ref, provide } from "vue"

// echarts的引入
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { PieChart, LineChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent
} from "echarts/components";
import VChart, { THEME_KEY } from "vue-echarts";
import { ElScrollbar } from "element-plus";
use([
  CanvasRenderer,
  PieChart,
  LineChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent
]);

provide(THEME_KEY, "dark");

const option = ref({
  backgroundColor: '#2c343c',
  title: {
    text: 'Customized Pie',
    left: 'center',
    top: 20,
    textStyle: {
      color: '#ccc'
    }
  },
  tooltip: {
    trigger: "item",
    formatter: "{a} <br/>{b} : {c} ({d}%)"
  },
  legend: {
    orient: "vertical",
    left: "left",
    data: ["Other", "Learning"]
  },
  series: [
    {
      name: 'Learning Ratio',
      type: "pie",
      radius: ['40%', '70%'],
      data: [
        { value: 8, name: "Other", itemStyle: { color: "#aaaaaa" } },
        { value: 13, name: "Learning", itemStyle: { color: "#000000" } },
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: "rgba(0, 0, 0, 0.5)"
        }
      }
    }
  ]
});

const option2 = ref({
  backgroundColor: '#2c343c',
  title: {
    text: 'Customized Pie',
    left: 'center',
    top: 20,
    textStyle: {
      color: '#ccc'
    }
  },
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      type: 'line',
      smooth: true
    }
  ]
});

const droneData = [
  {
    test1: "test1",
    test2: "test2",
    test3: "test3",
    lookInfo: "Tom",
  },
];
</script>

<style scoped src="../styles/dispbox.css"></style>
<style>
.chart {
  height: 400px;
  widows: 100%;
}
</style>