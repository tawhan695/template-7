<template>
    <div class="container">
        <div class="row text-dark">
            <div class="col-lg-6 m-md-auto col-sm-12 col-12">
                <div class="card mt-5">
                    <div class="card-body text-dark">
                        <h2 class="">แนะนำเพื่อน</h2>
                        <div class="text-center my-3" v-show="isRequest">
                            <div class="spinner-border" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                        </div>

                        <div class="input-group mb-3 bg-light" style="border-radius: 1.5rem">
                            <input type="text" class="form-control" readonly v-model="invite_link" id="suggest" />
                            <button @click="copy('suggest')" class="btn btn-outline-secondary">คัดลอก</button>
                        </div>

                        <!-- <h4>ประวัติแนะนำเพื่อน</h4>

                        <div class="row mb-3">
                            <div class="col-6">
                                <input class="form-control" type="datetime-local" v-model="start_date" />
                            </div>
                            <div class="col-6">
                                <input class="form-control" type="datetime-local" v-model="end_date" />
                            </div>
                        </div>
                        <button @click="getReport('suggesting')" class="btn btn-danger w-100">ค้นหา</button> -->

                        <div class="text-center my-3" v-show="isRequestReport">
                            <div class="spinner-border" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                        </div>

                        <div class="card bg-light mt-2">
                            <div class="card-body">
                                <div class="table-responsive">
                                    <table class="table table-sm">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th scope="col">Unername</th>
                                                <th scope="col">วันที่</th>
                                                <th scope="col">สถาณะ</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(list, index) in  Array.prototype.reverse.apply(report.data)"
                                                :key="list.key">
                                                <td>{{ index + 1 }}</td>
                                                <td>{{ list.username }}</td>
                                                <td>{{ $filters.moment(list.time) }}</td>
                                                <td>
                                                    <span class="badge bg-secondary"
                                                        v-if="list.status == 0">สมาชิกใหม</span>
                                                    <span class="badge bg-success"
                                                        v-if="list.status == 1">สมาชิกทั่วไป</span>
                                                    <span class="badge bg-warning text-dark"
                                                        v-if="list.status == 2">สมาชิก VIP</span>
                                                    <span class="badge bg-danger"
                                                        v-if="list.status == 2">ระงับบัญชี</span>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            invite_link: "",
            isRequest: false,
            isRequestReport: false,
            report: { data: {} },
            userstatus: { class: "", message: "" },
            start_date: "",
            end_date: "",

        };
    },
    created() {
        this.invite_link = window.location.origin + "/register"
    },

}
</script>

<style lang="scss" scoped>
.card {
    background: linear-gradient(359deg, #ffffff7e, #ffffff7e);
    box-shadow: #3ba3ff 0px 0px 11px 0px;
    border-radius: 1rem;
    border: 1px solid #3ba3ff;

    @media (max-width: 576px) {
        padding: 0 0rem;
        border-radius: 1rem;
    }
}

.card-reward {
    max-height: 94px;
}

input {
    font-weight: 300;
    font-size: 9pt;
}

.badge {
    font-weight: 400;
}

tbody>tr>td {
    font-size: 10pt;
}
</style>