<template>
    <div>
        {{ selecter(detail.ag) }} - 
        {{ bank.name}}
    </div>
</template>
<script>
import {BANK} from "../../../mixins/bank"
export default {
    props: ['detail'],
    computed: {
        bank() { return BANK.find(({ code }) => code == this.detail.bankCode) }
    },
    methods: {
        selecter(ag) {
            if (ag == 1) return "AMB";
            else if (ag == 2) return "UFA";
            else return ag;
        } 
    }
}
</script>