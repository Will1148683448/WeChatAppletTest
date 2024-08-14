<template>
    <view class="p-32">
        
    </view>
</template>

<script>
export default {
    props: {
        item: {
            type: Object,
            default: () => {
                return {
                    orderNo: "", //订单号
                    startTime: 0, //开始时间
					endTime: 0, //结束时间
					payAmount: 0, //支付金额
					score: 0, //评分
					
				}
            }
        },
    },
    data() {
        return {

        }
    }
}
</script>

<style scoped lang="scss">


</style>