<template>
    <div class="">
        <h5 class="pt-3 text-white d-block">สรุปรายได้พันธมิตร</h5>
        <div class="row ">
            <div class="col-12 col-sm-4 p-0 m-0">
                <div class="card card-member p-3 text-white m-2 stcard">
                    <div>
                        <p style="font-size: 15px">เปอเช็นต์ที่ได้</p>
                        <span class="text-base">{{ formatNumber(this.winloseStore.mlm.summary.Share * 100, 2) }}
                            %
                        </span>
                    </div>
                </div>
            </div>

            <div class="col-12 col-sm-4 p-0 m-0">
                <div class="card card-member p-3 text-white m-2 stcard">
                    <div>
                        <p style="font-size: 15px">เทินโอเวอร์</p>
                        <span class="text-base">{{ turnOver }}</span>
                    </div>
                </div>
            </div>
            <div class="col-12 col-sm-4 p-0 m-0">
                <div class="card card-member p-3 text-white m-2 stcard">
                    <div>
                        <p style="font-size: 15px">รายได้</p>
                        <span class="text-base">{{ incomeCommission }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <br>

    <BonusReport :filter="['mlm']" />
</template>
<script>

import { useWinloseStore } from "@/stores/winlose";
import BonusReport from '../BonusReport.vue';
export default {
    setup() {
        const winloseStore = useWinloseStore();
        return {
            winloseStore,
        };
    },
    components: {
        BonusReport
    },
    data() {
        return {
            isRequest: false,
        };
    },
    computed: {
        incomeCommission() {
            return this.formatNumber(this.winloseStore.mlm.summary.Share * this.winloseStore.mlm.summary.ValidAmount || 0, 2);
        },
        turnOver() {
            return this.formatNumber(this.winloseStore.mlm.summary.ValidAmount  || 0, 2);
        },
    },
    created() {
        this.winloseStore.getReportMLM();
    },
 
};
</script>
  
<style lang="scss" scoped>
@import "datatables.net-bs5";

.stcard {
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}

.text-base {
    color: #d39205;
    font-size: 1.7rem;
}

#DataTables_Table_1>thead {
    background: #d39205;
}

.card {
    color: #ebebeb;
    font-weight: 700;
    background-color: rgba(0, 0, 0, 0.6) !important;
    border: #e0a953 2px solid !important;
    box-shadow: #f4c039 0px 0px 3px 0px;
}
</style>
  