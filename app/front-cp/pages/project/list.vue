<template>
  <v-container class="pt-6" fluid>
    <template v-if="userRole === 'CL'">
      <ProjectOwnerList
        :headers="headersClient"
        :general-action="ownerGeneralAction"
        :module-info="ownerModuleData"
        main-icon="file-table-box-multiple"
      />
    </template>
    <!-- Admin  -->
    <template v-else>
      <StaticBreadCrumb :crumbs="crumbs" />
      <ProjectList
        :headers="headersAdmin"
        :general-action="adminGeneralAction"
        :module-info="adminModuleData"
        main-icon="file-table-box-multiple"
      >
      </ProjectList>
    </template>
  </v-container>
</template>
<script>
import listInfo from '@/mixin/projectListInfo';

export default {
  permissions: ['AD', 'SA', 'CL'],
  mixins: [listInfo],

  data() {
    return {
      userRole: this.$store.getters['user/auth/GET_ROLE'],
      adminModuleData: {
        url: 'project/list/adminListProject',
        rmUrl: 'project/deleteProject',
        name: 'projectEntity',
      },
      adminGeneralAction: {
        title: 'projectList',
        addLink: 'project-add',
        editLink: '/project/edit',
        linkTitle: 'projectAdd',
        deletable: true,
        editable: true,
      },
      ownerModuleData: {
        url: 'project/list/clientListProject',
        name: 'projectEntity',
      },
      ownerGeneralAction: {
        title: 'myProjectList',
      },
    };
  },
  head() {
    return {
      title: this.$t('projectList'),
    };
  },
};
</script>
