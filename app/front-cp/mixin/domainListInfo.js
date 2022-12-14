const listInfo = {
  computed: {
    headersAdmin() {
      return [
        {
          text: this.$t('id'),
          sortable: false,
          value: 'id',
          width: '5%',
        },
        {
          text: this.$t('domain'),
          sortable: false,
          value: 'domain',
          type: 'text',
          width: '15%',
        },
        {
          text: this.$t('wildcardDomain'),
          sortable: false,
          value: 'wildcardDomain',
          type: 'text',
          width: '15%',
        },
        {
          text: this.$t('project'),
          sortable: false,
          value: 'projectName.title',
          width: '15%',
        },
        {
          text: this.$t('status'),
          sortable: false,
          value: 'options',
          type: 'arrayInBox',
          width: '12%',
          items: [
            {
              name: this.$t('active'),
              value: 1,
            },
            {
              name: this.$t('deleted'),
              value: 2,
            },
          ],
        },
        {
          text: this.$t('action'),
          value: 'actions',
          sortable: false,
          width: '11%',
          align: 'center',
        },
      ];
    },
    // Breadcrumb
    crumbs() {
      return [
        {
          text: this.$t('dashboard'),
          to: '/dashboard',
          refresh: false,
          disabled: false,
        },
        {
          text: this.$t('domainAdd'),
          to: '/domain/add',
          refresh: false,
          disabled: false,
        },
        {
          text: this.$t('domainList'),
          to: '/domain/list',
          refresh: true,
          disabled: false,
        },
      ];
    },
  },
};
export default listInfo;
